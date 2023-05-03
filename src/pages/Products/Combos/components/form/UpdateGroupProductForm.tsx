import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Stack,
  TableHead,
  TableRow,
  Card,
  Button
} from '@mui/material';
import { Box } from '@mui/system';
import { ProductInGroupStatusEnum, ProductsInGroup, TGroupProduct, TProduct } from 'types/product';
import { InputField } from 'components/form';
import { FormProvider, useForm } from 'react-hook-form';
import Label from 'components/Label';
import { useProducts } from 'hooks/products/useProduct';
import productApi from 'api/product';
import { useSnackbar } from 'notistack';
import useAuth from 'hooks/useAuth';
interface Props {
  idx: number;
  groupProduct: TGroupProduct;
  comboId: string;
  onReload: Function;
}
const GroupProduct = (props: Props) => {
  const { data: productList } = useProducts({ page: 1, size: 1000 });
  const updateGroupProductForm = useForm<TGroupProduct>({
    defaultValues: {
      ...props.groupProduct
    }
  });
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const selectedProductIds = props.groupProduct.productsInGroups?.map(
    (product) => product.productId
  );

  const getProductDetail = (productId: string) => {
    const product = productList?.find((product) => product.id === productId);
    return product;
  };

  const submitHandler = (values: TGroupProduct) =>
    productApi
      .updateGroupProductOfComBos(user?.brandId, props.groupProduct.id, values)
      .then((res) => {
        props.onReload();
        enqueueSnackbar(`Cập nhật thành công ${res}`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });

  return (
    <FormProvider {...updateGroupProductForm}>
      <Card>
        <Stack spacing={2} key={props.groupProduct.id}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Label color="default">{props.idx + 1}</Label>
              <Typography variant="h6">{props.groupProduct.name}</Typography>
            </Stack>
            {/* <ModalProductForm
              selected={selectedProductIds}
              onSubmit={null}
              trigger={
                <Button size="small" variant="outlined">
                  Cập nhật sản phẩm{' '}
                </Button>
              }
            /> */}
          </Stack>
          <Stack spacing={2} pl={2}>
            <Stack spacing={2} pl={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputField fullWidth label="Tên nhóm sản phẩm" name="name" />
                </Grid>
                <Grid item xs={2}>
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
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    onClick={updateGroupProductForm.handleSubmit(submitHandler)}
                    size="medium"
                    variant="outlined"
                  >
                    Lưu
                  </Button>
                </Grid>
              </Grid>
              <TableContainer>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Sản phẩm</TableCell>
                      <TableCell align="center">Giá gốc</TableCell>
                      <TableCell align="center">Giá cộng thêm</TableCell>
                      <TableCell align="center">Thứ tự hiển thị</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                      <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.groupProduct.productsInGroups.map((data, idx) => (
                      <ProductGroupTable
                        productInGroup={data}
                        productDetail={getProductDetail(data.productId)}
                        key={data.id}
                        onReload={props.onReload}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  );
};
export default GroupProduct;

export interface ProductsInGroupProps {
  productInGroup: ProductsInGroup;
  productDetail: TProduct | undefined;
  onReload: Function;
}
export const ProductGroupTable = (props: ProductsInGroupProps) => {
  const updateGroupProductForm = useForm<ProductsInGroup>({
    defaultValues: { ...props.productInGroup }
  });
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = (values: ProductsInGroup) => {
    const payload = {
      priority: values.priority,
      additionalPrice: Number(values.additionalPrice),
      min: Number(values.min),
      max: Number(values.max),
      quantity: values.quantity,
      status: values.status
    };
    return productApi
      .updateProductInGroup(props.productInGroup.id, props.productInGroup.groupProductId, payload)
      .then((res) => {
        props.onReload();
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };

  const submitHandlerDeactive = (values: ProductsInGroup) => {
    const payload = {
      priority: values.priority,
      additionalPrice: Number(values.additionalPrice),
      min: Number(values.min),
      max: Number(values.max),
      quantity: values.quantity,
      status: ProductInGroupStatusEnum.DEACTIVE
    };
    console.log('updateProductInGroupPayload', payload);
    return productApi
      .updateProductInGroup(props.productInGroup.id, props.productInGroup.groupProductId, payload)
      .then((res) => {
        props.onReload();
        enqueueSnackbar(`Ẩn thành công`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };
  const submitHandlerActive = (values: ProductsInGroup) => {
    const payload = {
      priority: values.priority,
      additionalPrice: Number(values.additionalPrice),
      min: Number(values.min),
      max: Number(values.max),
      quantity: values.quantity,
      status: ProductInGroupStatusEnum.ACTIVE
    };
    console.log('updateProductInGroupPayload', payload);
    return productApi
      .updateProductInGroup(props.productInGroup.id, props.productInGroup.groupProductId, payload)
      .then((res) => {
        props.onReload();
        enqueueSnackbar(`Kích hoạt thành công`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };

  return (
    <FormProvider {...updateGroupProductForm}>
      <TableRow key={props.productInGroup.id}>
        <TableCell align="left">
          <Box display="flex" justifyContent="space-between">
            <TableCell align="left">
              <Box display="flex" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    component="img"
                    alt={props.productDetail?.name}
                    src={
                      props.productDetail?.picUrl ??
                      'https://firebasestorage.googleapis.com/v0/b/pos-system-47f93.appspot.com/o/files%2Fproduct.png?alt=media&token=8eb70c21-2c0e-4d5c-b92a-0b93c3020c9b'
                    }
                    sx={{ width: 48, height: 48, borderRadius: 1.5 }}
                  />
                  <Typography noWrap>{props.productDetail?.name}</Typography>
                </Stack>
              </Box>
            </TableCell>
          </Box>
        </TableCell>
        <TableCell align="center">
          <Typography noWrap>{props.productDetail?.sellingPrice} đ</Typography>
        </TableCell>
        <TableCell align="center">
          <InputField
            type="number"
            size="small"
            key={`product-position-${props.productInGroup.additionalPrice}`}
            label="Số tiền tăng thêm trong combo"
            name="additionalPrice"
          />
        </TableCell>
        <TableCell align="center">
          <InputField
            type="number"
            size="small"
            key={`product-position-${props.productInGroup.min}`}
            label="Thứ tự hiển thị"
            name="priority"
          />
        </TableCell>
        {/* <TableCell align="center">
          <InputField
            type="number"
            size="small"
            key={`product-position-${props.productInGroup.max}`}
            label="Tối đa"
            name="max"
          />
        </TableCell> */}
        <TableCell align="center">
          {props.productInGroup.status === ProductInGroupStatusEnum.ACTIVE ? (
            <Label color="primary">Hoạt đông</Label>
          ) : (
            <Label color="default">Tạm ẩn</Label>
          )}
        </TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={updateGroupProductForm.handleSubmit(submitHandler)}>
              Lưu
            </Button>

            {props.productInGroup.status === ProductInGroupStatusEnum.ACTIVE ? (
              <Button
                color="error"
                variant="outlined"
                onClick={updateGroupProductForm.handleSubmit(submitHandlerDeactive)}
              >
                Ẩn
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="outlined"
                onClick={updateGroupProductForm.handleSubmit(submitHandlerActive)}
              >
                Hiện
              </Button>
            )}
          </Stack>
        </TableCell>
      </TableRow>
    </FormProvider>
  );
};
