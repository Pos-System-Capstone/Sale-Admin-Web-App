/* eslint-disable camelcase */
import { Visibility } from '@mui/icons-material';
// material
import { Card, IconButton, Stack, Tooltip } from '@mui/material';
import brandApi from 'api/brand';
import AutoCompleteStoreSelect from 'components/form/common/AutocompleteStoreSelect/AutocompleteStoreSelect';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { TBrand } from 'types/brand';
import { TTableColumn } from 'types/table';
import BrandDetailDialog from './components/BrandDetailDialog';

const BrandListPage = () => {
  const navigate = useNavigate();

  const [detailBrand, setDetailBrand] = useState<string | null>(null);

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
      renderFormItem: () => <AutoCompleteStoreSelect name="brand_id" label="Nhãn Hiệu" />
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      hideInSearch: true
      // hideInTable: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status'
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
      <BrandDetailDialog
        brandId={detailBrand}
        open={Boolean(detailBrand)}
        onClose={() => setDetailBrand(null)}
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
