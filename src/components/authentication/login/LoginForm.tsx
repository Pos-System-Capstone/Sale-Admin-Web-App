import closeFill from '@iconify/icons-eva/close-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
// material
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField
} from '@mui/material';
// routes
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
import ContactInformationDialog from './ContactNotificationDialog/ContactInformationDialog';

// ----------------------------------------------------------------------
type InitialValues = {
  user_name: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};
export default function LoginForm() {
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [isShowContactInformation, setIsShowContactInformation] = useState(false);

  const LoginSchema = Yup.object().shape({
    user_name: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: Yup.string().required('Vui lòng nhập mật khẩu')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      user_name: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login(values.user_name, values.password).then(() => {
          enqueueSnackbar('Đăng nhập thành công', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
          if (isMountedRef.current) {
            setSubmitting(false);
          }
        });
      } catch (er: any) {
        enqueueSnackbar(er ? `${er.error}` : 'Có lỗi', {
          variant: 'error'
        });
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: (er as any).message });
        }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

            <TextField
              fullWidth
              autoComplete="username"
              type="user_name"
              label="Tên đăng nhập"
              {...getFieldProps('user_name')}
              error={Boolean(touched.user_name && errors.user_name)}
              helperText={touched.user_name && errors.user_name}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Mật khẩu"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end" size="large">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Ghi nhớ đăng nhập"
            />

            <Link
              component={RouterLink}
              onClick={() => setIsShowContactInformation(!isShowContactInformation)}
              variant="subtitle2"
              to="#"
            >
              Quên mật khẩu?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Đăng nhập
          </LoadingButton>
        </Form>
      </FormikProvider>
      <ContactInformationDialog
        open={isShowContactInformation}
        onClose={() => setIsShowContactInformation(!isShowContactInformation)}
        title={'Liên hệ khi quên mật khẩu'}
        description={'Vui lòng liên hệ quản lý để cài lại mật khẩu mới'}
      />
    </>
  );
}
