import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Stack } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import Alert from '@mui/material/Alert';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import * as yup from 'yup';
import ConditionFormUpdate from 'components/form/common/Category/ConditionFormUpdate';
import { TConditionBase, TConditionCreate } from 'types/promotion/condition';
import { getUserInfo } from 'utils/utils';
import conditionApi from 'api/promotion/condition';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

interface Props {}

const schema = yup.object({
  cate_name: yup.string().required('Please input name')
});

const UpdateConditionPage = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const isExtra: boolean = searchParams.get('isExtra') === 'true';

  const { id } = useParams();
  const { data: conditionUpdate } = useQuery(
    ['condition', user.brandId],
    async () => {
      return conditionApi.getConditionRuleId(id).then((res) => res.data);
    },
    {
      enabled: Boolean(id)
    }
  );

  const updateConditionForm = useForm<TConditionBase>({
    defaultValues: { ...conditionUpdate },
    resolver: yupResolver(schema)
    // defaultValues: {},
    // shouldUnregister: false
  });

  const { handleSubmit, reset } = updateConditionForm;

  useEffect(() => {
    if (conditionUpdate !== undefined) {
      reset({ ...conditionUpdate });
    }
  }, [conditionUpdate]);

  const onSubmit = (values: TConditionCreate) => {
    console.log(`data`, values);
    values.brandId = user.brandId;
    const body: TConditionCreate = { ...values };
    body.brandId = user.brandId;
    body.ruleName = values.ruleName;
    body.description = values.description;
    body.conditionGroup = values.conditionGroup;
    conditionApi
      .createCondition(body)
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
    <FormProvider {...updateConditionForm}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
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
              <ConditionFormUpdate />
            </Box>
            <Box></Box>
          </Card>
        </Stack>
      </Page>
    </FormProvider>
  );
};

export default UpdateConditionPage;
