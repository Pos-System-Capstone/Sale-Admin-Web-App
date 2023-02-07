// material
import { Button, Card, CircularProgress, Grid } from '@mui/material';
import userApi from 'api/user';
import { UpdateConfirmDialog } from 'components/DeleteConfirmDialog';
import Page from 'components/Page';
import { SHA256 } from 'crypto-js';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { TUpdateUser } from 'types/user';
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

  const getUserInfo = async () => {
    const userInfo = await userApi.getById(accountId ?? '').then((res) => res.data);
    return userInfo;
  };

  const { data: userInfo, isLoading, error } = useQuery('user', getUserInfo);

  const handleSubmitUpdateUserInfoForm = (updateUserInformationFromForm: TUpdateUser) => {
    const updateUserInformation = { ...updateUserInformationFromForm };
    if (updateUserInformation.password) {
      updateUserInformation.password = SHA256(updateUserInformation.password ?? '').toString();
    }
    // Handle submit form for STORE MANAGER
    if (user?.role.includes(Role.StoreManager)) {
      userApi
        .updateUserInformation(accountId ?? '', updateUserInformation, user.storeId)
        ?.then((res) => {
          enqueueSnackbar(`cập nhật thành công`, {
            variant: 'success'
          });
        })
        .catch((err) => {
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    }
    // Handle submit form for BRAND MANAGER
    else if (user?.role.includes(Role.BrandManager)) {
    }
  };

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
              {((user?.role.includes(Role.StoreManager) &&
                userInfo?.role.includes(Role.StoreStaff)) ||
                (user?.role.includes(Role.BrandManager) &&
                  userInfo?.role.includes(Role.StoreManager)) ||
                (user?.role.includes(Role.BrandAdmin) &&
                  userInfo?.role.includes(Role.BrandAdmin)) ||
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
