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
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { TUpdatePromotionTier } from 'types/promotion/promotion';
import { getUserInfo } from 'utils/utils';

interface Props {
  myWatch?: any;
}
function PromotionTierDetail({ myWatch }: Props) {
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
  const promotionTiers = myWatch('promotionTier');
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

  const methods = useForm<TUpdatePromotionTier>({
    defaultValues: {
      promotionTier: {
        ...promotionTiers
      }
    }
  });

  const { handleSubmit, reset, watch } = methods;
  const onSubmit = async (values: TUpdatePromotionTier, index: number) => {
    const body = { ...values };
    body.promotionTier[index].promotionTierId = values.promotionTier[index].promotionTierId!;
    body.promotionTier[index].priority = Number(values.promotionTier[index].priority);
    body.promotionTier[index].voucherQuantity = Number(values.promotionTier[index].voucherQuantity);
    try {
      const res = await promotionApi.updatePromotionTier(
        promotionTiers[index].promotionTierId,
        body.promotionTier[index]
      );
      if (res.status == 200) {
        enqueueSnackbar('Cập nhập thành công', { variant: 'success' });
      } else {
        enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }
  };
  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        {promotionTiers.map((item: any, index: number) => (
          <Grid item xs={12} key={index}>
            <Box>
              <Card>
                <Stack p={1} spacing={3} width={'100%'}>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <SelectField
                        fullWidth
                        options={actionOptions}
                        name={`promotionTier[${index}].actionId`}
                        label="Hành động"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SelectField
                        fullWidth
                        options={conditionRuleOptions}
                        name={`promotionTier[${index}].conditionRuleId`}
                        label="Điều kiện"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {myWatch('hasVoucher') ? (
                        <SelectField
                          fullWidth
                          options={voucherGroupOptions}
                          name={`promotionTier[${index}].voucherGroupId`}
                          label="Nhóm voucher"
                        />
                      ) : (
                        ' '
                      )}
                    </Grid>

                    <Grid item xs={4}>
                      <InputField
                        fullWidth
                        name={`promotionTier[${index}].summary`}
                        label="Tóm tắt"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputField
                        fullWidth
                        name={`promotionTier[${index}].priority`}
                        label="Ưu tiên"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputField
                        fullWidth
                        name={`promotionTier[${index}].voucherQuantity`}
                        label="Số lượng"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LoadingAsyncButton
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit((values: TUpdatePromotionTier) =>
                          onSubmit(values, index)
                        )}
                      >
                        Lưu
                      </LoadingAsyncButton>
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </FormProvider>
  );
}

export default PromotionTierDetail;
