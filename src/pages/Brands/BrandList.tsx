/* eslint-disable camelcase */
import { Visibility } from '@mui/icons-material';
// material
import { Card, IconButton, Stack, Tooltip } from '@mui/material';
import brandApi from 'api/brand';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { TBrand } from 'types/brand';
import { TTableColumn } from 'types/table';
import CreateNewBrandDialog from './components/CreateNewBrandDialog';

const BrandListPage = () => {
  const navigate = useNavigate();

  const [isCreateNewBrandDialogShow, setIsCreateNewBrandDialogShow] = useState(true);

  const brandColumns: TTableColumn<TBrand>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên nhãn hiệu',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInSearch: true
      // renderFormItem: () => <AutoCompleteStoreSelect name="brand_id" label="Nhãn Hiệu" />
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true
    },
    {
      title: 'Chi tiết',
      fixed: 'right',
      hideInSearch: true,
      render: (_: any, brand: TBrand) => (
        <Tooltip title="Chi tiết">
          {/* <IconButton onClick={() => setDetailBrand(brand.id)} size="large"> */}
          <IconButton onClick={() => navigate(`${brand.id}`)} size="large">
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
    <Page title="Danh sách thương hiệu">
      {/* <OrderDetailDialog orderId={12} open={true} onClose={() => setDetailBrand(null)} /> */}
      <CreateNewBrandDialog
        open={isCreateNewBrandDialogShow}
        onClose={() => setIsCreateNewBrandDialogShow(false)}
      />
      <Card>
        <Stack spacing={2}>
          <ResoTable
            showAction={false}
            rowKey="brand_id"
            getData={(params: any) => brandApi.get(params)}
            columns={brandColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default BrandListPage;
