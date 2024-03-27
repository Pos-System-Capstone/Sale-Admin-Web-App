import { Box } from '@mui/material';
import Page from 'components/Page';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getUserInfo } from 'utils/utils';
import FormDetail from './FormDetail';
import { TVariant } from 'types/report/variant';
import variantApi from 'api/variant';
import { useParams } from 'react-router';

export default function DetailVariant() {
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { id } = useParams();
  const { data: variantUpdate } = useQuery(['variant'], async () => {
    return variantApi.getVariantById(id).then((res) => res.data);
  });

  const variantForm = useForm<TVariant>({
    defaultValues: { ...variantUpdate }
  });

  useEffect(() => {
    if (variantUpdate) {
      reset({ ...variantUpdate });
    }
  }, [variantUpdate]);

  const { watch, reset, handleSubmit } = variantForm;

  const values = variantUpdate !== undefined && variantUpdate.value;
  return (
    <FormProvider {...variantForm}>
      <Page title="Thông tin biến thể sản phẩm">
        <Box display="flex">
          <FormDetail values={values} handleSubmit={handleSubmit} />
        </Box>
      </Page>
    </FormProvider>
  );
}
