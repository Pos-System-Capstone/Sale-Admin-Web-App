// material
import { Button, Card, CircularProgress, Grid } from '@mui/material';
import userApi from 'api/user';
import { UpdateConfirmDialog } from 'components/DeleteConfirmDialog';
import Page from 'components/Page';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { TUser } from 'types/user';
import ProfileAbout from './ProfileAbout';

interface Props {
  updateMode?: boolean;
}

export default function Profile({ updateMode }: Props) {
  const { accountId } = useParams();
  const updateUserInfoForm = useForm<TUser>();
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

  const getUserInfo = async () => {
    const userInfo = await userApi.getById(accountId ?? '').then((res) => res.data);
    return userInfo;
  };

  const { data: userInfo, isLoading, error } = useQuery('user', getUserInfo);

  const handleSubmitUpdateUserInfoForm = () => {};

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
              <Button
                onClick={() => setIsOpenConfirmDialog(!isOpenConfirmDialog)}
                variant="contained"
              >
                Lưu
              </Button>
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
