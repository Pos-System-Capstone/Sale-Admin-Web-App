/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import { Card } from '@mui/material';
import brandApi from 'api/brand';
import Page from 'components/Page';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TStoreCreate } from 'types/store';
import * as yup from 'yup';
import CreateNewStoreOfBrandForm from './CreateNewStoreForm';

const CreateStorePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const schema = yup.object({
    name: yup.string().required('Vui lòng nhập tên cửa hàng'),
    shortName: yup.string().required('Vui lòng nhập tên rút gọn'),
    email: yup.string().email().required('Vui lòng nhập email'),
    phone: yup.string().required('Vui lòng nhập số điện thoại'),
    code: yup.string().required('Vui lòng nhập code cửa hàng')
  });

  const createNewBrandForm = useForm<TStoreCreate>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      shortName: '',
      email: '',
      phone: '',
      code: '',
      address: ''
    }
  });
  const onSubmitCreateNewStoreOfBrand = (values: TStoreCreate) => {
    const dataToUpdate = { ...values };
    brandApi
      .createNewBrandStore(dataToUpdate)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công cửa hàng ${values.name}`, {
          variant: 'success'
        });
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };

  return (
    <Page title="Tạo cửa hàng">
      <Card>
        <FormProvider {...createNewBrandForm}>
          <CreateNewStoreOfBrandForm
            onFinish={createNewBrandForm.handleSubmit(onSubmitCreateNewStoreOfBrand)}
          />
        </FormProvider>
      </Card>
    </Page>
  );
};

export default CreateStorePage;
