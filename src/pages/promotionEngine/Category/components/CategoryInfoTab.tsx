// import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Box, CircularProgress, Stack } from '@mui/material';
// import categoryApi from 'api/category';
import productCategory from 'api/promotion/category';
import CategoryForm from './CategoryForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
// import { EditorState } from 'draft-js';

import useDashboard from 'hooks/useDashboard';
// import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
// import { transformDraftToStr } from 'pages/Products/utils';
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
    const data = {
      cateId: values.cateId,
      name: values.name
    };
    const updateCate = productCategory
      .updateCategory(category?.productCateId, data)
      .then((res) => {
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        });
        navigate(`${PATH_PROMOTION_APP.category.root}`);
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
    console.log(updateCate);
  };

  return (
    <FormProvider {...updateCategoryForm}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          <Card>
            <Box>
              <CategoryForm updateMode={updateMode} />
            </Box>
            <Box display={'flex'} flexDirection={'row-reverse'}>
              <LoadingAsyncButton
                onClick={updateCategoryForm.handleSubmit(onSubmit)}
                type="submit"
                variant="contained"
                sx={{ margin: '10px 16px 10px 10px ', flexEnd: 'right' }}
              >
                Cập nhật
              </LoadingAsyncButton>
            </Box>
          </Card>
        </Stack>
      )}
    </FormProvider>
  );
};

export default CategoryInfoTab;
