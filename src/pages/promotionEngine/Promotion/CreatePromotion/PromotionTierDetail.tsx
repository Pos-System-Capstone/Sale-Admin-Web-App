import { Box, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import actionApi from 'api/promotion/action';
import conditionApi from 'api/promotion/condition';
import promotionApi from 'api/promotion/promotion';
import voucherApi from 'api/promotion/voucher';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { InputField, SelectField } from 'components/form';
import { useSnackbar } from 'notistack';
import { Card } from 'pages/promotionEngine/Promotion/components/Card';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TCreatePromotionTier, TUpdatePromotionTier } from 'types/promotion/promotion';
import { getUserInfo } from 'utils/utils';

interface Props {
  watch?: any;
}
function PromotionTierDetail({ watch }: Props) {
  const StyleWidthTypography = styled(Typography)((props) => ({
    marginTop: `${props.marginTop || '16px'}`,
    width: `${props.width || '50%'}`
  }));
  const userRaw = getUserInfo();
  const { id } = useParams();
  const user: any = JSON.parse(userRaw ?? '{}');
  const brandId = user.brandId;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const promotionTiers = watch('promotionTier')[0];
  const checkPromotionTier = Array.isArray(promotionTiers)
    ? promotionTiers.length > 0
      ? true
      : false
    : false;

  const page = 1;
  const size = 1000;
  const { data: actions } = useQuery(['actions'], async () => {
    return actionApi.get({ brandId, page, size }).then((res) => res.data.items);
  });

  const { data: conditionRules } = useQuery(['conditionRules'], async () => {
    return conditionApi.getConditionRules({ brandId, page, size }).then((res) => res.data.items);
  });

  const { data: voucherGroups } = useQuery(['voucherGroups'], async () => {
    return voucherApi.getVoucherGroup({ brandId, page, size }).then((res) => res.data.items);
  });

  const actionOptions = actions ? actions.map((c) => ({ label: c.name, value: c.actionId })) : [];
  const conditionRuleOptions =
    conditionRules?.map((c) => ({ label: c.ruleName, value: c.conditionRuleId })) || [];

  const voucherGroupOptions =
    voucherGroups?.map((c) => ({ label: c.voucherName, value: c.voucherGroupId })) || [];

  const methods = useForm<TCreatePromotionTier>({
    defaultValues: {
      actionId: '',
      conditionRuleId: '',
      voucherGroupId: '',
      summary: '',
      priority: 0,
      moreQuantity: 0
    }
  });

  const promotionTierForm = useForm<TUpdatePromotionTier>({
    defaultValues: {
      ...promotionTiers
    }
  });

  const { handleSubmit, reset, control } = methods;

  //   const { append, remove, fields } = useFieldArray({
  //     control,
  //     name: 'promotionTier'
  //   });

  useEffect(() => {
    if (promotionTiers) {
      reset({ ...promotionTiers });
    }
  }, [promotionTiers]);

  console.log(promotionTiers);
  const onSubmit = async (values: TUpdatePromotionTier) => {
    const body = { ...values };
    body.promotionId = promotionTiers.promotionTierId!;
    body.priority = Number(values.priority);
    body.moreQuantity = Number(values.moreQuantity);

    try {
      const res = await promotionApi.updatePromotionTier(promotionTiers.promotionTierId, body);
      if (res.status == 200) {
        enqueueSnackbar('Cập nhập thành công', { variant: 'success' });
        navigate(PATH_PROMOTION_APP.promotion.root);
      } else {
        enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }

    console.log('body update promotionTier', body);
  };
  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        {/* {promotionTiers.map((item: any, index: number) => ( */}
        <Grid item xs={12}>
          <Box>
            <Card>
              <Stack p={1} spacing={3} width={'100%'}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <SelectField
                      fullWidth
                      options={actionOptions}
                      name="actionId"
                      label="Hành động"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <SelectField
                      fullWidth
                      options={conditionRuleOptions}
                      name="conditionRuleId"
                      label="Điều kiện"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    {watch('hasVoucher') ? (
                      <SelectField
                        fullWidth
                        options={voucherGroupOptions}
                        name="voucherGroupId"
                        label="Nhóm voucher"
                      />
                    ) : (
                      ' '
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <InputField fullWidth name="summary" label="Tóm tắt" />
                  </Grid>
                  <Grid item xs={4}>
                    <InputField fullWidth name="priority" label="Ưu tiên" />
                  </Grid>
                  <Grid item xs={4}>
                    <InputField fullWidth name="moreQuantity" label="Số lượng" />
                  </Grid>
                  <Grid item xs={4}>
                    <LoadingAsyncButton
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Lưu
                    </LoadingAsyncButton>
                  </Grid>
                </Grid>
              </Stack>
            </Card>
          </Box>
        </Grid>
        {/* ))} */}
      </Grid>
    </FormProvider>
  );
}

export default PromotionTierDetail;
