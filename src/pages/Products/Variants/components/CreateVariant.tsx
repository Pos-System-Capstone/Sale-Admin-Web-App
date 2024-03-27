import React from 'react';
import { Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import Page from 'components/Page';
import MiddleForm from './MiddleForm';
import { TVariant } from 'types/report/variant';

export default function CreateVariant() {
  const variant = useForm<TVariant>({});
  const { handleSubmit, reset } = variant;

  return (
    <FormProvider {...variant}>
      <Page title="Tạo biến thể">
        <Box display="flex">
          <MiddleForm handleSubmit={handleSubmit} />
        </Box>
      </Page>
    </FormProvider>
  );
}
