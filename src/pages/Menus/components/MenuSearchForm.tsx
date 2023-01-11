import { Grid, Stack } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import { InputField, SelectField } from 'components/form';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { daysInWeek } from 'utils/utils';

interface MenuSearchFormProps {
  onChange?: Function;
}

const MenuSearchForm = ({ onChange }: MenuSearchFormProps) => {
  const form = useForm({
    defaultValues: {
      'menu-name': null
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
            <InputField name="menu-name" size="small" type="email" label="Tên thực đơn" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <SelectField
              options={[
                ...daysInWeek.map((label, index) => ({
                  label,
                  value: index
                }))
              ]}
              multiple
              fullWidth
              name="day-filters"
              size="small"
              label="Trạng thái"
            />
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
};

export default MenuSearchForm;
