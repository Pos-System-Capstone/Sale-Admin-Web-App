// import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Box, CircularProgress, Stack } from '@mui/material';

import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';

import useDashboard from 'hooks/useDashboard';
// import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';

import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { TProductCategory } from 'types/promotion/productCategory';

import * as yup from 'yup';
import { getUserInfo } from 'utils/utils';
// import { TCategoryProduct } from 'types/product';
import ProductInfoForm from './ProductInfoForm';
// import productPromotionApi from 'api/promotion/product';
import { TProductPromotionAPI } from 'types/promotion/productPromotion';
import productPromotion from 'api/promotion/product_promotion';

interface Props {
  updateMode?: boolean;
  category?: TProductCategory;
  isLoading?: boolean;
}

const schema = yup.object({
  cate_name: yup.string().required('Vui lòng nhập tên Danh mục')
});

const ProductInfoTab = ({ updateMode, category, isLoading }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const methods = useForm<TProductPromotionAPI>({});
  const { handleSubmit, reset, watch } = methods;
  console.log(category?.productCateId);
  console.log(category?.cateId);
  console.log(category?.name);
  const onSubmit = async (values: TProductPromotionAPI) => {
    const data = {
      brandId: user.brandId,
      cateId: category?.cateId,
      code: values.code,
      name: values.name,
      productCateId: category?.productCateId
    };

    // const addNew = await productPromotionApi.createProduct(data);
    const addNew = await productPromotion.addProduct(data);
    console.log(addNew);

    addNew.status === 200
      ? enqueueSnackbar('Thêm thành công', { variant: 'success' })
      : enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
  };

  return (
    <FormProvider {...methods}>
      {/* <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Lưu Sản Phẩm
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout> */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          <Card>
            <Box>
              <ProductInfoForm updateMode={updateMode} />
            </Box>
            <Box display={'flex'} flexDirection={'row-reverse'}>
              <LoadingAsyncButton
                onClick={handleSubmit(onSubmit)}
                type="submit"
                variant="contained"
                sx={{ margin: '10px 0px 10px 10px ', flexEnd: 'right' }}
              >
                Lưu Sản Phẩm
              </LoadingAsyncButton>
            </Box>
          </Card>
        </Stack>
      )}
    </FormProvider>
  );
};

export default ProductInfoTab;
