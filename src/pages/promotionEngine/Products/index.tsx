/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// import { TabContext, TabList } from '@mui/lab';
// material
import { Button, Card } from '@mui/material';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import React, { useRef, useState, useEffect } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { TProduct } from 'types/product';
// import confirm from 'components/Modal/confirm';
// import { deleteProdById } from '../../redux/product/api';
import { TProductPromotionAPI } from 'types/promotion/productPromotion';
import productApi from 'api/promotion/product_promotion';
import { DeleteConfirmDialog } from 'components/DeleteConfirmDialog';
import { fDateTime } from 'utils/formatTime';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { getUserInfo } from 'utils/utils';

// ----------------------------------------------------------------------

export default function ProductPromotion() {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useLocales();
  const [isShowConfirmDeleteProductDialog, setIsShowConfirmDeleteProductDialog] = useState(false);
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TProductPromotionAPI | null>(null);
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const editProduct = (data: TProduct) => {
    navigate(`${PATH_DASHBOARD.products.root}/${data.id}`);
  };
  const deleteProductHandler = () =>
    productApi
      .deleteProduct(currentDeleteItem?.productId)
      .then(() => setCurrentDeleteItem(null))
      .then(ref.current?.reload)
      .then(() =>
        enqueueSnackbar(`Xóa thành công`, {
          variant: 'success'
        })
      )
      .catch((err: any) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });
  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Code',
      dataIndex: 'code',
      hideInSearch: true
    },
    {
      title: 'Name',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Created date',
      dataIndex: 'insDate',
      render: (values: any) => fDateTime(values),
      hideInSearch: true
    },
    {
      title: 'Updated date',
      dataIndex: 'updDate',
      render: (values: any) => fDateTime(values),
      hideInSearch: true
    }
  ];
  useEffect(() => {
    if (ref.current) {
      // ref.current.formControl.setValue('productCateId', user.productCateId!);
      ref.current.formControl.setValue('productCateId', '46ca741a-7aab-484e-ba88-2199d40814f8');
    }
  }, [user]);
  return (
    <Page
      title="Quản lý Product"
      actions={() => [
        // <Button
        //   key="add-product-extra"
        //   onClick={() => {
        //     navigate(`${PATH_DASHBOARD.products.newProduct}?productType=${ProductTypeEnum.EXTRA}`);
        //   }}
        //   variant="outlined"
        //   startIcon={<Icon icon={plusFill} />}
        // >
        //   Thêm extra
        // </Button>,
        <Button
          key="add-product"
          onClick={() => {
            navigate(PATH_DASHBOARD.products.newProduct);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          Thêm sản phẩm
        </Button>
      ]}
    >
      <Card>
        <ResoTable
          ref={ref}
          pagination
          getData={(params: any) => productApi.getProduct(params)}
          onEdit={editProduct}
          columns={columns}
          onDelete={setCurrentDeleteItem}
          rowKey="id"
        />
        <DeleteConfirmDialog
          open={Boolean(currentDeleteItem)}
          onClose={() => setCurrentDeleteItem(null)}
          onDelete={deleteProductHandler}
          title={
            'Xác nhận xoá sản phẩm'
            // <>
            //   {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.name}</strong>
            // </>
          }
        />
      </Card>
    </Page>
  );
}
