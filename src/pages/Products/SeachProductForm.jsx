/* eslint-disable no-unused-expressions */
import { Grid, MenuItem } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { InputField, SelectField } from '../../components/form';
import { PRODUCT_MASTER } from '../../constraints';

const SeachProductForm = ({ onChange = console.log }) => {
  const form = useForm({
    defaultValues: {
      'product-name': null,
      'product-type': PRODUCT_MASTER,
      'is-available': null,
      'cat-id': null
    }
  });

  const { categories = [] } = useSelector((state) => state.admin);

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
    console.log('Effect', watchValues);
    run(watchValues);
  }, [watchValues, run]);

  console.log('Render ', watchValues);
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <InputField name="product-name" size="small" type="email" label="Tên sản phẩm" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectField
            name="cat-id"
            label="Chọn loại sản phẩm"
            fullWidth
            defaultValue=""
            size="small"
          >
            {categories?.map(({ cate_id, cate_name }) => (
              <MenuItem value={cate_id} key={`cate_select_${cate_id}`}>
                {cate_name}
              </MenuItem>
            ))}
          </SelectField>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default SeachProductForm;
