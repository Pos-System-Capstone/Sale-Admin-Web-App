/* eslint-disable camelcase */
// material
import {
  Box,
  Button,
  Card,
  DialogContent,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import storeApi from 'api/store';
import Page from 'components/Page';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import { useEffect, useRef, useState } from 'react';
// components
import { Visibility } from '@mui/icons-material';
import Label from 'components/Label';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import AccountsList from 'pages/accounts/components/AccountsList';
import { roleEnumArray } from 'pages/accounts/config';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { EmployeeStatus, TEmployee } from 'types/employee';
import { StoreStatus, TStoreDetail } from 'types/store';
import { TTableColumn } from 'types/table';
import { TUser } from 'types/user';
import { Role } from 'utils/role';

const StoreDetailPage = () => {
  const { storeId } = useParams();
  const { user } = useAuth();
  const [store, setStore] = useState<TStoreDetail>();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // const { data: store, isLoading } = useQuery(
  //   ['stores', storeId],
  //   () => storeApi.getStoreDetail(storeId!).then((res) => res.data),
  //   {
  //     enabled: Boolean(storeId)
  //   }
  // );

  const accountColumns: TTableColumn<TUser>[] = [
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
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: roleEnumArray,
      hideInSearch:
        user?.role.includes(Role.SystemAdmin) || user?.role.includes(Role.BrandAdmin) ? false : true
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

  const handleGetStoreDetail = async () => {
    //call data base on store of store manager when logged
    if (user?.role.includes(Role.StoreManager) || user?.role.includes(Role.StoreStaff)) {
      return await storeApi
        .getStoreDetail(user.storeId)
        .then((res) => {
          const storeData = res.data;
          setStore(storeData);
          setIsLoading(!isLoading);
        })
        .catch(() => {
          setIsLoading(!isLoading);
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    }
    //call data when user redirect from store list to see store detail
    return await storeApi
      .getStoreDetail(storeId!)
      .then((res) => {
        const storeData = res.data;
        setStore(storeData);
        setIsLoading(!isLoading);
      })
      .catch(() => {
        setIsLoading(!isLoading);
        enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
          variant: 'error'
        });
      });
  };

  const handleCallListDataBaseOnRole = (params: any) => {
    if (user?.role.includes(Role.StoreManager)) {
      return storeApi.getStoreEmployees(user?.storeId, params);
    } else {
      return storeApi.getStoreEmployees(storeId!, params);
    }
  };

  useEffect(() => {
    setIsLoading(!isLoading);
    handleGetStoreDetail();
  }, [storeId]);

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
    },
    {
      title: 'Chi tiết',
      hideInSearch: true,
      render: (_: any, employee: TEmployee) => (
        <Tooltip title="Chi tiết">
          {/* <IconButton onClick={() => setDetailBrand(brand.id)} size="large"> */}
          <IconButton
            onClick={() => navigate(`${PATH_DASHBOARD.user.profileById(employee.id)}`)}
            size="large"
          >
            <Visibility />
          </IconButton>
        </Tooltip>
      )
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

      {(user?.role.includes(Role.StoreManager) || user?.role.includes(Role.BrandManager)) && (
        <Card sx={{ my: 2 }}>
          <Stack spacing={2}>
            <Box sx={{ mb: 2 }} display={'flex'} justifyContent={'space-between'}>
              <Typography variant="h5">Danh sách nhân viên</Typography>
              <Button
                onClick={() =>
                  navigate(
                    { pathname: PATH_DASHBOARD.accounts.new, search: `?storeId=${storeId}` },
                    { replace: true }
                  )
                }
                variant="contained"
              >
                Tạo tài khoản mới
              </Button>
            </Box>
            <AccountsList />
            {/* <ResoTable
            showAction={false}
            ref={tableRef}
            rowKey="store_id"
            getData={(params: any) => handleCallListDataBaseOnRole(params)}
            columns={employeeDetailColumns}
          /> */}
          </Stack>
        </Card>
      )}
    </Page>
  );
};

export default StoreDetailPage;
