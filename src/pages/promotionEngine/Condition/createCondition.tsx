import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Stack } from '@mui/material';
import categoryApi from 'api/category';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import Alert from '@mui/material/Alert';
import ConditionForm from 'components/form/common/Category/ConditionForm';
import { transformDraftToStr, transformProductForm } from 'pages/Products/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TCategory } from 'types/category';
import * as yup from 'yup';

interface Props {}

const schema = yup.object({
  cate_name: yup.string().required('Please input name')
});

const NewCondition = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const createCategoryForm = useForm<TCategory>({
    resolver: yupResolver(schema),
    defaultValues: {},
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
        navigate(`${PATH_PROMOTION_APP.condition.root}/${res.data}`);
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
          <LoadingAsyncButton
            onClick={createCategoryForm.handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
          >
            + New Rule
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="CONDITION BUILDER">
        <Stack spacing={2}>
          <Stack sx={{ width: '630px' }} spacing={2}>
            <Alert severity="warning">
              Condition is the constraint of the order when Customer check or apply for a promotion.
            </Alert>
          </Stack>
          <Card>
            <Box>
              <ConditionForm />
            </Box>
            <Box></Box>
          </Card>
        </Stack>
      </Page>
    </FormProvider>
  );
};

export default NewCondition;
