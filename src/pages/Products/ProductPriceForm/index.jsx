/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import {
  InputAdornment,
  Button,
  Stack,
  Box,
  Divider,
  IconButton,
  MenuItem,
  ListItemText,
  CircularProgress
} from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import { useRequest } from 'ahooks';
import { getMenus } from '../../../redux/menu/api';
import { InputField, SelectField } from '../../../components/form';

const ProductPriceForm = ({ name }) => {
  const { control } = useFormContext();
  const {
    fields: menus,
    append: push,
    remove
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const { data: menuData = [], loading } = useRequest(getMenus, {
    formatResult: (res) => res.data.data
  });

  return (
    <Stack spacing={2}>
      {menus.map(({ price, menuId }, menuIndex) => (
        <Box key={`menu-${menuId}`}>
          <Stack direction="row" spacing={2}>
            <InputField
              name={`menus.${menuIndex}.price`}
              size="small"
              label="Giá"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">VND</InputAdornment>
              }}
            />

            <SelectField
              name={`menus.${menuIndex}.menuId`}
              id="select-menu"
              label="Menu áp dụng"
              fullWidth
              size="small"
              variant="outlined"
              renderValue={(selected) =>
                menuData.find(({ menu_id }) => selected === menu_id)?.menu_name
              }
            >
              {loading ? (
                <CircularProgress />
              ) : (
                menuData.map(({ menu_name, menu_id, time_from_to }) => (
                  <MenuItem key={`menu-${menu_id}`} value={menu_id}>
                    <ListItemText primary={`${menu_name} : ${time_from_to.join('-')}`} />
                  </MenuItem>
                ))
              )}
            </SelectField>

            <IconButton
              disabled={menuIndex === 0}
              onClick={() => remove(menuIndex)}
              size="small"
              aria-label="delete"
              color="error"
              sx={{ alignSelf: 'start' }}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Box>
      ))}
      <Divider />
      <span>
        <Button
          onClick={() =>
            push({
              menuId: null,
              price: 0
            })
          }
          variant="outlined"
        >
          Thêm bảng giá
        </Button>
      </span>
    </Stack>
  );
};

export default ProductPriceForm;
