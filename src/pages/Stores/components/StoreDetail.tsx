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
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { UpdateConfirmDialog } from 'components/DeleteConfirmDialog';
import UpdateStoreInformation from './UpdateStoreInformation/UpdateStoreInformation';

const StoreDetailPage = () => {
  const { storeId } = useParams();
  const { user } = useAuth();
  const [store, setStore] = useState<TStoreDetail>();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isShowConfirmUpdateStatusDialog, setIsShowConfirmUpdateStatusDialog] = useState(false);
  const [openUpdateStoreInformationForm, setOpenUpdateStoreInformationForm] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

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
  }, [storeId, isUpdateSuccessful]);

  const navigate = useNavigate();
  const tableRef = useRef<any>();

  const onConfirmUpdateStoreStatus = async () => {
    await storeApi
      .updateStoreStatus(store?.id ?? '', StoreStatus.ACTIVE)
      .then(() => {
        enqueueSnackbar('Xoá thành công', { variant: 'success' });
        setIsShowConfirmUpdateStatusDialog(!isShowConfirmUpdateStatusDialog);
        setIsUpdateSuccessful(!isUpdateSuccessful);
      })
      .catch(() => {
        enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
          variant: 'error'
        });
      });
  };

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
    <Page
      title="Chi tiết cửa hàng"
      actions={() => [
        user?.role.includes(Role.BrandManager) && store?.status.includes(StoreStatus.DEACTIVE) ? (
          <Button
            key="add-store"
            onClick={() => setIsShowConfirmUpdateStatusDialog(!isShowConfirmUpdateStatusDialog)}
            variant="contained"
          >
            Đưa cửa hàng vào hoạt động
          </Button>
        ) : (
          <></>
        )
      ]}
    >
      <Card>
        <DialogContent dividers>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Thông tin</Typography>
            {user?.role.includes(Role.BrandManager) && (
              <Button
                onClick={() => setOpenUpdateStoreInformationForm(!openUpdateStoreInformationForm)}
                variant="contained"
              >
                Cập nhật thông tin
              </Button>
            )}
          </Stack>
          <br />
          {openUpdateStoreInformationForm ? (
            <UpdateStoreInformation
              onUpdateFormSuccessful={() => {
                setOpenUpdateStoreInformationForm(false);
                setIsUpdateSuccessful(!isUpdateSuccessful);
              }}
              currentStoreInformation={store}
            />
          ) : (
            <ResoDescriptions
              labelProps={{ fontWeight: 'bold' }}
              columns={storeDetailColumns as any}
              datasource={store}
              column={2}
            />
          )}
        </DialogContent>
      </Card>

      {(user?.role.includes(Role.StoreManager) || user?.role.includes(Role.BrandManager)) && (
        <Card sx={{ my: 2 }}>
          <Stack spacing={2}>
            <Box sx={{ mb: 2 }} display={'flex'} justifyContent={'space-between'}>
              <Typography variant="h5">Danh sách nhân viên</Typography>
              <Button
                startIcon={<Icon icon={plusFill} />}
                onClick={() =>
                  navigate(
                    { pathname: PATH_DASHBOARD.accounts.new, search: `?storeId=${storeId}` },
                    { replace: true }
                  )
                }
              >
                Tạo tài khoản mới
              </Button>
            </Box>
            <AccountsList />
          </Stack>
        </Card>
      )}

      <UpdateConfirmDialog
        open={isShowConfirmUpdateStatusDialog}
        onClose={() => setIsShowConfirmUpdateStatusDialog(!isShowConfirmUpdateStatusDialog)}
        onUpdate={() => onConfirmUpdateStoreStatus()}
        title={'Xác nhận cập nhật trạng thái cửa hàng'}
        description={'Cửa hàng này sẽ thay đổi trạng thái hoạt động'}
      />
    </Page>
  );
};

export default StoreDetailPage;
