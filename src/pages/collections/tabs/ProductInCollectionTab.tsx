/* eslint-disable react/prop-types */
import { Box, Button, Card, Stack } from '@mui/material';
import collectionApi from 'api/collection';
import confirm from 'components/Modal/confirm';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useRef } from 'react';
import { productCollectionApi } from 'redux/collections/api';
import { TProduct, TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';
import ModalProductsInCollection from './ModalProductInCollection';

// eslint-disable-next-line react/prop-types
const ProductInCollectionTab = ({ id, onAddProduct }: any) => {
  const api = productCollectionApi(id);
  const { translate } = useLocales();
  const tableRef = useRef<any>();

  const { enqueueSnackbar } = useSnackbar();

  const onDelete = (currentDeleteItem: TProductBase) =>
    confirm({
      title: 'Xác nhận xoá',
      content: 'Xoá tuỳ chỉnh này sẽ tác động tới các sản phẩm đang được áp dụng',
      onOk: async () => {
        try {
          await api.delete(Number(currentDeleteItem!.product_id));
          enqueueSnackbar(translate('common.201'), {
            variant: 'success'
          });
          tableRef.current?.reload();
        } catch (error) {
          enqueueSnackbar(translate('common.error'), {
            variant: 'error'
          });
        }
      },
      onCancle: () => {}
    });

  const addProductToCollection = async (ids: string[], data: any) => {
    try {
      await api.create(data);
      enqueueSnackbar('common.201', {
        variant: 'success'
      });
      tableRef.current?.reload();
    } catch (err) {
      console.log(`err.response`, err as any);
      const errMsg = get(err as any, ['message'], `Có lỗi xảy ra. Vui lòng thử lại`);
      enqueueSnackbar(errMsg, {
        variant: 'error'
      });
    }
  };

  const categoryExtraColumns: TTableColumn<TProduct>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'picUrl',
      hideInSearch: true,
      render: (src, { product_name }: any) => (
        <Box
          component="img"
          alt={product_name}
          src={
            src ??
            'https://firebasestorage.googleapis.com/v0/b/pos-system-47f93.appspot.com/o/files%2Fproduct.png?alt=media&token=8eb70c21-2c0e-4d5c-b92a-0b93c3020c9b'
          }
          sx={{ width: 48, height: 48, borderRadius: 1.5 }}
        />
      )
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name'
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      hideInSearch: true
    }
  ];

  return (
    <Box flex={1}>
      <Box component={Card} p={2}>
        <Stack justifyContent="flex-end" mb={2} direction="row" spacing={2}>
          <ModalProductsInCollection
            collectionId={id}
            trigger={<Button variant="outlined">Cập nhật sản phẩm trong bộ sưu tập</Button>}
            onReload={() => tableRef.current?.reload()}
          />
        </Stack>
        <ResoTable
          ref={tableRef}
          columns={categoryExtraColumns}
          rowKey="id"
          getData={(params: any) => collectionApi.getProductsInCollection(id, params)}
        />
      </Box>
    </Box>
  );
};

export default ProductInCollectionTab;
