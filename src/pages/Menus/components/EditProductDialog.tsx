import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import { InputField } from 'components/form';
import useLocales from 'hooks/useLocales';
import { FormProvider, useForm } from 'react-hook-form';
import { ProductTypeEnum } from 'types/product';

type TProductUpdate = {
  id: string;
  sellingPrice: number;
  discountPrice: number;
};

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: (value: TProductUpdate) => void;
  data: any;
  updateMode: boolean;
};

const ProductInMenuDialog = ({ open, onClose, onSubmit, data, updateMode = false }: Props) => {
  const { translate } = useLocales();

  const form = useForm<TProductUpdate>();

  const { reset } = form;
  // useEffect(() => {
  //   if (data) {
  //     const priceData = { ...data };
  //     for (let index = 0; index < 10; index++) {
  //       priceData[`price${index + 1}`] = data[`price${index + 1}`];
  //     }
  //     reset(priceData);
  //   }
  // }, [reset, data]);

  // const priceInputs = useMemo(() => {
  //   const inputs = [];

  //   // eslint-disable-next-line no-plusplus
  //   for (let index = 0; index < 10; index++) {
  //     inputs.push(
  //       <Grid key={`price_${index}`} item xs={6}>
  //         <InputField
  //           autoFocus
  //           type="number"
  //           name={`price${index + 1}`}
  //           label={`Giá ${index + 1}`}
  //           fullWidth
  //           variant="outlined"
  //           size="small"
  //         />
  //       </Grid>
  //     );
  //   }
  //   return inputs;
  // }, []);
  console.log('data ne: ', data);

  return (
    <FormProvider {...form}>
      {data && (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>
            {/* {updateMode ? translate('common.update') : translate('common.create')}{' '} */}
            {translate('common.update')} giá {data?.name}
          </DialogTitle>
          <DialogContent>
            <InputField name="id" defaultValue={data?.id} sx={{ display: 'none' }} />
            <Grid container py={2} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField disabled fullWidth name="name" label="Tên sản phẩm" value={data?.name} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  fullWidth
                  name="code"
                  label="Mã sản phẩm"
                  defaultValue={data?.code}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField
                  fullWidth
                  disabled={data?.type === ProductTypeEnum.PARENT}
                  name="sellingPrice"
                  label="Giá bán sản phẩm"
                  defaultValue={data?.sellingPrice}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  fullWidth
                  type={'number'}
                  name="discountPrice"
                  label="Giá giảm"
                  defaultValue={data?.discountPrice}
                  helperText="Nhập số tiền giảm"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  fullWidth
                  type={'number'}
                  name="historicalPrice"
                  label="Giá cos"
                  defaultValue={data?.discountPrice}
                  helperText="Nhập chi phí sản xuất"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="outlined" color="inherit">
              {translate('common.cancel')}
            </Button>

            <Button
              disabled={data?.type == ProductTypeEnum.PARENT}
              onClick={form.handleSubmit(onSubmit)}
              variant="contained"
            >
              {translate('common.update')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </FormProvider>
  );
};
export default ProductInMenuDialog;
