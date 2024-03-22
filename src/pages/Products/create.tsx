import { Box, Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TProductCreate } from 'types/product';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import Page from '../../components/Page';
import useDashboard from '../../hooks/useDashboard';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';

import { getUserInfo } from 'utils/utils';
// import productPromotionApi from 'api/promotion/product';
// import MiddleForm from './components/MiddleForm';

const CreateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const methods = useForm<TProductCreate>({
    defaultValues: {
      description: '',
      sellingPrice: 0,
      discountPrice: 0,
      historicalPrice: 0
    }
  });
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { handleSubmit, reset, watch } = methods;

  const onSubmit = async (values: TProductCreate) => {
    const data = {
      brandId: user.brandId,
      name: values.name,
      code: values.code
    };
  };

  return (
    <FormProvider {...methods}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Lưu Sản Phẩm
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Tạo sản phẩm">
        <Box display="flex"></Box>
      </Page>
    </FormProvider>
  );
};

export default CreateProduct;
