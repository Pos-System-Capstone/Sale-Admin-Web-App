import { Button, Card, CircularProgress, Grid } from '@mui/material';
import userApi from 'api/user';
import { UpdateConfirmDialog } from 'components/DeleteConfirmDialog';
import Page from 'components/Page';
import { SHA256 } from 'crypto-js';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { TUpdateUser, TUser } from 'types/user';
import { Role } from 'utils/role';
import ProfileAbout from './ProfileAbout';

interface Props {
  updateMode?: boolean;
}

export default function Profile({ updateMode }: Props) {
  const { accountId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const updateUserInfoForm = useForm<TUpdateUser>();
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
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

  const handleSubmitUpdateUserInfoForm = (updateUserInformationFromForm: TUpdateUser) => {
    const updateUserInformation = { ...updateUserInformationFromForm };
    if (updateUserInformation.password) {
      updateUserInformation.password = SHA256(updateUserInformation.password ?? '').toString();
    }
    // Handle submit form for STORE MANAGER update STAFF
    if (user?.role.includes(Role.StoreManager)) {
      userApi
        .updateUserInformation(accountId ?? '', updateUserInformation, user.storeId)
        ?.then((res) => {
          enqueueSnackbar(`cập nhật thành công`, {
            variant: 'success'
          });
          setIsOpenConfirmDialog(!isOpenConfirmDialog);
        })
        .catch((err) => {
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    }
    // Handle submit form for BRAND MANAGER update STORE MANAGER
    else if (user?.role.includes(Role.BrandManager)) {
      userApi
        .updateUserInformation(accountId ?? '', updateUserInformation, userInfo?.storeId)
        ?.then((res) => {
          enqueueSnackbar(`cập nhật thành công`, {
            variant: 'success'
          });
          setIsOpenConfirmDialog(!isOpenConfirmDialog);
        })
        .catch((err) => {
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    }
  };

  useEffect(() => {
    setIsLoading(!isLoading);
    getUserInfo();
  }, [accountId]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Page title="Thông tin người dùng">
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
              {((user?.role.includes(Role.SystemAdmin) &&
                (userInfo?.role.includes(Role.BrandAdmin) ||
                  userInfo?.role.includes(Role.BrandManager))) ||
                (user?.role.includes(Role.BrandManager) &&
                  userInfo?.role.includes(Role.StoreManager)) ||
                (user?.role.includes(Role.StoreManager) &&
                  userInfo?.role.includes(Role.StoreStaff)) ||
                user?.name === userInfo?.name) && (
                <Button
                  onClick={() => setIsOpenConfirmDialog(!isOpenConfirmDialog)}
                  variant="contained"
                >
                  Cập nhật
                </Button>
              )}
            </Grid>
            <UpdateConfirmDialog
              title={'Xác nhận update thông tin'}
              description={'Bạn chắc chắn muốn cập nhật thông tin ?'}
              open={isOpenConfirmDialog}
              onClose={() => setIsOpenConfirmDialog(false)}
              onUpdate={updateUserInfoForm.handleSubmit(handleSubmitUpdateUserInfoForm)}
            />
          </Grid>
        </FormProvider>
      </Card>
    </Page>
  );
}
