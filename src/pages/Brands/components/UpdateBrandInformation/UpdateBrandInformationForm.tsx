import { Box, Button, Grid } from '@mui/material';
import { InputField, UploadImageField } from 'components/form';
import { BrandStatus, TBrandDetail } from 'types/brand';

type Props = {
  currentBrandInformation: TBrandDetail | undefined;
  onFinish: () => void;
};

function UpdateBrandInformationForm({ currentBrandInformation, onFinish }: Props) {
  const brandStatusOptions = [
    {
      label: 'Hoạt động',
      value: BrandStatus.ACTIVE
    },
    {
      label: 'Ngừng hoạt động',
      value: BrandStatus.DEACTIVE
    }
  ];

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
            <UploadImageField.Avatar
              name="picUrl"
              label="Hình ảnh"
              // defaultValue={currentBrandInformation?.picUrl}
            />
          </Box>
        </Grid>
        <Grid key={'name'} item xs={12} sm={6}>
          <InputField
            fullWidth
            name="name"
            label="Tên nhãn hiệu"
            // defaultValue={currentBrandInformation?.name}
          ></InputField>
        </Grid>
        <Grid key={'email'} item xs={12} sm={6}>
          <InputField
            fullWidth
            name="email"
            label="Email liên hệ"
            // defaultValue={currentBrandInformation?.email}
          />
        </Grid>
        <Grid key={'address'} item xs={12} sm={8}>
          <InputField
            fullWidth
            name="address"
            label="Địa chỉ"
            // defaultValue={currentBrandInformation?.address}
          />
        </Grid>
        <Grid key={'phone'} item xs={12} sm={4}>
          <InputField
            fullWidth
            type="number"
            name="phone"
            label="Số điện thoại"
            // defaultValue={currentBrandInformation?.phone}
          />
        </Grid>
        {/* <Grid key={'status'} item xs={12} sm={8}>
          <SelectField
            fullWidth
            name="status"
            label="Trạng thái"
            // defaultValue={currentBrandInformation?.status}
            options={brandStatusOptions}
          />
        </Grid> */}

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

export default UpdateBrandInformationForm;
