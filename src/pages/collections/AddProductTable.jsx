import { ErrorMessage } from '@hookform/error-message';
import closeIcon from '@iconify/icons-eva/close-outline';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import EmptyContent from 'components/EmptyContent';
import { InputField } from 'components/form';
import { useFieldArray, useFormState } from 'react-hook-form';

const AddProductTable = ({ control }) => {
  const { errors } = useFormState({ control });
  const { fields: products, remove: removeProd } = useFieldArray({ name: 'products', control });
  const buildProductTable = () => (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sản phẩm</TableCell>
            <TableCell align="center">Giá</TableCell>
            <TableCell align="center">Thứ tự</TableCell>
            <TableCell align="center">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((data, idx) => (
            <TableRow key={data.id}>
              <TableCell align="left">
                <Box display="flex" justifyContent="space-between">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar variant="square" src={data.pic_url} />
                    <Typography noWrap>{data.product_name}</Typography>
                  </Stack>
                </Box>
              </TableCell>
              <TableCell align="center">{data.price}</TableCell>
              <TableCell align="center">
                <InputField
                  type="number"
                  size="small"
                  key={`product-position-${data[idx]?.id}`}
                  label="Thứ tự"
                  name={`products.${idx}.position`}
                />
              </TableCell>

              <TableCell align="center">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    removeProd(idx);
                  }}
                  size="large"
                >
                  <Icon icon={closeIcon} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Stack spacing={2}>
      <ErrorMessage
        errors={errors}
        name="products"
        render={({ message }) => (
          <Typography color="red" variant="caption">
            {message}
          </Typography>
        )}
      />
      {products.length ? (
        buildProductTable()
      ) : (
        <EmptyContent title="Chưa có sản phẩm nào được thêm" />
      )}
    </Stack>
  );
};

export default AddProductTable;
