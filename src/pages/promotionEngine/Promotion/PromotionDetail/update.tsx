import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { TPromotionBase } from 'types/promotion/promotion';
import { getUserInfo } from 'utils/utils';
import promotionApi from 'api/promotion/promotion';
import { useQuery } from 'react-query';
import Page from 'components/Page';
import { Box, CircularProgress } from '@mui/material';

import useLocales from 'hooks/useLocales';

import { useEffect, useState } from 'react';
import StepThree from '../CreatePromotion/StepThree';
import EmptyContent from 'components/EmptyContent';

const UpdatePromotion = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const userRaw = getUserInfo();

  const { translate } = useLocales();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [activeStep, setActiveStep] = useState(0);
  const {
    data: promotion,
    isLoading,
    error
  } = useQuery(
    ['promotions', id],
    () => promotionApi.getPromotionById(id).then((res) => res.data),
    {
      enabled: Boolean(id)
    }
  );

  const binaryCheck = (value: number, idxRange: number) => {
    const arr = [];
    for (let index = 0; index < idxRange; index++) {
      if ((Math.pow(2, index) & value) == Math.pow(2, index)) {
        arr.push(Math.pow(2, index));
      }
    }
    return arr;
  };

  const transformValue = (value: TPromotionBase) => {
    const transformedData = { ...value };
    if (value !== undefined) {
      transformedData.paymentMethod = binaryCheck(value.paymentMethod, 7);
      transformedData.dayFilter = binaryCheck(value.dayFilter, 7);
      transformedData.hourFilter = binaryCheck(value.hourFilter, 24);
      console.log('transformData', transformedData);
    }
    return transformedData;
  };

  const updatePromotionForm = useForm<TPromotionBase>({});
  useEffect(() => {
    if (!promotion) return;
    updatePromotionForm.reset({ ...transformValue(promotion!) });
  }, [promotion, updatePromotionForm]);
  const { watch } = updatePromotionForm;
  console.log('watch', watch());

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
        minHeight="40vh"
        borderRadius="1px"
        flexDirection="column"
        zIndex={999}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
        minHeight="40vh"
        borderRadius="1px"
        flexDirection="column"
        zIndex={999}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <EmptyContent title="Không tìm thấy khuyen mai" />
      </Box>
    );
  }
  return (
    <FormProvider {...updatePromotionForm}>
      <Page title={`${translate('promotionSystem.promotion.createPromotion.createPromotion')}`}>
        <Box display="flex">
          <StepThree watch={watch} />
        </Box>
      </Page>
    </FormProvider>
  );
};
export default UpdatePromotion;
