import { Grid } from '@mui/material';
import { InputField } from 'components/form';

type Props = {};
const UpdateForm = () => {
  return (
    <>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={8} spacing={2}>
          <InputField required fullWidth name="storeName" label="Tên cửa hàng" />
        </Grid>
        <Grid item xs={4} spacing={2}>
          <InputField required fullWidth name="storeCode" label="Mã cửa hàng" />
        </Grid>
      </Grid>
    </>
  );
};
export default UpdateForm;
