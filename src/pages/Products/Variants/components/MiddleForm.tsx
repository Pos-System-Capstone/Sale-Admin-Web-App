// import { Card, Grid, Stack, Button, TextField, Chip } from '@mui/material';
import { Stack } from '@mui/material';
import { Card, Grid } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { InputField } from 'components/form';
import variantApi from 'api/variant';
import TagField from 'components/form/TagField';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { TVariant } from 'types/report/variant';

type Props = {
  handleSubmit?: any;
  reset?: any;
};

export default function MiddleForm({ handleSubmit, reset }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = async (values: TVariant) => {
    const body = { ...values };
    body.name = values.name;
    body.value = values.value;
    body.displayOrder = values.displayOrder;
    body.status = 'Active';
    const response = await variantApi.createVariant(body);
    if (response.status == 200) {
      enqueueSnackbar(`Thêm thành công`, {
        variant: 'success'
      });
      navigate(PATH_DASHBOARD.variants.root);
    }
  };

  return (
    <Card style={{ width: '100%' }}>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={4}>
          <InputField fullWidth name="name" label="Tên" required />
        </Grid>
        <Grid item xs={4}>
          <InputField fullWidth name="displayOrder" label="Mức độ ưu tiên" required />
        </Grid>
        <Grid item xs={4}>
          <TagField
            required
            isInput={true}
            punctuation={'_'}
            name="value"
            fullWidth
            label="Giá trị"
            placeholder="Nhập giá trị"
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <LoadingAsyncButton type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
              Lưu
            </LoadingAsyncButton>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}
