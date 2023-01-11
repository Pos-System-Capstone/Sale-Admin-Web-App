/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Stack } from '@mui/material';
import { useTheme } from '@mui/styles';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import useLocales from 'hooks/useLocales';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { CardTitle } from 'pages/Products/components/Card';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import storeApi from 'redux/store/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { TStore } from 'types/store';
import StoreForm from './components/StoreForm';
import { storeSchemaBuilder } from './utils';

const CreateStorePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(storeSchemaBuilder(translate)),
    defaultValues: {
      open_time: null,
      close_time: null
    }
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: Omit<TStore, 'id'>) =>
    storeApi
      .create(values)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công ${values.name}`, {
          variant: 'success'
        });
        navigate(`${PATH_DASHBOARD.promotion.root}/${res.data.id}`);
        console.log(res);
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });

  return (
    <FormProvider {...methods}>
      <Page title="Tạo cửa hàng">
        <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={() => navigate(-1)} variant="outlined">
              {translate('common.cancel')}
            </Button>
            <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
              {translate('common.save')}
            </LoadingAsyncButton>
          </Stack>
        </DashboardNavLayout>
        <Card>
          <CardTitle>{translate('pages.stores.storeInfoTitle')}</CardTitle>
          <StoreForm />
        </Card>
      </Page>
    </FormProvider>
  );
};

export default CreateStorePage;
