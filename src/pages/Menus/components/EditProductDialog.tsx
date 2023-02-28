import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { CheckBoxField, InputField } from 'components/form';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useLocales from 'hooks/useLocales';
import { useMemo, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  data: any;
  updateMode: boolean;
};
const ProductInMenuDialog = ({ open, onClose, onSubmit, data = {}, updateMode = false }: Props) => {
  const { translate } = useLocales();

  const form = useForm({
    defaultValues: data
  });

  const { reset } = form;
  useEffect(() => {
    if (data) {
      const priceData = { ...data };
      for (let index = 0; index < 10; index++) {
        priceData[`price${index + 1}`] = data[`price${index + 1}`];
      }
      reset(priceData);
    }
  }, [reset, data]);

  const priceInputs = useMemo(() => {
    const inputs = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 10; index++) {
      inputs.push(
        <Grid key={`price_${index}`} item xs={6}>
          <InputField
            autoFocus
            type="number"
            name={`price${index + 1}`}
            label={`Giá ${index + 1}`}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
      );
    }
    return inputs;
  }, []);

  return (
    <FormProvider {...form}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {updateMode ? translate('common.update') : translate('common.create')}{' '}
          {data?.product_name} {translate('menu.store-menu')}
        </DialogTitle>
        <DialogContent>
          <InputField name="product_id" sx={{ display: 'none' }} />
          <CheckBoxField name="is_fixed_price" label="Giá cố định" />
          <Grid container py={2} spacing={2}>
            {priceInputs}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            {translate('common.cancel')}
          </Button>
          <LoadingAsyncButton onClick={form.handleSubmit(onSubmit)} variant="contained">
            {updateMode ? translate('common.update') : translate('common.create')}
          </LoadingAsyncButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
export default ProductInMenuDialog;
