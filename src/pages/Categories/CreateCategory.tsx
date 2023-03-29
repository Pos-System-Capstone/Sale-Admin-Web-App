// import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Stack } from '@mui/material';
import categoryApi from 'api/category';
import CategoryForm from 'components/form/common/Category/CategoryForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { TCategoryCreate } from 'types/category';
import * as yup from 'yup';
import { PATH_DASHBOARD } from 'routes/paths';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {}

const schema = yup.object({
  code: yup.string().required('Vui lòng nhập Mã danh mục'),
  name: yup.string().required('Vui lòng nhập Tên danh mục'),
  categoryType: yup.string().required('Vui lòng chọn Loại danh mục'),
  displayOrder: yup.number().required('Vui lòng nhập thứ tự hiển thị danh mục'),
  description: yup.string().required('Vui lòng chọn Mô tả danh mục')
});

const CreateCategory = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const isExtra: boolean = searchParams.get('isExtra') === 'true';
  const createCategoryForm = useForm<TCategoryCreate>({
    resolver: yupResolver(schema),
    defaultValues: {}
    // shouldUnregister: false
  });

  const onSubmit = (values: TCategoryCreate) => {
    return categoryApi
      .create(values)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công`, {
          variant: 'success'
        });
        // navigate(`${PATH_DASHBOARD.categories.root}/${res.data}`);
        navigate(PATH_DASHBOARD.categories.root);
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
            Tạo
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
          {/* <Card>
            <Box>
              <CardTitle mb={2} variant="subtitle1">
                SEO
              </CardTitle>
              <SeoForm />
            </Box>
          </Card> */}
        </Stack>
      </Page>
    </FormProvider>
  );
};

export default CreateCategory;
