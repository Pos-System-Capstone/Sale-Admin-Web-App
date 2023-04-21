import { Box, Button, Grid } from '@mui/material';
import { InputField, UploadImageField } from 'components/form';

type Props = {
  onFinish: (values: any) => Promise<any>;
};

function CreateNewBrandForm({ onFinish }: Props) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ textAlign: 'center' }}
          display={'flex'}
          justifyContent={'center'}
        >
          <Box>
            <UploadImageField.Avatar name="picUrl" label="Hình ảnh" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField fullWidth name="name" label="Tên nhãn hiệu" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField fullWidth name="email" label="Email liên hệ" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <InputField fullWidth name="address" label="Địa chỉ" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField type="number" fullWidth name="phone" label="Số điện thoại" />
        </Grid>

        <Grid item xs={12} sm={12} display={'flex'} justifyContent={'end'}>
          <Button variant="contained" onClick={onFinish}>
            Tạo mới
          </Button>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <SelectField
            fullWidth
            options={CREATE_CATEGORY_TYPE_OPTIONS}
            name="categoryType"
            label="Loại danh mục"
          ></SelectField>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            render={({ field }) => {
              return (
                <DraftEditorField
                  ariaLabel="Mô tả chi tiếtÏ"
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
        </Grid> */}
      </Grid>
    </>
  );
}

export default CreateNewBrandForm;
