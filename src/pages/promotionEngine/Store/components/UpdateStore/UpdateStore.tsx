import Page from 'components/Page';
import UpdateForm from './UpdateForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import useDashboard from 'hooks/useDashboard';
import { useNavigate, useParams } from 'react-router';
import { TPStore } from 'types/promotion/store';
import { Card } from '@mui/material';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { Button, Stack } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { getUserInfo } from 'utils/utils';
import { useQuery } from 'react-query';
import storePromotionApi from 'api/promotion/store';
import { useEffect } from 'react';
const UpdateStore = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');

  const apiKey = user.brandId;
  const { id } = useParams();
  const { data: storePromotionUpdate } = useQuery(
    ['storeId'],
    async () => {
      return storePromotionApi.getStoreById(id, { apiKey }).then((res) => res.data);
    },
    {}
  );
  useEffect(() => {
    if (storePromotionUpdate) {
      updateStorePromotionForm.reset(storePromotionUpdate);
    }
  }, [storePromotionUpdate]);
  const updateStorePromotionForm = useForm<TPStore>({
    defaultValues: {
      ...storePromotionUpdate
    }
  });

  const { watch, handleSubmit, reset } = updateStorePromotionForm;

  const onUpdate = (values: TPStore) => {
    console.log(values);
    const updateCate = storePromotionApi;
    console.log(updateCate);
  };

  return (
    <FormProvider {...updateStorePromotionForm}>
      <Page title="Cập nhật cửa hàng">
        <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Hủy
            </Button>
            <LoadingAsyncButton type="submit" variant="contained" onClick={handleSubmit(onUpdate)}>
              Lưu
            </LoadingAsyncButton>
          </Stack>
        </DashboardNavLayout>
        <Card>
          <UpdateForm></UpdateForm>
        </Card>
      </Page>
    </FormProvider>
  );
};

export default UpdateStore;
