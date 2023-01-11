/* eslint-disable no-plusplus */
import trashIcon from '@iconify/icons-eva/trash-outline';
import { Icon } from '@iconify/react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Radio,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import ConfirmDialog from 'components/Dialog/ConfirmDialog';
import Label from 'components/Label';
import faker from 'faker';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { getCbn } from 'utils/utils';
import { AutoCompleteField, InputField } from '../../../components/form';

const VariantForm = ({ name, updateMode: defaultMode = true }) => {
  const { control, setValue, getValues, reset, watch } = useFormContext();
  const { fields: childProducts, remove: removeChildProd } = useFieldArray({
    control,
    name: 'child_products',
    key: 'product_id'
  });
  const [_updateMode, setUpdateMode] = useState(defaultMode);
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    fields: variants,
    append: push,
    remove
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const [masterName, masterPrice] = watch(['product_name', 'price']);

  const variantsWatch = useWatch({
    name: 'variants'
  });

  console.log(`variantsWatch`, variantsWatch);

  const arrStr = variantsWatch
    ?.filter(({ values }) => values && values?.length !== 0)
    .map(({ values = [] }) => values.join('-'))
    .join('-');

  useEffect(() => {
    const variantArr = variantsWatch?.reduce((acc, { values = [] }) => [...acc, values], []);
    const prodComb = getCbn(...(variantArr ?? []));
    // [[a,c][b,c]]
    const generateDefaultProductChilds = prodComb.map((atts = []) => ({
      product_id: faker.datatype.uuid(),
      atts,
      is_available: true,
      code: `${atts.join('')}`,
      product_name: `${masterName} ${atts.join('-')}`,
      price: masterPrice
    }));

    if (_updateMode) {
      setValue('child_products', generateDefaultProductChilds);
    }

    // HACKS set new value for child_products
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrStr, _updateMode]);

  const buildVariantTable = () => (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sản phẩm</TableCell>
            <TableCell align="center">Mã sản phẩm</TableCell>
            <TableCell align="center">Thuộc tính</TableCell>
            <TableCell align="center">Giá</TableCell>
            <TableCell align="center">SP Mặc định</TableCell>
            <TableCell align="center">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {childProducts.map(({ atts, product_name, product_id }, index) => (
            <TableRow key={product_id}>
              <TableCell align="left">
                <InputField name={`child_products.${index}.product_name`} fullWidth size="small" />
              </TableCell>
              <TableCell>
                <InputField name={`child_products.${index}.code`} fullWidth size="small" />
              </TableCell>
              <TableCell>
                <Stack spacing={1}>
                  {atts?.map((att) => (
                    <Label key={`${product_id}-${atts?.join('-')}`}>{att}</Label>
                  )) ?? '-'}
                </Stack>
              </TableCell>
              <TableCell>
                <InputField
                  type="number"
                  name={`child_products.${index}.price`}
                  fullWidth
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Controller
                  key={`child-product-select-${product_id}`}
                  name="defaultChildProduct"
                  render={({ field }) => (
                    <Radio
                      onChange={() => {
                        field.onChange(product_id);
                      }}
                      checked={field.value === product_id}
                    />
                  )}
                />
              </TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() => removeChildProd(index)}
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

  return (
    <Stack spacing={2}>
      <ConfirmDialog
        open={openConfirm}
        title="Thay đổi tùy chọn sẽ phải xóa các tùy chọn cũ"
        onClose={() => {
          setOpenConfirm(false);
        }}
        onDelete={() => {
          setOpenConfirm(false);
          setUpdateMode(true);
        }}
      />
      {variants.map(({ optName, values }, optIndex) => (
        <Box key={`variant-${optIndex}`}>
          <Stack direction="row" spacing={2}>
            <InputField
              name={`variants.${optIndex}.optName`}
              size="small"
              disabled={!_updateMode}
              label="Tên tùy chọn"
            />

            <AutoCompleteField
              name={`variants.${optIndex}.values`}
              label="Tag"
              multiple
              freeSolo
              size="small"
              variant="outlined"
              options={[]}
              limitTags={2}
              fullWidth
            />

            <IconButton
              disabled={optIndex === 0 || !_updateMode}
              onClick={() => remove(optIndex)}
              size="small"
              aria-label="delete"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Box>
      ))}
      <Divider />
      <span>
        {!_updateMode && (
          <Button onClick={() => setOpenConfirm(true)} variant="outlined" disabled={_updateMode}>
            Điều chỉnh
          </Button>
        )}
        {_updateMode && (
          <Button
            onClick={() =>
              push({
                optName: '',
                values: []
              })
            }
            variant="outlined"
          >
            Thêm tùy chọn
          </Button>
        )}
      </span>
      <Box>
        <Typography variant="subtitle2">Danh sách</Typography>
        {buildVariantTable()}
      </Box>
    </Stack>
  );
};

export default VariantForm;
