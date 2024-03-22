/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import productApi from 'api/product';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import useLocales from 'hooks/useLocales';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductTypeEnum } from 'types/product';
import MiddleForm from './components/MiddleForm';
import { useState } from 'react';

const CreateVoucher = () => {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const [postfix, setPostFix] = useState('');
  const [prefix, setPreFix] = useState('');
  const [charset, setCharset] = useState('');
  const [customCharset, setCustomCharset] = useState('');
  const [searchParams] = useSearchParams();
  const cloneProductId: any = searchParams.get('cloneProductId');
  const productType: any = Number(searchParams.get('productType') ?? ProductTypeEnum.SINGLE);

  const methods = useForm<any>({
    resolver: undefined,
    defaultValues: {
      tags: [],
      description: '',
      prefix: '',
      postfix: '',
      charset: '',
      customCharset: '',
      product_type: productType
    }
  });
  const { handleSubmit, reset, watch } = methods;

  const { data, isLoading } = useQuery(
    ['products', Number(cloneProductId)],
    () => productApi.getById(cloneProductId).then((res) => res.data),
    {
      enabled: Boolean(cloneProductId),
      staleTime: Infinity
    }
  );

  const onSubmit = (values: any) => {
    values.prefix = prefix;
    values.postfix = postfix;
    values.charset = charset;
    values.customCharset = customCharset;
    console.log(values);
  };

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
  const handleCustomCharset = (customCharset: string) => {
    setCustomCharset(customCharset);
  };
  const handleCharsetChange = (charset: string) => {
    setCharset(charset);
  };
  const handlePrefixChange = (prefix: string) => {
    setPreFix(prefix);
  };

  const handlePostfixChange = (postfix: string) => {
    setPostFix(postfix);
  };
  console.log(postfix);
  console.log(prefix);
  return (
    <FormProvider {...methods}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title={`${t('promotionSystem.voucher.addVoucher.voucherGroupBuilder')}`}>
        <Box display="flex">
          <MiddleForm
            onCharsetChange={handleCharsetChange}
            onCustomCharsetChange={handleCustomCharset}
            onPrefixChange={handlePrefixChange}
            onPostfixChange={handlePostfixChange}
          />
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreateVoucher;
