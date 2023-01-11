import { Box, Grid } from '@mui/material';
import { InputField, AutoCompleteField } from 'components/form';
import React from 'react';

interface Props {}

const BasicProductInfoForm = (props: Props) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputField fullWidth name="code" label="SKU" required size="small" />
        </Grid>
        <Grid item xs={6}>
          <InputField fullWidth name="product_name" label="Tên sản phẩm" required size="small" />
        </Grid>
        <Grid item xs={6}>
          <InputField
            fullWidth
            type="number"
            name="price"
            label="Giá sản phẩm"
            required
            size="small"
            helperText="Giá áp dụng khi không được cấu hình trong menu"
          />
        </Grid>
        <Grid item xs={6}>
          <AutoCompleteField
            name="tags"
            label="Tag"
            multiple
            freeSolo
            size="small"
            variant="outlined"
            options={[]}
            limitTags={2}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicProductInfoForm;
