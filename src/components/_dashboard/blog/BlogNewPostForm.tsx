import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  // Chip,
  Stack,
  Switch,
  Button,
  TextField,
  Typography,
  // Autocomplete,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// theme
import typography from '../../../theme/typography';
// utils
// import fakeRequest from '../../../utils/fakeRequest';
// @types
import { PostBlogFormValues } from '../../../@types/blog';
//
// import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
import BlogNewPostPreview from './BlogNewPostPreview';
import { dispatch } from 'redux/store';
import { postBlog } from 'redux/slices/blog';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    blogContent: Yup.string().required('blogContent is required'),
    metaData: Yup.string().min(3).required('Content is required'),
    image: Yup.mixed().required('Cover is required')
  });

  const formik = useFormik<PostBlogFormValues>({
    initialValues: {
      title: '',
      blogContent: '',
      image: null,
      isDialog: true,
      status: 'Active',
      metaData: '',
      priority: 1,
      brandId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await dispatch(postBlog(values));
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('image', URL.createObjectURL(file));
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Post Title"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Description"
                    {...getFieldProps('blogContent')}
                    error={Boolean(touched.blogContent && errors.blogContent)}
                    helperText={touched.blogContent && errors.blogContent}
                  />

                  {/* <div>
                    <LabelStyle>Content</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                  </div> */}

                  <div>
                    <LabelStyle>Cover</LabelStyle>
                    <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.image}
                      onDrop={handleDrop}
                      error={Boolean(touched.image && errors.image)}
                    />
                    {touched.image && errors.image && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.image && errors.image}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={
                        <Switch
                          {...getFieldProps('status')}
                          onChange={() => {
                            const newStatus = values.status === 'Active' ? 'unActive' : 'Active';
                            setFieldValue('status', newStatus);
                          }}
                          checked={values.status === 'Active'}
                        />
                      }
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('isDialog')} checked={values.isDialog} />}
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>

                  {/* <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <Chip size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Tags" />}
                  /> */}

                  {/* <TextField fullWidth label="Meta title" {...getFieldProps('metaTitle')} /> */}

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Meta description"
                    {...getFieldProps('metaData')}
                  />

                  {/* <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('metaKeywords', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <Chip size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Meta keywords" />}
                  /> */}
                </Stack>
              </Card>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  onClick={handleOpenPreview}
                  sx={{ mr: 1.5 }}
                >
                  Preview
                </Button>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={isSubmitting}
                >
                  Post
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      <BlogNewPostPreview
        formik={formik}
        isOpenPreview={open}
        onClosePreview={handleClosePreview}
      />
    </>
  );
}
