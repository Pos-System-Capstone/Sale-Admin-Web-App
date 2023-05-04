import { Grid, Switch, Stack, Typography, Card, Button } from '@mui/material';
import brandApi from 'api/brand';
import { getPaymentProviderMapping, paymentProviderMapping } from 'api/payment';
import { InputField } from 'components/form';
import { useSnackbar } from 'notistack';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import { TBrand } from 'types/brand';
import { TPaymentMapping } from 'types/payment/payment';
import { TStore } from 'types/store';

interface Props {
  brand: TBrand | undefined;
}

export const PaymentProviderConfig = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: listStore } = useQuery(
    ['stores', props.brand?.id],
    async () => {
      return brandApi
        .getStoreOfBrand(props.brand?.id ?? '', { page: 1, size: 100 })
        .then((res) => res.data.items);
    },
    {
      enabled: Boolean(props.brand?.id)
    }
  );
  const { data: paymentInBrand, refetch } = useQuery(
    ['paymentInBrands', props.brand?.id],
    async () => {
      return getPaymentProviderMapping(props.brand?.id ?? '').then((res) => res.data);
    },
    {
      enabled: Boolean(props.brand?.id)
    }
  );

  console.log('repaymentInBrands', paymentInBrand);
  const [selectZalopay, setSelectZalopay] = useState<boolean>(false);
  const [selectVNpay, setSelectVNpay] = useState<boolean>(false);
  const [selectVietQR, setSelectVietQR] = useState<boolean>(false);
  const paymentMapping = useForm<TPaymentMapping>({
    defaultValues: {}
  });
  useEffect(() => {
    if (paymentInBrand?.zaloPayConfigRequest === null) {
      setSelectZalopay(false);
    } else {
      setSelectZalopay(true);
    }
    if (paymentInBrand?.vnPayConfigRequest === null) {
      setSelectVNpay(false);
    } else {
      setSelectVNpay(true);
    }
    if (paymentInBrand?.vietQrConfigRequest === null) {
      setSelectVietQR(false);
    } else {
      setSelectVietQR(true);
    }
    paymentMapping.reset({
      zaloPayConfigRequest: paymentInBrand?.zaloPayConfigRequest,
      vietQrConfigRequest: paymentInBrand?.vietQrConfigRequest,
      vnPayConfigRequest: paymentInBrand?.vnPayConfigRequest
    });
  }, [paymentInBrand, paymentMapping]);

  const value = paymentMapping.watch();
  console.log('paymentMaping', value);
  console.log('listStore', listStore);
  const handleCreate = async (data: TPaymentMapping) => {
    const dataRequest = {
      brandId: props.brand?.id,
      brandName: props.brand?.name,
      brandPhoneNumber: props.brand?.phone,
      createStoreRequests:
        listStore !== undefined &&
        listStore.map((item: TStore) => {
          return {
            storeId: item.id,
            storeName: item.name,
            storeAddress: item.address,
            storeEmail: item.email
          };
        }),
      zaloPayConfigRequest: selectZalopay ? data.zaloPayConfigRequest : null,
      vietQrConfigRequest: selectVietQR ? data.vietQrConfigRequest : null,
      vnPayConfigRequest: selectVNpay ? data.vnPayConfigRequest : null
    };
    console.log('data', dataRequest);
    await paymentProviderMapping(props.brand?.id ?? '', dataRequest)
      .then((res) => {
        refetch();
        enqueueSnackbar(res.data, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar('Có lỗi xảy ra! Vui lòng thử lại!', {
          variant: 'error'
        });
      });
  };

  return (
    <FormProvider {...paymentMapping}>
      <Stack margin={2} direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="contained" onClick={paymentMapping.handleSubmit(handleCreate)}>
          Lưu
        </Button>
      </Stack>
      <Stack spacing={2}>
        <Card>
          <Stack spacing={2} direction="row">
            <Typography>ZaloPay</Typography>
            <Switch onClick={() => setSelectZalopay(!selectZalopay)} checked={selectZalopay} />
          </Stack>
          {selectZalopay && (
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <InputField fullWidth name="zaloPayConfigRequest.appId" helperText="App Id" />
              </Grid>
              <Grid item xs={5}>
                <InputField fullWidth name="zaloPayConfigRequest.key1" helperText="Key 1" />
              </Grid>
              <Grid item xs={5}>
                <InputField fullWidth name="zaloPayConfigRequest.key2" helperText="Key 2" />
              </Grid>
            </Grid>
          )}
        </Card>
        <Card>
          <Stack spacing={2} direction="row">
            <Typography>VN Pay</Typography>
            <Switch onClick={() => setSelectVNpay(!selectVNpay)} checked={selectVNpay} />
          </Stack>
          {selectVNpay && (
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <InputField fullWidth name="vnPayConfigRequest.tmnCode" helperText="tmn Code" />
              </Grid>
              <Grid item xs={7}>
                <InputField
                  fullWidth
                  name="vnPayConfigRequest.secureHash"
                  helperText="secure Hash"
                />
              </Grid>
            </Grid>
          )}
        </Card>
        <Card>
          <Stack spacing={2} direction="row">
            <Typography>Viet QR</Typography>
            <Switch onClick={() => setSelectVietQR(!selectVietQR)} checked={selectVietQR} />
          </Stack>
          {selectVietQR && (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputField fullWidth name="vietQrConfigRequest.bankCode" helperText="Bank Code" />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  fullWidth
                  name="vietQrConfigRequest.accountNumber"
                  helperText="Số tài khoản"
                />
              </Grid>
              <Grid item xs={4}>
                <InputField
                  fullWidth
                  name="vietQrConfigRequest.accountName"
                  helperText="Tên chủ tài khoản"
                />
              </Grid>
            </Grid>
          )}
        </Card>
      </Stack>
    </FormProvider>
  );
};
