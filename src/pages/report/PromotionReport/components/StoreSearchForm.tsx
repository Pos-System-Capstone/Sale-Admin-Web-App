import { Grid, Stack } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import { InputField, SelectField } from 'components/form';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

interface StoreSearchFormProps {
  onChange?: Function;
}

const StoreSearchForm = ({ onChange }: StoreSearchFormProps) => {
  const form = useForm({
    defaultValues: {
      'menu-name': null
    }
  });
  const { translate } = useLocales();

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
              fullWidth
              name="store-code"
              size="small"
              label={translate('pages.stores.table.storeCode')}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputField
              fullWidth
              name="store-name"
              size="small"
              label={translate('pages.stores.table.name')}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <SelectField
              fullWidth
              sx={{ minWidth: '150px' }}
              options={[
                {
                  label: translate('common.all'),
                  value: ''
                },
                {
                  label: translate('common.available'),
                  value: 'true'
                },
                {
                  label: translate('common.notAvailable'),
                  value: 'false'
                }
              ]}
              name="is-available"
              size="small"
              label={translate('pages.stores.table.isAvailable')}
            />
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
};

export default StoreSearchForm;
