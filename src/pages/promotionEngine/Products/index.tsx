/* eslint-disable camelcase */

import { Card } from '@mui/material';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
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
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      hideInSearch: true
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'insDate',
      render: (values: any) => fDateTime(values),
      hideInSearch: true
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updDate',
      render: (values: any) => fDateTime(values),
      hideInSearch: true
    }
  ];
  const { id } = useParams();
  useEffect(() => {
    if (ref.current) {
      // ref.current.formControl.setValue('productCateId', user.productCateId!);
      ref.current.formControl.setValue('productCateId', id);
    }
  }, [user]);
  return (
    <Page actions={() => []}>
      <Card>
        <ResoTable
          ref={ref}
          pagination
          getData={(params: any) => productApi.getProduct(params)}
          onEdit={(product: TProductPromotionAPI) => {
            navigate(`${PATH_PROMOTION_APP.product.editById(product.productId)}`);
          }}
          columns={columns}
          onDelete={setCurrentDeleteItem}
          rowKey="id"
        />
        <DeleteConfirmDialog
          open={Boolean(currentDeleteItem)}
          onClose={() => setCurrentDeleteItem(null)}
          onDelete={deleteProductHandler}
          title={'Xác nhận xoá sản phẩm'}
        />
      </Card>
    </Page>
  );
}
