import { Button, Card } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useDashboard from 'hooks/useDashboard';

import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Page from 'components/Page';
import { getUserInfo } from 'utils/utils';
import CreateForm from './components/CreateNewStore/CreateForm';
import { TPStore } from 'types/promotion/store';
import { Box } from '@mui/system';
import storePromotionApi from 'api/promotion/store';

const CreateStorePromotion = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const methods = useForm<TPStore>({
    defaultValues: {}
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async (values: TPStore) => {
    console.log(values);
    const data = {
      brandId: user.brandId,
      storeCode: values.storeCode,
      storeName: values.storeName
    };
    const addNew = await storePromotionApi.createStores(data);
    addNew.status === 200
      ? enqueueSnackbar('Thêm thành công', { variant: 'success' })
      : enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    if (addNew.status === 200) {
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
  };
  return (
    <FormProvider {...methods}>
      <Page title="Thêm cửa hhàng">
        <Card>
          <Box>
            <CreateForm></CreateForm>
          </Box>
          <Box display={'flex'} justifyContent={'flex-end'}>
            <Button onClick={() => navigate(-1)} variant="outlined" sx={{ margin: '5px' }}>
              Hủy
            </Button>
            <LoadingAsyncButton
              onClick={handleSubmit(onSubmit)}
              type="submit"
              variant="contained"
              sx={{ margin: '5px' }}
            >
              Thêm
            </LoadingAsyncButton>
          </Box>
        </Card>
      </Page>
    </FormProvider>
  );
};
export default CreateStorePromotion;
