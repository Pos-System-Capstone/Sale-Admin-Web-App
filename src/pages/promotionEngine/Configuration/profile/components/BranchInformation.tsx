import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, TextField, FormHelperText, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'hooks/useAuth';
import useIsMountedRef from 'hooks/useIsMountedRef';
// utils
// @types
import { UploadAvatar } from 'components/upload';
import { User } from './account';

//

// ----------------------------------------------------------------------

interface InitialState extends Omit<User, 'password' | 'id' | 'role'> {
  afterSubmit?: string;
}

export default function BranchInformation() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required')
  });

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: {
      displayName: '',
      email: user?.email || '',
      photoURL: user?.photoURL || '',
      phoneNumber: user?.phoneNumber || '',
      country: user?.country || '',
      address: user?.address || '',
      state: user?.state || '',
      city: user?.city || '',
      zipCode: user?.zipCode?.toString() || null,
      about: user?.about || '',
      isPublic: Boolean(user?.isPublic)
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        updateProfile?.();
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: (error as any).code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center', minHeight: '21.5rem' }}>
              <UploadAvatar
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Mã thương hiệu" {...getFieldProps('displayName')} />
                  <TextField fullWidth label="Tên thương hiệu" {...getFieldProps('phoneNumber')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Công ty" {...getFieldProps('country')} />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Địa chỉ" {...getFieldProps('address')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Email" {...getFieldProps('email')} />

                  <TextField fullWidth label="Hotline" {...getFieldProps('phoneNumber')} />
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Divider />

          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} alignItems="flex-end">
                <TextField
                  {...getFieldProps('about')}
                  fullWidth
                  autoComplete="on"
                  type="text"
                  label="Mô tả"
                  multiline
                  minRows={4}
                  maxRows={4}
                />
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ minWidth: '6rem' }}
            loading={isSubmitting}
          >
            Lưu
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
