/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// import { TabContext, TabList } from '@mui/lab';
// material
import { Button, Card } from '@mui/material';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import React, { useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { TProduct, TProductBase } from 'types/product';
// import confirm from 'components/Modal/confirm';
// import { deleteProdById } from '../../redux/product/api';
//
import productApi from 'api/product';
import { DeleteConfirmDialog } from 'components/DeleteConfirmDialog';
import { productColumns } from './config';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();

  const navigate = useNavigate();
  const { t } = useLocales();
  const [isShowConfirmDeleteProductDialog, setIsShowConfirmDeleteProductDialog] = useState(false);
  const [removeProductData, setRemoveProductData] = useState<TProductBase>();

  const editProduct = (data: TProduct) => {
    navigate(`${PATH_DASHBOARD.products.root}/${data.id}`);
  };

  const handleRemoveProductInBrand = () => {
    console.log('product data ne để handle: ', removeProductData);
    // confirm({
    //   title: (
    //     <>
    //       Xác nhận xóa <strong>{removeProductData?.product_name}</strong>
    //     </>
    //   ),
    //   content: 'Sản phẩm này sẽ bị xoá khỏi hệ thống',
    //   onOk: () => {
    //     return deleteProdById(0)
    //       .then((res) => {
    //         enqueueSnackbar(t('common.deleteSuccess'), {
    //           variant: 'success'
    //         });
    //       })
    //       .then(() => ref.current?.reload())
    //       .catch((err) => {
    //         enqueueSnackbar(t('common.error'), {
    //           variant: 'error'
    //         });
    //       });
    //   }
    // });
  };

  return (
    <Page
      title="Quản lý sản phẩm"
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
        {/* <TabContext value={activeTab}>
          <Box>
            <TabList onChange={handleChangeTab}>
              <Tab label="Danh mục sản phẩm" value="1" />
              <Tab label="Danh mục extra" value="2" />
            </TabList>
          </Box> */}
        <ResoTable
          ref={ref}
          pagination
          getData={(params: any) => productApi.get(params)}
          onEdit={editProduct}
          // onDelete={(data: TProductBase) => {
          //   setIsShowConfirmDeleteProductDialog(true);
          //   setRemoveProductData(data);
          // }}
          columns={productColumns}
          rowKey="id"
        />
        <DeleteConfirmDialog
          title={'Xác nhận xoá sản phẩm'}
          description={'Bạn chắc chắn muốn xoá sản phẩm ?'}
          open={isShowConfirmDeleteProductDialog}
          onClose={() => setIsShowConfirmDeleteProductDialog(false)}
          onDelete={() => handleRemoveProductInBrand()}
        />
      </Card>
    </Page>
  );
}
