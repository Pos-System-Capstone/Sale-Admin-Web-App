import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Stack } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import Alert from '@mui/material/Alert';
import ConditionForm from 'pages/promotionEngine/Condition/ConditionForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import * as yup from 'yup';
import { TConditionCreate } from 'types/promotion/condition';
// import conditionApi from 'api/promotion/condition';
// import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { getUserInfo } from 'utils/utils';

interface Props {}

const schema = yup.object({
  ruleName: yup.string().required('Vui lòng nhập tên'),
  description: yup.string().required('Vui lòng nhập điều kiện')
});

const NewCondition = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const isExtra: boolean = searchParams.get('isExtra') === 'true';

  const createConditionForm = useForm<TConditionCreate>({
    resolver: yupResolver(schema)
    // shouldUnregister: false
  });

  const onSubmit = (values: TConditionCreate) => {
    console.log(`data`, values);
    values.brandId = user.brandId;
    const body: TConditionCreate = { ...values };
    body.brandId = user.brandId;
    body.ruleName = values.ruleName;
    body.description = values.description;
    body.conditionGroups = values.conditionGroups;
    // conditionApi
    //   .createCondition(body)
    //   .then((res) => {
    //     enqueueSnackbar(`Tạo thành công`, {
    //       variant: 'success'
    //     });
    //     navigate(`${PATH_PROMOTION_APP.condition.root}`);
    //   })
    //   .catch((err) => {
    //     enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
    //       variant: 'error'
    //     });
    //   });
  };

  return (
    <FormProvider {...createConditionForm}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <LoadingAsyncButton
            onClick={createConditionForm.handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
          >
            + Tạo
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="TẠO ĐIỀU KIỆN MỚI">
        <Stack spacing={2}>
          <Stack sx={{ width: '680px' }} spacing={2}>
            <Alert severity="warning">
              Điều kiện là ràng buộc của đơn hàng khi Khách hàng kiểm tra hoặc đăng ký khuyến mãi.
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
