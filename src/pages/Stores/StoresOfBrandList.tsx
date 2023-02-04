/* eslint-disable camelcase */
import { Visibility } from '@mui/icons-material';
import Label from 'components/Label';

// material
import { Box, Card, IconButton, Stack, Tooltip } from '@mui/material';
import brandApi from 'api/brand';
import ResoTable from 'components/ResoTable/ResoTable';
// components
import { Button } from '@mui/material';
import Page from 'components/Page';
import { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { StoreStatus, TStore } from 'types/store';

const StoreOfBrandList = () => {
  const navigate = useNavigate();
  const { brandId } = useParams();

  const storeDetailColumns: ResoDescriptionColumnType<TStore>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên đầy đủ',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Tên rút gọn',
      dataIndex: 'shortName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInSearch: true
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      render: (status) => {
        return status === StoreStatus.ACTIVE ? (
          <Label color="primary">Hoạt động </Label>
        ) : (
          <Label color="warning"> Không hoạt động </Label>
        );
      }
    },
    {
      title: 'Chi tiết',
      fixed: 'right',
      hideInSearch: true,
      render: (_: any, store: TStore) => (
        <Tooltip title="Chi tiết">
          <IconButton
            onClick={() => navigate(PATH_DASHBOARD.stores.storeById(store.id))}
            size="large"
          >
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
    <Page
      actions={() => [
        <Button key="add-store" onClick={() => navigate('new')} variant="contained">
          Tạo cửa hàng mới
        </Button>
      ]}
      title="Danh sách cửa hàng"
    >
      <Card>
        <Stack spacing={2}>
          <Box>
            <ResoTable
              pagination
              showAction={false}
              rowKey="store_id"
              getData={(params: any) => brandApi.getStoreOfBrand(brandId!, params)}
              columns={storeDetailColumns}
            />
          </Box>
        </Stack>
      </Card>
    </Page>
  );
};

export default StoreOfBrandList;
