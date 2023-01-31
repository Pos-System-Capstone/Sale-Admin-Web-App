/* eslint-disable camelcase */
// material
import { Card, DialogContent, Stack } from '@mui/material';
import storeApi from 'api/store';
import Page from 'components/Page';
import ResoDescriptions from 'components/ResoDescriptions';
import ResoTable from 'components/ResoTable/ResoTable';
import { useQuery } from 'react-query';
// components
import { useParams } from 'react-router-dom';
import { TEmployee } from 'types/employee';
import { TStoreDetail } from 'types/store';
import { TTableColumn } from 'types/table';

const StoreDetailPage = () => {
  const { storeId } = useParams();
  const { data: store, isLoading } = useQuery(
    ['stores', storeId],
    () => storeApi.getStoreDetail(storeId!).then((res) => res.data),
    {
      enabled: Boolean(storeId)
    }
  );

  const storeDetailColumns: TTableColumn<TStoreDetail>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên cửa hàng',
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
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true
    },
    {
      title: 'Mã code',
      dataIndex: 'code',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true
    }
    // {
    //   title: 'Chi tiết',
    //   fixed: 'right',
    //   hideInSearch: true,
    //   render: (_: any, brand: TBrand) => (
    //     <Tooltip title="Chi tiết">
    //       {/* <IconButton onClick={() => setDetailBrand(brand.id)} size="large"> */}
    //       <IconButton onClick={() => navigate(`${brand.id}`)} size="large">
    //         <Visibility />
    //       </IconButton>
    //     </Tooltip>
    //   )
    // }
  ];

  const employeeDetailColumns: TTableColumn<TEmployee>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username'
      // renderFormItem: () => <AutoCompleteStoreSelect name="brand_id" label="Nhãn Hiệu" />
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      hideInSearch: true
    },
    {
      title: 'Mã code',
      dataIndex: 'code',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true
    }
  ];

  return (
    <Page title="Chi tiết cửa hàng">
      <Card>
        <DialogContent dividers>
          <Stack spacing={2}>
            <ResoDescriptions
              title="Thông tin"
              labelProps={{ fontWeight: 'bold' }}
              columns={storeDetailColumns as any}
              datasource={store}
              column={2}
            />
          </Stack>
        </DialogContent>

        <Stack spacing={2}>
          {/* <Typography variant="h5">Danh sách nhân viên</Typography> */}
          <ResoTable
            showAction={false}
            rowKey="store_id"
            getData={(params: any) => storeApi.getStoreEmployees(storeId ?? '', params)}
            columns={employeeDetailColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default StoreDetailPage;
