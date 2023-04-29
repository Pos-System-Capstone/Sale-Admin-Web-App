/* eslint-disable camelcase */
import { Visibility } from '@mui/icons-material';
import Label from 'components/Label';

// material
import { Avatar, Box, Card, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import brandApi from 'api/brand';
import ResoTable from 'components/ResoTable/ResoTable';
// components
import { Button } from '@mui/material';
import Page from 'components/Page';
import { useNavigate } from 'react-router-dom';
import { BrandStatus, TBrand } from 'types/brand';
import { TTableColumn } from 'types/table';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';

const BrandListPage = () => {
  const navigate = useNavigate();

  const brandColumns: TTableColumn<TBrand>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'picUrl',
      hideInSearch: true,
      render: (src, { brand_name }: any) => (
        <Avatar
          alt={brand_name}
          src={src}
          variant="circular"
          style={{ width: '54px', height: '54px' }}
        />
      )
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
          <Button
            onClick={() => navigate('new')}
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
          >
            Tạo nhãn hiệu mới
          </Button>
        </Stack>
      </Box>
      <Card>
        <Stack spacing={2}>
          <ResoTable
            showAction={false}
            rowKey="id"
            getData={(params: any) => brandApi.get(params)}
            columns={brandColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default BrandListPage;
