// import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Box, CircularProgress, Button, Stack } from '@mui/material';
// import categoryApi from 'api/category';
import productApi from 'api/promotion/product_promotion';
import ProductForm from './ProductForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
// import { EditorState } from 'draft-js';

import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { transformDraftToStr } from 'pages/Products/utils';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { TProductPromotionAPI } from 'types/promotion/productPromotion';
import * as yup from 'yup';

interface Props {
  updateMode?: boolean;
  product?: TProductPromotionAPI;
  isLoading?: boolean;
}

const schema = yup.object({
  cate_name: yup.string().required('Vui lòng nhập tên Danh mục')
});

const ProductInfoTab = ({ updateMode, product, isLoading }: Props) => {
  // const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  // const { data: category, isLoading } = useCategory(id!);

  const updateProductForm = useForm<TProductPromotionAPI>({
    // resolver: yupResolver(schema),
    defaultValues: {
      // description: EditorState.createEmpty().toString()
    }
  });

  useEffect(() => {
    if (!product) return;
    updateProductForm.reset({ ...product });
  }, [product, updateProductForm]);

  const onSubmit = (values: TProductPromotionAPI) => {
    console.log(`data`, values);
    return productApi
      .updateProduct(product?.productId, transformDraftToStr(values))
      .then((res) => {
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        });
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };

  return (
    <FormProvider {...updateProductForm}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton
            onClick={updateProductForm.handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
          >
            Lưu sản phẩm
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          <Card>
            <Box>
              <ProductForm updateMode={updateMode} />
            </Box>
          </Card>
        </Stack>
      )}
    </FormProvider>
  );
};

export default ProductInfoTab;
