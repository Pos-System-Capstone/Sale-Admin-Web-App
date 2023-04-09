/* eslint-disable camelcase */
// material
import { Box, Button, Card, DialogContent, Stack, Typography } from '@mui/material';
import storeApi from 'api/store';
import Page from 'components/Page';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import { useEffect, useRef, useState } from 'react';
// components
import Label from 'components/Label';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import AccountsList from 'pages/accounts/components/AccountsList';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { StoreStatus, TStoreDetail } from 'types/store';
import { Role } from 'utils/role';

const StoreDetailPage = () => {
  const { storeId } = useParams();
  const { user } = useAuth();
  const [store, setStore] = useState<TStoreDetail>();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => {
    setIsLoading(!isLoading);
    handleGetStoreDetail();
  }, [storeId]);

  const navigate = useNavigate();
  const tableRef = useRef<any>();

  const storeDetailColumns: ResoDescriptionColumnType<TStoreDetail>[] = [
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
          </Stack>
        </Card>
      )}
    </Page>
  );
};

export default StoreDetailPage;
