import { Box, Grid } from '@mui/material';
import { InputField, UploadImageField } from 'components/form';
// import AutocompleteCategory from 'components/form/common/Category/AutocompleteCategory';
interface Props {
  isExtraCate?: boolean;
  updateMode?: boolean;
}

const BasicProductInfoForm = ({ isExtraCate = false, updateMode = false }: Props) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {' '}
        <Grid alignItems={'center'} item xs={12} sm={12}>
          <UploadImageField.Avatar
            label="Hình ảnh"
            name="picUrl"
            // style={{ margin: '0 auto 40px' }}
          />
        </Grid>
        <Grid item xs={8}>
          <InputField fullWidth name="name" label="Tên sản phẩm" required size="small" />
        </Grid>
        <Grid item xs={4}>
          <InputField
            disabled={updateMode}
            fullWidth
            name="code"
            label="Mã sản phẩm"
            required
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            fullWidth
            type="number"
            name="sellingPrice"
            label="Giá bán"
            required
            size="small"
            helperText="Giá áp dụng khi không được cấu hình trong menu"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            fullWidth
            type="number"
            name="discountPrice"
            label="Giá giảm"
            required
            size="small"
            helperText="Giá áp dụng khi không được cấu hình trong menu"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            fullWidth
            type="number"
            name="historicalPrice"
            label="Giá gốc"
            required
            size="small"
            helperText="Giá áp dụng khi không được cấu hình trong menu"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            max={100}
            min={0}
            fullWidth
            type="number"
            name="displayOrder"
            label="Thứ tự hiển thị"
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <InputField fullWidth name="description" label="Mô tả" required size="small" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicProductInfoForm;
