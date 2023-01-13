import { Box, Grid } from '@mui/material';
import { InputField, SelectField } from 'components/form';
import React from 'react';

interface Props {}

const BasicProductInfoForm = (props: Props) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputField fullWidth name="code" label="Tên tài khoản" required size="small" />
        </Grid>
        <Grid item xs={6}>
          <InputField fullWidth name="product_name" label="Mật khẩu" required size="small" />
        </Grid>
        <Grid item xs={6}>
          <InputField
            fullWidth
            type="number"
            name="price"
            label="Tên chủ tài khoản"
            required
            size="small"
            // helperText="Giá áp dụng khi không được cấu hình trong menu"
          />
        </Grid>
        <Grid item xs={6}>
          <SelectField
            options={[
              {
                label: 'Brand Admin',
                value: 'single-choice'
              },
              {
                label: 'Store Manager',
                value: 'multiple'
              },
              {
                label: 'Store Staff',
                value: 'multiple'
              }
            ]}
            // name={`modifiers.${optIndex}.selectType`}
            size="small"
            label="Quyền"
            sx={{ width: '150px' }}
            name="Phân quyền"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicProductInfoForm;
