import { Grid, Stack } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import { InputField } from 'components/form';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

interface CollectionSearchFormProps {
  onChange?: Function;
}

const CollectionSearchForm = ({ onChange }: CollectionSearchFormProps) => {
  const { translate } = useLocales();

  const form = useForm({
    defaultValues: {
      name: null
    }
  });

  const { run } = useDebounceFn(
    (values) => {
      if (onChange) {
        onChange(values);
      }
    },
    {
      wait: 500
    }
  );

  const { control } = form;

  const watchValues = useWatch({
    control
  });

  React.useEffect(() => {
    run(watchValues);
  }, [watchValues, run]);

  return (
    <FormProvider {...form}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} sm={3}>
            <InputField
              name="name"
              size="small"
              type="email"
              label={translate('collections.table.collectionName')}
            />
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
};

export default CollectionSearchForm;
