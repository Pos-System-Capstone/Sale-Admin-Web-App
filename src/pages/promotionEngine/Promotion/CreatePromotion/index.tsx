import { Box, Stack } from '@mui/material';

import Page from 'components/Page';
import useLocales from 'hooks/useLocales';

import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import StepOne from './StepOne';

import { TPromotionCreate } from 'types/promotion/promotion';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { getUserInfo } from 'utils/utils';

interface Props {}
const CreatePromotion = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { translate } = useLocales();

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
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const startDate = new Date();
  const endDate = new Date();
  const createPromotionForm = useForm<TPromotionCreate>({
    // resolver: activeStep === 0 ? yupResolver(validationSchema) : yupResolver(validationSchema2);
    defaultValues: {
      brandId: user.brandId,
      hasVoucher: false,
      applyBy: 3,
      promotionType: 0,
      promotionCode: '',
      promotionName: '',
      exclusive: 0,
      postActionType: 0,
      forMembership: 0,
      saleMode: 7,
      gender: 3,
      isAuto: true,
      startDate: startDate,
      endDate: endDate,
      hourFilter: [],
      dayFilter: [],
      paymentMethod: [],
      imgUrl: '',
      actionType: 0,
      description: '',
      allDay: false,
      allHour: false
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

  return (
    <FormProvider {...createPromotionForm}>
      <Page title={`${translate('promotionSystem.promotion.createPromotion.createPromotion')}`}>
        <DashboardNavLayout>
          <Stack direction="row" spacing={2}>
            <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
              {translate('promotionSystem.promotion.save')}
            </LoadingAsyncButton>
          </Stack>
        </DashboardNavLayout>
        <Box>{<StepOne watch={watch} handleSubmit={handleSubmit} />}</Box>
      </Page>
    </FormProvider>
  );
};

export default CreatePromotion;
