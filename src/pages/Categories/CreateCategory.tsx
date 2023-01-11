import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Stack } from '@mui/material';
import categoryApi from 'api/category';
import CategoryForm from 'components/form/common/Category/CategoryForm';
import SeoForm from 'components/form/Seo/SeoForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { CardTitle } from 'pages/Products/components/Card';
import { transformDraftToStr, transformProductForm } from 'pages/Products/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { TCategory } from 'types/category';
import * as yup from 'yup';
import { PATH_DASHBOARD } from 'routes/paths';

interface Props {}

const schema = yup.object({
  cate_name: yup.string().required('Vui lòng nhập tên Danh mục')
});

const CreateCategory = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isExtra: boolean = searchParams.get('isExtra') === 'true';
  const createCategoryForm = useForm<TCategory>({
    resolver: yupResolver(schema),
    defaultValues: {
      // is_container: !isExtra,
      is_extra: isExtra
    },
    shouldUnregister: false
  });

  const onSubmit = (values: TCategory) => {
    console.log(`data`, values);
    const data = transformProductForm(transformDraftToStr(values));
    return categoryApi
      .create(data)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công`, {
          variant: 'success'
        });
        navigate(`${PATH_DASHBOARD.categories.root}/${res.data}`);
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };

  return (
    <FormProvider {...createCategoryForm}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton
            onClick={createCategoryForm.handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
          >
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Tạo danh mục">
        <Stack spacing={2}>
          <Card>
            <Box>
              <CategoryForm />
            </Box>
          </Card>
          <Card>
            <Box>
              <CardTitle mb={2} variant="subtitle1">
                SEO
              </CardTitle>
              <SeoForm />
            </Box>
          </Card>
        </Stack>
      </Page>
    </FormProvider>
  );
};

export default CreateCategory;
