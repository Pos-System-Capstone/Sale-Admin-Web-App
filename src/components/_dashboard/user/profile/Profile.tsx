import { Button, Card, CircularProgress, Grid } from '@mui/material';
import userApi from 'api/user';
import { UpdateConfirmDialog } from 'components/DeleteConfirmDialog';
import Page from 'components/Page';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { TUpdateUser, TUser, UserStatus } from 'types/user';
import { Role } from 'utils/role';
import ProfileAbout from './ProfileAbout';

interface Props {
  updateMode?: boolean;
}

export default function Profile({ updateMode }: Props) {
  const { accountId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const updateUserInfoForm = useForm<TUpdateUser>();
  const [isOpenConfirmUpdateUserInformationDialog, setIsOpenConfirmUpdateUserInformationDialog] =
    useState(false);
  const [isShowConfirmUpdateStatusDialog, setIsShowConfirmUpdateStatusDialog] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<TUser>();
  const [isLoading, setIsLoading] = useState(false);

  const getUserInfo = async () =>
    await userApi
      .getById(accountId ?? '')
      .then((res) => {
        setUserInfo(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
          variant: 'error'
        });
      });

  const handleSubmitUpdateUserInfoForm = async (updateUserInformationFromForm: TUpdateUser) => {
    const updateUserInformation = { ...updateUserInformationFromForm };
    // Handle submit form for STORE MANAGER update STAFF
    if (user?.role.includes(Role.StoreManager) && userInfo?.role.includes(Role.StoreStaff)) {
      await userApi
        .updateUserInformation(userInfo.id ?? '', updateUserInformation, user.storeId)
        ?.then((res) => {
          enqueueSnackbar(`Cập nhật thành công`, {
            variant: 'success'
          });
          setIsUpdateSuccess(!isUpdateSuccess);
          setIsOpenConfirmUpdateUserInformationDialog(!isOpenConfirmUpdateUserInformationDialog);
        })
        .catch((err) => {
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    }
    // Handle submit form for STORE MANAGER update their account
    else if (user?.role.includes(Role.StoreManager) && userInfo?.role.includes(Role.StoreManager)) {
      await userApi
        .updateUserInformation(user.id ?? '', updateUserInformation, user.storeId)
        ?.then((res) => {
          enqueueSnackbar(`Cập nhật thành công`, {
            variant: 'success'
          });
          setIsUpdateSuccess(!isUpdateSuccess);
          setIsOpenConfirmUpdateUserInformationDialog(!isOpenConfirmUpdateUserInformationDialog);
        })
        .catch((err) => {
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    }
    // Handle submit form for BRAND MANAGER update STORE MANAGER
    else if (user?.role.includes(Role.BrandManager) && userInfo?.role.includes(Role.StoreManager)) {
      await userApi
        .updateUserInformation(userInfo.id ?? '', updateUserInformation, userInfo?.storeId)
        ?.then((res) => {
          enqueueSnackbar(`Cập nhật thành công`, {
            variant: 'success'
          });
          setIsUpdateSuccess(!isUpdateSuccess);
          setIsOpenConfirmUpdateUserInformationDialog(!isOpenConfirmUpdateUserInformationDialog);
        })
        .catch((err) => {
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    }
    // Handle submit form for BRAND MANAGER update their account
    else if (user?.role.includes(Role.BrandManager) && userInfo?.role.includes(Role.BrandManager)) {
      await userApi
        .updateUserInformation(user.id ?? '', updateUserInformation, user.brandId)
        ?.then((res) => {
          enqueueSnackbar(`Cập nhật thành công`, {
            variant: 'success'
          });
          setIsUpdateSuccess(!isUpdateSuccess);
          setIsOpenConfirmUpdateUserInformationDialog(!isOpenConfirmUpdateUserInformationDialog);
        })
        .catch((err) => {
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    }
  };

  const onConfirmUpdateProfileStatus = async () => {
    await userApi
      .updateUserStatus(userInfo?.id ? userInfo.id : '', UserStatus.ACTIVE)
      .then(() => {
        enqueueSnackbar('Thay đổi trạng thái thành công', { variant: 'success' });
        setIsUpdateSuccess(!isUpdateSuccess);
        setIsShowConfirmUpdateStatusDialog(!isShowConfirmUpdateStatusDialog);
      })
      .catch(() => {
        enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
          variant: 'error'
        });
      });
  };

  useEffect(() => {
    setIsLoading(!isLoading);
    getUserInfo();
  }, [accountId, isUpdateSuccess]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Page
      title="Thông tin người dùng"
      actions={() => [
        userInfo?.status === UserStatus.DEACTIVATE && (
          <Button
            onClick={() => setIsShowConfirmUpdateStatusDialog(!isShowConfirmUpdateStatusDialog)}
            key="delete-menu"
            size="medium"
            color="primary"
            variant="contained"
          >
            Kích hoạt tài khoản
          </Button>
        )
      ]}
    >
      <Card variant="outlined">
        <FormProvider {...updateUserInfoForm}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} display={'flex'} justifyContent={'end'}>
              <ProfileAbout updateMode={updateMode} userInfo={userInfo} />
            </Grid>
            <Grid item xs={12} sm={12} display={'flex'} justifyContent={'end'}>
              {/* System admin => update brand manager or brand admin info */}
              {/* Brand Manager => update store manager info */}
              {/* Store Manager => update staff info */}
              {/* User account => update their info */}
              {(user?.id == userInfo?.id ||
                (user?.role.includes(Role.SystemAdmin) &&
                  (userInfo?.role.includes(Role.BrandAdmin) ||
                    userInfo?.role.includes(Role.BrandManager))) ||
                (user?.role.includes(Role.BrandManager) &&
                  userInfo?.role.includes(Role.StoreManager)) ||
                (user?.role.includes(Role.StoreManager) &&
                  userInfo?.role.includes(Role.StoreStaff))) && (
                <Button
                  onClick={() =>
                    setIsOpenConfirmUpdateUserInformationDialog(
                      !isOpenConfirmUpdateUserInformationDialog
                    )
                  }
                  variant="contained"
                >
                  Cập nhật
                </Button>
              )}
            </Grid>
            <UpdateConfirmDialog
              title={'Xác nhận update thông tin'}
              description={'Bạn chắc chắn muốn cập nhật thông tin ?'}
              open={isOpenConfirmUpdateUserInformationDialog}
              onClose={() => setIsOpenConfirmUpdateUserInformationDialog(false)}
              onUpdate={updateUserInfoForm.handleSubmit(handleSubmitUpdateUserInfoForm)}
            />
          </Grid>
        </FormProvider>
        <UpdateConfirmDialog
          open={isShowConfirmUpdateStatusDialog}
          onClose={() => setIsShowConfirmUpdateStatusDialog(!isShowConfirmUpdateStatusDialog)}
          onUpdate={() => onConfirmUpdateProfileStatus()}
          title={'Xác nhận cập nhật trạng thái người dùng'}
          description={'Người dùng này sẽ thay đổi trạng thái hoạt động'}
        />
      </Card>
    </Page>
  );
}
