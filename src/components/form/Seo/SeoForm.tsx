import { InputField } from 'components/form';
import { Grid } from '@mui/material';

interface Props {}

const SeoForm = (props: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        <InputField name="seo_name" size="small" type="text" label="Đường dẫn SEO" fullWidth />
      </Grid>
      <Grid item xs={6} md={6}>
        <InputField name="seo_keyword" size="small" type="text" label="Đường dẫn SEO" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <InputField
          name="seo_description"
          fullWidth
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          label="Mô tả SEO"
        />
      </Grid>
    </Grid>
  );
};

export default SeoForm;
