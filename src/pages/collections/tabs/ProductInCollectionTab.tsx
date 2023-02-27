/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Card, Stack } from '@mui/material';
import confirm from 'components/Modal/confirm';
import ModalProductForm from 'components/ModalProductForm/ModalProductForm';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useRef } from 'react';
import { productCollectionApi } from 'redux/collections/api';
import { TProduct, TProductBase, TProductInCollection } from 'types/product';
import { TTableColumn } from 'types/table';

// eslint-disable-next-line react/prop-types
const ProductInCollectionTab = ({ id, onAddProduct }: any, productList: TProduct[]) => {
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

  const categoryExtraColumns: TTableColumn<TProductInCollection>[] = [
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
        <Avatar
          alt={product_name}
          src={src}
          variant="square"
          style={{ width: '54px', height: '54px' }}
        />
      )
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName'
    },
    {
      title: 'Giá bán',
      dataIndex: 'sellingPrice',
      hideInSearch: true
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productCode',
      hideInSearch: true
    }
  ];

  return (
    <Box flex={1}>
      <Box component={Card} p={2}>
        <Stack justifyContent="flex-end" mb={2} direction="row" spacing={2}>
          <ModalProductForm
            onSubmit={addProductToCollection}
            trigger={<Button variant="outlined">Thêm sản phẩm</Button>}
          />
        </Stack>
        <ResoTable
          ref={tableRef}
          showSettings={false}
          columns={categoryExtraColumns}
          rowKey="id"
          onDelete={onDelete}
          // onEdit={(values: TModifier) => updateForm.reset(normalizeModifier(values))}
          // renderEdit={(dom: ReactNode, modifier: TModifier) => (
          //   <ModalForm
          //     onOk={async () => {
          //       try {
          //         return true;
          //       } catch (error) {
          //         return false;
          //       }
          //     }}
          //     title={<Typography variant="h3">Cập nhật sản phẩm trong bộ sưu tập</Typography>}
          //     trigger={dom}
          //   >
          //     <FormProvider {...updateForm}>
          //       <InputField name="position" label="Thứ tự" />
          //     </FormProvider>
          //   </ModalForm>
          // )}
          getData={(params: any) => api.get(params)}
          // dataSource={productList}
        />
      </Box>
    </Box>
  );
};

export default ProductInCollectionTab;
