/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// import { TabContext, TabList } from '@mui/lab';
// material
import { Button, Card } from '@mui/material';
import confirm from 'components/Modal/confirm';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { ProductTypeEnum, TProduct, TProductBase } from 'types/product';
import { deleteProdById } from '../../redux/product/api';
//
import { productColumns } from './config';
import productApi from 'api/product';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useLocales();

  const editProduct = (data: TProduct) => {
    navigate(`${PATH_DASHBOARD.products.root}/${data.id}`);
  };

  const onDelete = (currentDeleteItem: TProductBase) => {
    confirm({
      title: (
        <>
          Xác nhận xóa <strong>{currentDeleteItem?.product_name}</strong>
        </>
      ),
      content: 'Sản phẩm này sẽ bị xoá khỏi hệ thống',
      onOk: () => {
        return deleteProdById(currentDeleteItem.product_id!)
          .then((res) => {
            enqueueSnackbar(t('common.deleteSuccess'), {
              variant: 'success'
            });
          })
          .then(() => ref.current?.reload())
          .catch((err) => {
            enqueueSnackbar(t('common.error'), {
              variant: 'error'
            });
          });
      }
    });
  };

  useEffect(() => {
    const form = ref.current?.formControl;
    if (!form) return;
    form.setValue('is-extra-cate', activeTab === '2');
  }, [activeTab, ref]);

  return (
    <Page
      title="Quản lý sản phẩm"
      actions={() => [
        <Button
          key="add-product-extra"
          onClick={() => {
            navigate(`${PATH_DASHBOARD.products.newProduct}?productType=${ProductTypeEnum.EXTRA}`);
          }}
          variant="outlined"
          startIcon={<Icon icon={plusFill} />}
        >
          Thêm extra
        </Button>,
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
          getData={productApi.get}
          onEdit={editProduct}
          onDelete={onDelete}
          columns={productColumns}
          rowKey="product_id"
        />
        {/* </TabContext> */}
      </Card>
    </Page>
  );
}
