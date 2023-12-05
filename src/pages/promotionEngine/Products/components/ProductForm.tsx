import { Grid, Stack } from '@mui/material';
import { InputField, UploadImageField } from 'components/form';
import { useFormContext } from 'react-hook-form';
// import { CREATE_CATEGORY_TYPE_OPTIONS } from 'types/category';

interface Props {
  updateMode?: boolean;
}

const ProductForm = ({ updateMode }: Props) => {
  const { watch } = useFormContext();
  return (
    <Grid container spacing={2}>
      <Grid alignItems={'center'} item xs={12} sm={4}>
        <UploadImageField.Avatar label="Hình ảnh" name="picUrl" style={{ margin: '0 auto 40px' }} />
      </Grid>
      <Grid spacing={2} xs={12} sm={8}>
        <Stack ml={2} my={2} direction="column" spacing={2}>
          <InputField fullWidth name="name" label="Tên sản phẩm" />
          <InputField fullWidth name="code" label="Mã sản phẩm" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductForm;
