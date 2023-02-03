/* eslint-disable camelcase */
// material
import { Card, DialogContent, Stack, Typography } from '@mui/material';
import storeApi from 'api/store';
import Page from 'components/Page';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import ResoTable from 'components/ResoTable/ResoTable';
import { useRef } from 'react';
import { useQuery } from 'react-query';
// components
import Label from 'components/Label';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { EmployeeStatus, TEmployee } from 'types/employee';
import { StoreStatus, TStoreDetail } from 'types/store';
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
  const navigate = useNavigate();
  const tableRef = useRef<any>();

  const storeDetailColumns: ResoDescriptionColumnType<TStoreDetail>[] = [
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
      hideInSearch: true,
      render: (status) => {
        return status === StoreStatus.ACTIVE ? (
          <Label color="primary">Hoạt động </Label>
        ) : (
          <Label color="warning">Không hoạt động</Label>
        );
      }
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
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      render: (status) => {
        return status === EmployeeStatus.ACTIVE ? (
          <Label color="primary">Hoạt động </Label>
        ) : (
          <Label color="warning"> Không hoạt động </Label>
        );
      }
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
      </Card>

      <Card sx={{ my: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Danh sách nhân viên</Typography>
          <ResoTable
            ref={tableRef}
            rowKey="store_id"
            getData={(params: any) => storeApi.getStoreEmployees(storeId ?? '', params)}
            columns={employeeDetailColumns}
            onDelete={() => {}}
            onEdit={(employee: TEmployee) => {
              navigate(`${PATH_DASHBOARD.user.profileById(employee.id)}`);
            }}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default StoreDetailPage;
