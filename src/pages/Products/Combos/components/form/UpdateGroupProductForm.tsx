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
  Button,
  Avatar
} from '@mui/material';
import { Box } from '@mui/system';
import { TGroupProduct } from 'types/product';
import { InputField } from 'components/form';
import { FormProvider, useForm } from 'react-hook-form';
import Label from 'components/Label';
import ModalProductForm from 'components/ModalProductForm/ModalProductForm';
import { useProducts } from 'hooks/products/useProduct';

interface Props {
  idx: number;
  groupProduct: TGroupProduct;
  comboId: string;
}
const GroupProduct = (props: Props) => {
  const { data: productList } = useProducts({ page: 1, size: 1000 });
  const updateGroupProductForm = useForm<TGroupProduct>({
    defaultValues: {
      ...props.groupProduct
    }
  });
  const selectedProductIds = props.groupProduct.productsInGroups?.map(
    (product) => product.productId
  );

  const getProductDetail = (productId: string) => {
    const product = productList?.find((product) => product.id === productId);
    return product;
  };
  return (
    <FormProvider {...updateGroupProductForm}>
      <Card>
        <Stack spacing={2} key={props.groupProduct.id}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Label color="default">{props.idx + 1}</Label>
              <Typography variant="h6">{props.groupProduct.name}</Typography>
            </Stack>
            <ModalProductForm
              selected={selectedProductIds}
              onSubmit={null}
              trigger={
                <Button size="small" variant="outlined">
                  Cập nhật sản phẩm{' '}
                </Button>
              }
            />
            {/* <IconButton onClick={} sx={{ color: 'red' }} size="large">
            <Icon icon={trashIcon} />
          </IconButton> */}
          </Stack>
          <Stack spacing={2} pl={2}>
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
              <TableContainer>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Sản phẩm</TableCell>
                      <TableCell align="center">Giá</TableCell>
                      <TableCell align="center">Tối thiểu</TableCell>
                      <TableCell align="center">Tối đa</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.groupProduct.productsInGroups.map((data, idx) => (
                      <TableRow key={data.id}>
                        <TableCell align="left">
                          <Box display="flex" justifyContent="space-between">
                            <TableCell align="left">
                              <Box display="flex" justifyContent="space-between">
                                <Stack direction="row" spacing={2} alignItems="center">
                                  <Avatar
                                    variant="square"
                                    src={getProductDetail(data.productId)?.picUrl}
                                  />
                                  <Typography noWrap>
                                    {getProductDetail(data.productId)?.name}
                                  </Typography>
                                </Stack>
                              </Box>
                            </TableCell>
                          </Box>
                        </TableCell>
                        <TableCell align="center">{data.additionalPrice}</TableCell>
                        <TableCell align="center">
                          <InputField
                            type="number"
                            size="small"
                            key={`product-position-${data.min}`}
                            label="Tối thiểu"
                            name="productInGroups.min"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <InputField
                            key={data.groupProductId}
                            name="groupProductId"
                            style={{ display: 'none' }}
                            hidden
                          />
                          {/* <InputField
                  key={`product-id-${data[idx]?.id}`}
                  name={`${arrName}.${idx}.id`}
                  style={{ display: 'none' }}
                  hidden
                /> */}
                          <InputField
                            type="number"
                            size="small"
                            key={`product-position-${data.max}`}
                            label="Tối đa"
                            name="max"
                          />
                        </TableCell>
                        {/* <TableCell align="center">
                          <IconButton
                            key={`remove-fixed-product-${data.id}`}
                            onClick={() => onRemove(idx)}
                            sx={{ color: 'red' }}
                            size="large"
                          >
                            <Icon icon={trashIcon} />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
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

// const ProductGroupTable = ({
//   groupIdx,
//   products
// }: {
//   groupIdx: number;
//   products: ProductsInGroup[];
// }) => {
//   // const watchFieldArr = useWatch({ control, name: arrName });
//   // const { fields } = useFieldArray({
//   //   control,
//   //   name: `products`
//   // });

//   // const products = (fields ?? [])?.map((f, idx) => ({
//   //   ...f,
//   //   ...watchFieldArr[idx]
//   // }));

//   return (
//     <TableContainer>
//       <Table aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="left">Sản phẩm</TableCell>
//             <TableCell align="center">Giá</TableCell>
//             <TableCell align="center">Tối thiểu</TableCell>
//             <TableCell align="center">Tối đa</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {products.map((data, idx) => (
//             <TableRow key={data.id}>
//               <TableCell align="left">
//                 <Box display="flex" justifyContent="space-between">
//                   <TableCell align="left">
//                     <Box display="flex" justifyContent="space-between">
//                       <Stack direction="row" spacing={2} alignItems="center">
//                         <Avatar variant="square" src={getProduct(data.productId)} />
//                         <Typography noWrap>{data.name}</Typography>
//                       </Stack>
//                     </Box>
//                   </TableCell>
//                 </Box>
//               </TableCell>
//               <TableCell align="center">{data.additionalPrice}</TableCell>
//               <TableCell align="center">
//                 <InputField
//                   type="number"
//                   size="small"
//                   key={`product-position-${data.min}`}
//                   label="Tối thiểu"
//                   name="min"
//                 />
//               </TableCell>
//               <TableCell align="center">
//                 <InputField
//                   key={data.groupProductId}
//                   name="groupProductId"
//                   style={{ display: 'none' }}
//                   hidden
//                 />
//                 {/* <InputField
//                   key={`product-id-${data[idx]?.id}`}
//                   name={`${arrName}.${idx}.id`}
//                   style={{ display: 'none' }}
//                   hidden
//                 /> */}
//                 <InputField
//                   type="number"
//                   size="small"
//                   key={`product-position-${data.max}`}
//                   label="Tối đa"
//                   name="max"
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };
