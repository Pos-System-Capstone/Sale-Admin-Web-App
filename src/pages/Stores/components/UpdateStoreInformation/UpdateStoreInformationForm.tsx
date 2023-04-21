import { Button, Grid } from '@mui/material';
import { InputField } from 'components/form';
import { TStoreUpdate } from 'types/store';

type Props = {
  currentStoreInformation: TStoreUpdate | undefined;
  onFinish: () => void;
};

function UpdateStoreInformationForm({ currentStoreInformation, onFinish }: Props) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid key={'name'} item xs={12} sm={6}>
          <InputField
            fullWidth
            name="name"
            label="Tên cửa hàng"
            // defaultValue={currentStoreInformation?.name}
          ></InputField>
        </Grid>
        <Grid key={'shortName'} item xs={12} sm={6}>
          <InputField
            fullWidth
            name="shortName"
            label="Tên rút gọn"
            // defaultValue={currentStoreInformation?.email}
          />
        </Grid>
        <Grid key={'code'} item xs={12} sm={6}>
          <InputField
            fullWidth
            name="code"
            label="Mã cửa hàng"
            // defaultValue={currentStoreInformation?.email}
          />
        </Grid>
        <Grid key={'email'} item xs={12} sm={6}>
          <InputField
            fullWidth
            name="email"
            label="Email liên hệ"
            // defaultValue={currentStoreInformation?.email}
          />
        </Grid>
        <Grid key={'address'} item xs={12} sm={8}>
          <InputField
            fullWidth
            name="address"
            label="Địa chỉ"
            // defaultValue={currentStoreInformation?.address}
          />
        </Grid>
        <Grid key={'phone'} item xs={12} sm={4}>
          <InputField
            fullWidth
            type="number"
            name="phone"
            label="Số điện thoại"
            // defaultValue={currentStoreInformation?.phone}
          />
        </Grid>
        <Grid item xs={12} sm={12} display={'flex'} justifyContent={'end'}>
          <Button variant="contained" onClick={onFinish}>
            Cập nhật
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

export default UpdateStoreInformationForm;
