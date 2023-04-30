import { Box, Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CreateComboForm } from 'types/product';
// import BasicProductInfoForm from '../components/form/BasicProductInfoForm';
// import CategoryTreeForm from '../components/form/CategoryTreeForm';
// import ProductImagesForm from '../components/form/ProductImagesForm';

import { normalizeProductCombo } from '../utils';
import ChoiceGroupComboForm from './components/form/ChoiceGroupComboForm';
import { useProduct } from 'hooks/products/useProduct';
import MiddleForm from '../components/MiddleForm';
interface Props {}
const STEPS = ['Thông tin', 'Nhóm sản phẩm'];

const CreateCombo = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cloneProductId: any = searchParams.get('cloneProductId');

  const [activeStep, setActiveStep] = useState(0);

  const createComboForm = useForm({});

  const { data, isLoading } = useProduct(Number(cloneProductId), {
    select: (res) => normalizeProductCombo(res as any),
    onSuccess: (res) => {
      console.log(`res`, res);
      createComboForm.reset(res as CreateComboForm);
    },
    enabled: Boolean(cloneProductId),
    staleTime: Infinity
  });

  const { handleSubmit } = createComboForm;

  // const onSubmit = (values: any) => {
  //   return createMasterProd(transformComboForm(values, CombinationModeEnum.ChoiceCombo))
  //     .then((res) => {
  //       enqueueSnackbar(`Tạo thành công ${values.product_name}`, {
  //         variant: 'success'
  //       });
  //       navigate(`${PATH_DASHBOARD.combos.editById(res.data)}`);
  //     })
  //     .catch((err) => {
  //       enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
  //         variant: 'error'
  //       });
  //     });
  // };

  return (
    <FormProvider {...createComboForm}>
      <DashboardNavLayout>
        <Stack direction="row" spacing={2}>
          {activeStep !== 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>Quay lại</Button>
          )}
          {activeStep !== STEPS.length - 1 && (
            <Button
              variant="contained"
              onClick={async () => {
                const valid = await createComboForm.trigger();
                console.log(`valid`, valid);
                if (valid) setActiveStep((prev) => prev + 1);
              }}
            >
              Tiếp tục
            </Button>
          )}
          {activeStep === STEPS.length - 1 && (
            <LoadingAsyncButton onClick={null} type="submit" variant="contained">
              Lưu
            </LoadingAsyncButton>
          )}
        </Stack>
      </DashboardNavLayout>
      <Page title="Tạo combo">
        <Box py={2}>
          <Stepper alternativeLabel activeStep={activeStep}>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': {
                      typography: 'subtitle2',
                      color: 'text.disabled'
                    }
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box display="flex">
          {activeStep === 0 && (
            <Stack p={1} spacing={3}>
              <MiddleForm isCombo={true} />
              {/* <Box>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography my={2} variant="subtitle2">
                        Danh mục chứa sản phẩm
                      </Typography>
                    </Stack>
                  </Box> */}
              {/* <CategoryTreeForm /> */}

              {/* <Card>
                <CardTitle mb={2} variant="subtitle1">
                  Mô tả
                </CardTitle>
                <Controller
                  name="description"
                  render={({ field }) => (
                    <DraftEditorField value={field.value} onChange={field.onChange} />
                  )}
                />
              </Card>

              <Card>
                <ProductImagesForm />
              </Card> */}

              {/* <Card id="seo">
                <CardTitle mb={2} variant="subtitle1">
                  SEO
                </CardTitle>
                <Box textAlign="left">
                  <SeoForm />
                </Box>
              </Card> */}
            </Stack>
          )}
          {activeStep === 1 && (
            <Stack width="100%">
              <ChoiceGroupComboForm id={''} />
            </Stack>
          )}
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreateCombo;
