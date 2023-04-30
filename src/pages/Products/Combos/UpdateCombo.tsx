import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper
} from '@mui/material';
import { InputField } from 'components/form';

import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useLocales from 'hooks/useLocales';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { addOrRemoveProductsInMenu } from 'redux/menu/api';
import { PATH_DASHBOARD } from 'routes/paths';

import { validationSchema } from '../type';
import ChoiceGroupComboForm from './components/form/ChoiceGroupComboForm';
import { useProductDetail } from 'hooks/products/useProduct';
import MiddleForm from '../components/MiddleForm';

interface Props {}
const STEPS = ['Thông tin', 'Nhóm sản phẩm'];

const UpdateCombo = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { comboId } = useParams();

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  // const { data: combo } = useQuery(['combo', Number(comboId)], () =>
  //   getComboById(Number(comboId)).then((res) => res.data)
  // );
  const { data: combo, isLoading } = useProductDetail(comboId!);

  const createComboForm = useForm({
    defaultValues: {
      ...combo
    },
    resolver: activeStep === 0 ? yupResolver(validationSchema) : undefined
  });

  const { translate } = useLocales();
  const ref = React.useRef<any>();
  const run = ref.current?.reload;

  // const { reset: menuReset, handleSubmit: handleSubmitMenuForm } = menuForm;
  // useEffect(() => {
  //   if (product) {
  //     const priceData = { ...product };
  //     for (let index = 0; index < 10; index++) {
  //       priceData[`price${index + 1}`] = product.price;
  //     }
  //     menuReset(priceData);
  //   }
  // }, [menuReset, product]);

  const priceInputs = useMemo(() => {
    const inputs = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 10; index++) {
      inputs.push(
        <Grid key={`price_${index}`} item xs={6}>
          <InputField
            autoFocus
            type="number"
            name={`price${index + 1}`}
            label={`Giá ${index + 1}`}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
      );
    }
    return inputs;
  }, []);

  const addProductToMenuHandler = (datas: any) => {
    addOrRemoveProductsInMenu(datas.id, datas)
      .then(() => {
        enqueueSnackbar(`Thêm thành công`, {
          variant: 'success'
        });
        return true;
      })
      .catch((err: { response: any }) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });
  };

  // React.useEffect(() => {
  //   if (product) {
  //     createComboForm.reset(product as CreateComboForm);
  //   }
  // }, [product]);
  const { handleSubmit } = createComboForm;

  // const onSubmit = (values: any) => {
  //   const data = transformDraftToStr(values);
  //   return updateProdById(comboId!, transformComboForm(data, CombinationModeEnum.ChoiceCombo))
  //     .then((res) => {
  //       enqueueSnackbar(`Cập nhật thành công ${values.product_name}`, {
  //         variant: 'success'
  //       });
  //     })
  //     .catch((err) => {
  //       enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
  //         variant: 'error'
  //       });
  //     });
  // };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <FormProvider {...createComboForm}>
      <DashboardNavLayout>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => navigate(`${PATH_DASHBOARD.combos.new}?cloneProductId=${comboId}`)}
            variant="outlined"
          >
            Sao chép
          </Button>
          {activeStep !== 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>Quay lại</Button>
          )}
          {activeStep !== STEPS.length - 1 && (
            <Button
              variant="contained"
              onClick={async () => {
                const valid = await createComboForm.trigger();
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
      <Page title="Cập nhật combo" actions={() => []}>
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
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
                <MiddleForm updateMode={true} />
              </Stack>
            )}
            {activeStep === 1 && (
              <Stack width="100%">
                <Card>
                  <ChoiceGroupComboForm id={comboId ?? ''} />
                </Card>
              </Stack>
            )}
          </Box>
        </Container>
      </Page>
    </FormProvider>
  );
};

export default UpdateCombo;
