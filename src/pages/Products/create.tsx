/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
// import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import productApi from 'api/product';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { ProductTypeEnum, TProductCreate } from 'types/product';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import Page from '../../components/Page';
import useDashboard from '../../hooks/useDashboard';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import MiddleForm from './components/MiddleForm';
// import { validationSchema } from './type';

const CreateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  // const [searchParams] = useSearchParams();
  // const cloneProductId: any = searchParams.get('cloneProductId');
  // const productType: any = Number(searchParams.get('productType') ?? ProductTypeEnum.Single);

  const methods = useForm<TProductCreate>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      description: '',
      sellingPrice: 0,
      discountPrice: 0,
      historicalPrice: 0
    }
  });
  const { handleSubmit, reset, watch } = methods;

  const onSubmit = async (values: TProductCreate) => {
    const data = { ...values };
    if (data.type === ProductTypeEnum.CHILD) {
      await productApi
        .getById(data.parentProductId)
        .then((res) => {
          data.categoryId = res.data.categoryId !== undefined ? res.data.categoryId : '';
          res.data.name !== undefined && (data.name = res.data.name + ' size ' + data.size);
        })
        .catch(() => {
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    }
    return productApi
      .create(data)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công ${data.name}`, {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.products.editById(res.data.id));
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };

  // if (isLoading) {
  //   return (
  //     <Box
  //       sx={{
  //         width: '100%',
  //         height: '100%'
  //       }}
  //       minHeight="40vh"
  //       borderRadius="1px"
  //       flexDirection="column"
  //       zIndex={999}
  //       justifyContent="center"
  //       alignItems="center"
  //       display="flex"
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <FormProvider {...methods}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Tạo sản phẩm">
        <Box display="flex">
          <MiddleForm />
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreateProduct;
