import { Card, Stack } from '@mui/material';
import brandApi from 'api/brand';
import Page from 'components/Page';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { TNewBrandCreate } from 'types/brand';
import CreateNewBrandForm from './CreateNewBrandForm';

const CreateNewBrand = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const createNewBrandForm = useForm<TNewBrandCreate>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      picUrl: ''
    }
  });

  const onSubmitCreateNewBrand = (values: TNewBrandCreate) => {
    console.log('values ne: ', values);
    return brandApi
      .createNewBrand(values)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công`, {
          variant: 'success'
        });
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar(err.status + `:` + err.title, {
          variant: 'error'
        });
      });
  };

  return (
    <Page title="Tạo thương hiệu mới">
      <Card>
        <Stack spacing={2}>
          <FormProvider {...createNewBrandForm}>
            <CreateNewBrandForm
              onFinish={createNewBrandForm.handleSubmit(onSubmitCreateNewBrand)}
            />
          </FormProvider>
        </Stack>
      </Card>
    </Page>
  );
};

export default CreateNewBrand;
