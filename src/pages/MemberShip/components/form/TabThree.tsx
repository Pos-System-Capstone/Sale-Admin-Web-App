import { Box, Grid, Stack } from '@mui/material';
import voucherApi from 'api/promotion/voucher';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { InputField } from 'components/form';
import AutoCompleteVoucher from 'components/form/common/Voucher/AutoCompleteVoucher';
import useDashboard from 'hooks/useDashboard';
import { useSnackbar } from 'notistack';
// import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { TApplyVoucher } from 'types/promotion/voucher';
import { getUserInfo } from 'utils/utils';
type Props = {
  watch?: any;
};
export default function TabThree({ watch }: Props) {
  const { setNavOpen } = useDashboard();
  const { enqueueSnackbar } = useSnackbar();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { id } = useParams();

  const { data: voucherUpdate } = useQuery(['voucher-apply'], async () => {
    return voucherApi.getVoucherGroup(user.brandId).then((res) => res.data);
  });

  const updateVoucherForm = useForm<TApplyVoucher>({});

  const { handleSubmit } = updateVoucherForm;

  const onSubmit = async (values: TApplyVoucher) => {
    const body = { ...values };
    body.membershipId = id ?? '';
    body.quantity = values.quantity;
    body.voucherGroupId = values.voucherGroupId;

    const response = await voucherApi.createApplyVoucher(body);
    if (response.status === 200) {
      enqueueSnackbar(response.data, {
        variant: 'success'
      });
    } else {
      enqueueSnackbar('Lỗi , không thêm được voucher', {
        variant: 'error'
      });
    }
  };
  return (
    <FormProvider {...updateVoucherForm}>
      <Stack width="100%">
        <Box>
          <Grid container spacing={2}>
            <Grid container item xs={5} spacing={2}>
              <Grid item xs={12}>
                <InputField type="number" fullWidth name="quantity" label="số lượng" required />
              </Grid>
              <Grid item xs={12}>
                <AutoCompleteVoucher
                  name="voucherGroupId"
                  isExtra={false}
                  label="Loại Voucher Group"
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <LoadingAsyncButton
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Lưu
                  </LoadingAsyncButton>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </FormProvider>
  );
}
