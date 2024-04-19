import { Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import actionApi from 'api/promotion/action';
import conditionApi from 'api/promotion/condition';
import promotionApi from 'api/promotion/promotion';
import voucherApi from 'api/promotion/voucher';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import { InputField, SelectField } from 'components/form';
import { useSnackbar } from 'notistack';
// import { Card } from 'pages/promotionEngine/Promotion/components/Card';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TCreatePromotionTier } from 'types/promotion/promotion';
import { getUserInfo } from 'utils/utils';

interface Props {
  watch?: any;
}
function CreatePromotionTier({ watch }: Props) {
  const userRaw = getUserInfo();
  const { id } = useParams();
  const user: any = JSON.parse(userRaw ?? '{}');
  const StyleWidthTypography = styled(Typography)((props) => ({
    marginTop: `${props.marginTop || '16px'}`,
    width: `${props.width || '50%'}`
  }));
  const brandId = user.brandId;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
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
  const { handleSubmit } = methods;
  const onSubmit = async (values: TCreatePromotionTier) => {
    const body = { ...values };
    body.promotionId = id!;
    body.priority = Number(values.priority);
    body.moreQuantity = Number(values.moreQuantity);

    try {
      const res = await promotionApi.createPromotionTier(body);
      if (res.status == 200) {
        enqueueSnackbar('Tạo thành công', { variant: 'success' });
        navigate(PATH_PROMOTION_APP.promotion.root);
      } else {
        enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }

    console.log(body);
  };

  return (
    <FormProvider {...methods}>
      <Page title="Thêm bậc voucher">
        <Stack p={1} spacing={3} width={'100%'}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <SelectField fullWidth options={actionOptions} name="actionId" label="Hành động" />
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
      </Page>
    </FormProvider>
  );
}

export default CreatePromotionTier;
