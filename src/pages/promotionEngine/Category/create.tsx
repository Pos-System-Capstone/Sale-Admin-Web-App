/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Box, Button, Stack } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Page from 'components/Page';

import { TProductCategory } from 'types/promotion/productCategory';
import { getUserInfo } from 'utils/utils';
import productCategory from 'api/promotion/category';
import MiddleForm from './components/MiddleForm';

const CreateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const methods = useForm<TProductCategory>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {}
  });
  const { handleSubmit, reset, watch } = methods;

  const onSubmit = async (values: TProductCategory) => {
    const data = {
      brandId: user.brandId,
      name: values.name,
      cateId: values.cateId
    };
    const addNew = await productCategory.addCategoriesToProductCategory(data);
    addNew.status === 200
      ? enqueueSnackbar('Thêm thành công', { variant: 'success' })
      : enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
  };

  return (
    <FormProvider {...methods}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Lưu Danh Mục
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Tạo danh mục">
        <Box>
          <MiddleForm />
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreateProduct;
