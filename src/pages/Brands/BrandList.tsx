/* eslint-disable camelcase */
import { Visibility } from '@mui/icons-material';
import Label from 'components/Label';

// material
import { Box, Card, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import brandApi from 'api/brand';
import ResoTable from 'components/ResoTable/ResoTable';
// components
import { Button } from '@mui/material';
import Page from 'components/Page';
import { useNavigate } from 'react-router-dom';
import { BrandStatus, TBrand } from 'types/brand';
import { TTableColumn } from 'types/table';

const BrandListPage = () => {
  const navigate = useNavigate();

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
      render: (_: any, brand: TBrand) => (
        <Label color={brand.status == BrandStatus.ACTIVE ? 'primary' : 'default'}>
          {brand.status == BrandStatus.ACTIVE ? 'Hoạt động' : 'Ngừng hoạt động'}
        </Label>
      ),
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
    <Page>
      <Box>
        <Stack
          my={2}
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3">Danh sách thương hiệu</Typography>
          <Button onClick={() => navigate('new')} variant="contained">
            Tạo nhãn hiệu mới
          </Button>
        </Stack>
      </Box>
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
