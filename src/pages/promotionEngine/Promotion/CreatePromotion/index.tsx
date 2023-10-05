import { Box, Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
// import promotionApi from 'api/promotion/promotion';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useLocales from 'hooks/useLocales';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import * as Yup from 'yup';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import { TPromotionBase } from 'types/promotion/promotion';

// import { yupResolver } from '@hookform/resolvers/yup';

interface Props {}
const CreatePromotion = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { translate } = useLocales();
  // const [searchParams] = useSearchParams();
  // const clonePromoId: any = searchParams.get('clonePromoId');

  const STEPS = [
    `${translate('promotionSystem.promotion.selectPromotionType')}`,
    `${translate('promotionSystem.promotion.setting')}`,
    `${translate('promotionSystem.promotion.saveAndFinish')}`
  ];
  const [activeStep, setActiveStep] = useState(0);

  const validationSchema = Yup.object().shape({
    promotionCode: Yup.string().when('promotionType', {
      is: (promotionType: any) => promotionType !== 'automatic',
      then: Yup.string().required('Please input Promotion Code')
    }),
    promotionName: Yup.string().required('Please input Promotion Name'),
    startDate: Yup.date()
      .default(() => new Date())
      .required('Please choose Start date!'),
    endDate: Yup.date()
      .nullable()
      .transform((curr, orig) => (orig === '' ? null : curr))
      .when('unlimited', {
        is: false,
        then: Yup.date()
          .default(() => new Date())
          .required('Please choose End date')
      }),
    discountAction: Yup.string().when('promotion-action', {
      is: 'discount',
      then: Yup.string().required('Please choose Discount action type')
    }),
    giftAction: Yup.string().when('promotion-action', {
      is: 'gift',
      then: Yup.string().required('Please choose Gift action type')
    }),
    timeFrameList: Yup.string().when('timeFrameChecked', {
      is: (timeFrameChecked: any) => timeFrameChecked === true,
      then: Yup.string().required('Please choose at least one time frame')
    })
  });

  const validationSchema2 = Yup.object().shape({
    paymentMethodList: Yup.object({
      cash: Yup.boolean(),
      creditCard: Yup.boolean(),
      bankTransfer: Yup.boolean(),
      eWallet: Yup.boolean(),
      mobileBanking: Yup.boolean(),
      cod: Yup.boolean()
    }).test('paymentMethod', { null: true }, (obj) => {
      if (
        obj.cash ||
        obj.creditCard ||
        obj.bankTransfer ||
        obj.eWallet ||
        obj.mobileBanking ||
        obj.cod
      ) {
        return true;
      }
      return new Yup.ValidationError('Please choose at least one payment', null, 'CheckBoxField');
    })
  });

  const initialValues = {
    promotionType: '',
    promotionCode: '',
    promotionName: '',
    startDate: () => new Date(),
    endDate: Date,
    timeFrame: '',
    paymentMethodList: ''
  };
  const createPromotionForm = useForm<TPromotionBase>({
    // resolver: activeStep === 0 ? yupResolver(validationSchema) : yupResolver(validationSchema2);
    defaultValues: {
      promotionType: 0,
      promotionCode: '',
      promotionName: '',
      startDate: Date.now(),
      endDate: Date.now(),
      hourFilter: 0,
      paymentMethod: []
    }
  });

  // const { data, isLoading } = usePromotion(Number(clonePromoId), {
  //   select: (res) => normalizeProductCombo(res as any),
  //   onSuccess: (res) => {
  //     console.log(`res`, res);
  //     createPromotionForm.reset(res as TPromotionBase);
  //   },
  //   enabled: Boolean(clonePromoId),
  //   staleTime: Infinity
  // });

  const onSubmit = (values: any) => {
    console.log('promotionCreate', values);
    // promotionApi
    //   .createPromotion(testPayLoad)
    //   .then((res) => {
    //     enqueueSnackbar(`Tạo thành công ${values.promotionName}`, {
    //       variant: 'success'
    //     });
    //     navigate(PATH_PROMOTION_APP.promotion.root);
    //   })
    //   .catch((err) => {
    //     enqueueSnackbar(`${err}`, {
    //       variant: 'error'
    //     });
    //   });
  };

  const { handleSubmit, watch, formState } = createPromotionForm;

  // targetCustomer[1] = member
  return (
    <FormProvider {...createPromotionForm}>
      <DashboardNavLayout>
        <Stack direction="row" spacing={2}>
          {activeStep !== 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>
              {translate('promotionSystem.promotion.back')}
            </Button>
          )}
          {activeStep !== STEPS.length - 1 && (
            <Button
              variant="contained"
              onClick={async () => {
                // const valid = await createPromotionForm.trigger();
                // console.log(`valid`, valid);
                const valid = true;
                if (valid) setActiveStep((prev) => prev + 1);
              }}
            >
              {translate('promotionSystem.promotion.next')}
            </Button>
          )}
          {activeStep === STEPS.length - 1 && (
            <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
              {translate('promotionSystem.promotion.save')}
            </LoadingAsyncButton>
          )}
        </Stack>
      </DashboardNavLayout>
      <Page title={`${translate('promotionSystem.promotion.createPromotion.createPromotion')}`}>
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
          {activeStep === 0 && <StepOne watch={watch} />}
          {activeStep === 1 && <StepTwo watch={watch} />}
          {activeStep === 2 && <StepThree watch={watch} />}
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreatePromotion;
