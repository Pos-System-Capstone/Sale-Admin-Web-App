/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import storeApi from 'api/store';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TEmployeeCreate } from 'types/employee';
import * as yup from 'yup';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import Page from '../../components/Page';
import { Card } from './components/Card';
import MiddleForm from './components/MiddleForm';
import { transformDraftToStr } from './utils';

const CreateAccount = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useAuth();

  const validationSchema = yup.object({
    name: yup.string().required('Vui lòng nhập tên người dùng'),
    username: yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: yup.string().required('Vui lòng nhập password')
  });

  const methods = useForm<TEmployeeCreate>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      username: '',
      password: ''
    }
  });
  const { handleSubmit } = methods;

  const onCreateNewAccountSubmit = (values: TEmployeeCreate) => {
    const data = transformDraftToStr(values);
    console.log('data new account ne: ', data);
    return storeApi
      .createStoreEmployees(user?.storeId, data)
      .then((res) => {
        enqueueSnackbar(`Tạo mới thành công`, {
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

  // if (isLoading) {
  //   return (
  //     <Box
  //       sx={{
  //         width: '100%',
  //         height: '100%'
  //       }}
  //       minHeight="40vh"
  //       borderRadius="1px"
  //       flexDirection="column"
  //       zIndex={999}
  //       justifyContent="center"
  //       alignItems="center"
  //       display="flex"
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <FormProvider {...methods}>
      <Page title="Tạo tài khoản">
        <Card>
          <Box>
            <MiddleForm />
            <Stack direction="row" justifyContent={'end'} marginTop={2} spacing={2}>
              <Button onClick={() => navigate(-1)} variant="outlined">
                Hủy
              </Button>
              <LoadingAsyncButton
                onClick={handleSubmit(onCreateNewAccountSubmit)}
                type="submit"
                variant="contained"
              >
                Tạo mới
              </LoadingAsyncButton>
            </Stack>
          </Box>
        </Card>
      </Page>
    </FormProvider>
  );
};

export default CreateAccount;
