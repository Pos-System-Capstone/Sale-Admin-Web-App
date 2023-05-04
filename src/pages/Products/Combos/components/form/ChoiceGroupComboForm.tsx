import trashIcon from '@iconify/icons-eva/trash-outline';
import { Icon } from '@iconify/react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import { InputField } from 'components/form';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { CardTitle } from 'pages/Products/components/Card';
// import ModalCollectionForm from '../ModalCollectionForm';
import { Add } from '@mui/icons-material';
import { differenceBy } from 'lodash';
import {
  CombinationModeEnum,
  CreateGroupProductForm,
  TGroupProduct,
  TProduct
} from 'types/product';
import ModalProductForm from 'components/ModalProductForm/ModalProductForm';
import { Card } from '@mui/material';

import { useEffect } from 'react';
import productApi from 'api/product';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import GroupProduct from './UpdateGroupProductForm';

interface Props {
  id: string;
}

const ChoiceGroupComboForm = (props: Props) => {
  const { control, watch } = useFormContext();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const watchFieldArray = watch('groups');
  const {
    fields,
    remove: removeGroup,
    append: appendGroup
  } = useFieldArray({
    control,
    name: 'groups',
    keyName: 'group_id'
  });
  const createGroupFrom = useForm<CreateGroupProductForm>({
    defaultValues: {
      combinationMode: CombinationModeEnum.FixedCombo.toString(),
      comboProductId: props.id,
      quantity: 1,
      priority: 0,
      productIds: []
    }
  });

  const { data: listGroupProduct, refetch } = useQuery(
    ['groupProduct', user?.brandId, props.id],
    () => productApi.getListGroupProductOfCombo(user?.brandId, props.id).then((res) => res.data),
    {
      enabled: Boolean(props.id)
    }
  );
  console.log('listGroupProduct', listGroupProduct);

  const controlledFields = fields.map((g, idx) => ({
    ...g,
    ...watchFieldArray[idx]
  }));

  const fixedProductsFieldArray = watch('fixedProducts');
  const {
    fields: fixedProducts,
    remove: removeFixedProduct,
    append: appendFixedProduct
  } = useFieldArray({
    control,
    name: 'fixedProducts',
    keyName: 'fixed_product_id'
  });

  const fixedProductsControlledFields = fixedProducts.map((g, idx) => ({
    ...g,
    ...fixedProductsFieldArray[idx]
  }));

  const handleAddFixedProduct = async (ids: number[], selectedProds: any[]) => {
    const differentProds = differenceBy(
      selectedProds,
      fixedProductsControlledFields,
      'fixed_product_id'
    );

    const newGroups = differentProds.map((p) => ({ ...p, default: 1 }));
    console.log(`newGroups`, newGroups);
    appendFixedProduct([...newGroups]);
  };

  const selectedGroupIds = controlledFields?.map(({ id }) => id);
  const selectedProdIds = fixedProductsControlledFields?.map(({ id }) => id);

  useEffect(() => {
    createGroupFrom.setValue('productIds', selectedProdIds);
  }, [createGroupFrom, fixedProductsControlledFields, selectedProdIds]);
  const submitHandler = (values: CreateGroupProductForm) =>
    productApi
      .createGroupProduct(user?.brandId, values)
      .then((res) => {
        refetch();
        enqueueSnackbar(`Thêm thành công ${values.name}`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });

  return (
    <Stack padding={2} spacing={2}>
      <FormProvider {...createGroupFrom}>
        <Card>
          <Stack spacing={2}>
            <Stack alignItems="center" direction="row" justifyContent="space-between">
              <CardTitle mb={2}> Thêm nhóm sản phẩm</CardTitle>
              <Stack spacing={2} direction="row">
                <ModalProductForm
                  selected={selectedProdIds}
                  onSubmit={handleAddFixedProduct}
                  trigger={
                    <Button size="small" variant="outlined">
                      Thêm sản phẩm
                    </Button>
                  }
                />
                <Button
                  onClick={createGroupFrom.handleSubmit(submitHandler)}
                  size="small"
                  variant="contained"
                  startIcon={<Add />}
                >
                  Thêm nhóm vào combo
                </Button>
                {/* <ModalCollectionForm
                  selected={selectedGroupIds}
                  onSubmit={handleAddGroup}
                  trigger={
                    <Button size="small" variant="outlined" startIcon={<Add />}>
                      Thêm nhóm sản phẩm
                    </Button>
                  }
                /> */}
              </Stack>
            </Stack>
            <Stack spacing={2} pl={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputField fullWidth label="Tên nhóm sản phẩm" name="name" />
                </Grid>
                <Grid item xs={4}>
                  <InputField fullWidth type="number" label="Số sản phẩm tối đa" name="quantity" />
                  {/* <InputField name={`groups.${idx}.id`} style={{ display: 'none' }} hidden /> */}
                  {/* <InputField
                    name={`groups.${idx}.base_product_id`}
                    style={{ display: 'none' }}
                    hidden
                  /> */}
                </Grid>
                <Grid item xs={2}>
                  <InputField fullWidth type="number" label="Thứ tự" name="priority" />
                </Grid>
              </Grid>
              {/* <ProductGroupTable groupIdx={idx} control={control} /> */}
            </Stack>
            {Boolean(fixedProductsControlledFields?.length) && (
              <Stack spacing={2} pt={2}>
                <FixedProductTable
                  products={fixedProductsControlledFields}
                  onRemove={removeFixedProduct}
                />
              </Stack>
            )}
          </Stack>
        </Card>
      </FormProvider>

      {listGroupProduct?.map((group: TGroupProduct, idx) => (
        <GroupProduct
          key={idx}
          idx={idx}
          groupProduct={group}
          comboId={props.id}
          onReload={refetch}
        />
      ))}
    </Stack>
  );
};

const FixedProductTable = ({
  products,
  onRemove
}: {
  products: TProduct[];
  onRemove: (idx: number) => any;
}) => {
  return (
    <TableContainer>
      <Table aria-label="fixerd products table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sản phẩm</TableCell>
            <TableCell align="center">Giá</TableCell>
            {/* <TableCell align="center">Số lượng</TableCell> */}
            <TableCell align="center">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((data, idx) => (
            <TableRow key={data.id}>
              <TableCell align="left">
                <Box display="flex" justifyContent="space-between">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      component="img"
                      alt={data.name}
                      src={
                        data.picUrl ??
                        'https://firebasestorage.googleapis.com/v0/b/pos-system-47f93.appspot.com/o/files%2Fproduct.png?alt=media&token=8eb70c21-2c0e-4d5c-b92a-0b93c3020c9b'
                      }
                      sx={{ width: 48, height: 48, borderRadius: 1.5 }}
                    />
                    <Typography noWrap>{data.name}</Typography>
                  </Stack>
                </Box>
              </TableCell>
              <TableCell align="center">{data.sellingPrice} đ</TableCell>
              {/* <TableCell align="center">
                <InputField
                  type="number"
                  size="small"
                  key={`product-position-${data.id}`}
                  label="Số lượng"
                  name={`fixedProducts.${idx}.default`}
                />
              </TableCell> */}
              <TableCell align="center">
                <IconButton
                  key={`remove-fixed-product-${data.id}`}
                  onClick={() => onRemove(idx)}
                  sx={{ color: 'red' }}
                  size="large"
                >
                  <Icon icon={trashIcon} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ChoiceGroupComboForm;
