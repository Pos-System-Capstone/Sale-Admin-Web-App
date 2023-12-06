// import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Box, CircularProgress, Button, Stack } from '@mui/material';
// import categoryApi from 'api/category';
import productCategory from 'api/promotion/category';
import CategoryForm from './CategoryForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
// import { EditorState } from 'draft-js';

import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { transformDraftToStr } from 'pages/Products/utils';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';
// import { TCategory } from 'types/category';
import { TProductCategory } from 'types/promotion/productCategory';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import * as yup from 'yup';

interface Props {
  updateMode?: boolean;
  category?: TProductCategory;
  isLoading?: boolean;
}

const schema = yup.object({
  cate_name: yup.string().required('Vui lòng nhập tên Danh mục')
});

const CategoryInfoTab = ({ updateMode, category, isLoading }: Props) => {
  // const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  // const { data: category, isLoading } = useCategory(id!);

  const updateCategoryForm = useForm<TProductCategory>({
    // resolver: yupResolver(schema),
    defaultValues: {
      // description: EditorState.createEmpty().toString()
    }
  });

  useEffect(() => {
    if (!category) return;
    updateCategoryForm.reset({ ...category });
  }, [category, updateCategoryForm]);

  const onSubmit = (values: TProductCategory) => {
    console.log(`data`, values);
    return productCategory
      .updateCategory(category?.productCateId, transformDraftToStr(values))
      .then((res) => {
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        });
        navigate(`${PATH_PROMOTION_APP.category.root}/`);
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };

  return (
    <FormProvider {...updateCategoryForm}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton
            onClick={updateCategoryForm.handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
          >
            Lưu Danh Mục
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          <Card>
            <Box>
              <CategoryForm updateMode={updateMode} />
            </Box>
          </Card>
          {/* <Card>
            <CardTitle pb={2} variant="subtitle1">
              SEO
            </CardTitle>
            <Box>
              <SeoForm />
            </Box>
          </Card> */}
        </Stack>
      )}
    </FormProvider>
  );
};

export default CategoryInfoTab;
