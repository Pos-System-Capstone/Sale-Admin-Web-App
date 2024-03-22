/* eslint-disable camelcase */
// import { TabContext, TabList } from '@mui/lab';
// material
import { Icon } from '@iconify/react';
import { Button, Card } from '@mui/material';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import React, { useRef, useEffect } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
// import { TProduct } from 'types/product';
// import confirm from 'components/Modal/confirm';
// import { deleteProdById } from '../../redux/product/api';
import { TProductCategory } from 'types/promotion/productCategory';
import productCategory from 'api/promotion/category';
// import { DeleteConfirmDialog } from 'components/DeleteConfirmDialog';
import { fDateTime } from 'utils/formatTime';
// import { get } from 'lodash';
// import { ProductTypeEnum } from 'types/product';
import { useSnackbar } from 'notistack';
import { getUserInfo } from 'utils/utils';
import plusFill from '@iconify/icons-eva/plus-fill';
// import { PATH_DASHBOARD } from 'routes/paths';
// import { ProductTypeEnum } from 'types/product';

// ----------------------------------------------------------------------

export default function ProductPromotion() {
  // const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useLocales();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'ID',
      dataIndex: 'cateId',
      hideInSearch: true
    },
    {
      title: 'Tên danh mục',
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

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('brandId', user.brandId!);
    }
  }, [user]);
  return (
    <Page
      title="Quản lý danh mục sản phẩm"
      actions={() => [
        <Button
          key="add-product"
          onClick={() => {
            navigate(PATH_PROMOTION_APP.category.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          Thêm danh mục
        </Button>
      ]}
    >
      <Card>
        <ResoTable
          ref={ref}
          pagination
          getData={(params: any) => productCategory.getCategory(params)}
          onEdit={(cate: TProductCategory) => {
            navigate(`${PATH_PROMOTION_APP.category.editById(cate.productCateId)}`);
          }}
          columns={columns}
          // onDelete={setCurrentDeleteItem}
          rowKey="id"
        />
        {/* <DeleteConfirmDialog
          open={Boolean(currentDeleteItem)}
          onClose={() => setCurrentDeleteItem(null)}
          onDelete={deleteProductHandler}
          title={
            'Xác nhận xoá sản phẩm'
          }
        /> */}
      </Card>
    </Page>
  );
}
