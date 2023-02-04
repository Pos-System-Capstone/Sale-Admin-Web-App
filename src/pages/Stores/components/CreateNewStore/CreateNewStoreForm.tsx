import { Button, Grid } from '@mui/material';
import { InputField } from 'components/form';

type Props = {
  onFinish: (values: any) => Promise<any>;
};

function CreateNewStoreOfBrandForm({ onFinish }: Props) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputField id="name" required fullWidth name="name" label="Tên cửa hàng" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField id="shortName" required fullWidth name="shortName" label="Tên rút gọn" />
        </Grid>
        <Grid item xs={12} sm={7}>
          <InputField id="email" required fullWidth name="email" label="Email liên hệ" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputField
            id="phone"
            required
            type="number"
            fullWidth
            name="phone"
            label="Số điện thoại"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputField id="code" required fullWidth name="code" label="Mã cửa hàng" />
        </Grid>
        <Grid item xs={12} sm={9}>
          <InputField fullWidth name="address" label="Địa chỉ" />
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

export default CreateNewStoreOfBrandForm;
