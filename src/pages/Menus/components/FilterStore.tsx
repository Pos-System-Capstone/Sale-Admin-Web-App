import {
  Autocomplete,
  Checkbox,
  Box,
  Stack,
  Typography,
  FormControlLabel,
  Grid,
  IconButton,
  TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import closeIcon from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import React from 'react';
import { COLOR_OPTIONS } from 'redux/slices/calendar';
import { TStore } from 'types/store';

type Props = {
  filteredStores: TStore[];
  stores: TStore[];
  onChangeFilter: (stores: any) => void;
};

const FilterStore: React.FC<Props> = ({ filteredStores, stores, onChangeFilter }) => {
  const theme = useTheme();
  const isCheckedAll = filteredStores.length === stores.length;
  const handleFilterAllStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChangeFilter(stores);
    } else {
      onChangeFilter([]);
    }
  };
  return (
    <Box border="1px solid" p={2} borderColor="grey.300" height="100%">
      <Stack spacing={2} direction="column">
        <Typography variant="caption">Chọn cửa hàng để xem các bảng giá</Typography>
        <Box>
          <Autocomplete
            multiple
            limitTags={2}
            disableCloseOnSelect
            size="small"
            id="multiple-limit-tags"
            options={stores ?? []}
            getOptionLabel={(option: any) => option?.name}
            renderTags={() => null}
            renderOption={(props, option: TStore, { selected }) => (
              <li {...props}>
                <Checkbox checked={filteredStores.findIndex(({ id }) => id === option.id) !== -1} />
                <Box
                  sx={{
                    flexGrow: 1,
                    '& span': {
                      color: theme.palette.mode === 'light' ? '#586069' : '#8b949e'
                    }
                  }}
                >
                  {option.name}
                  <br />
                  {/* <span>{option.store_code}</span> */}
                </Box>
              </li>
            )}
            onChange={(e, newValue: TStore[]) => {
              onChangeFilter(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>
                }}
                label="Chọn cửa hàng"
                placeholder="Chọn cửa hàng"
              />
            )}
          />
          <Box sx={{ float: 'right' }}>
            <FormControlLabel
              sx={{ mr: 0 }}
              control={
                <Checkbox defaultChecked checked={isCheckedAll} onChange={handleFilterAllStore} />
              }
              label="Xem tất cả"
            />
          </Box>
        </Box>
        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Grid container>
            {filteredStores.map((store) => (
              <Grid key={store.id} item xs={12}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center'
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                      borderRadius: '3px',
                      mr: 1,
                      mt: '2px'
                    }}
                    // style={{
                    //   backgroundColor: COLOR_OPTIONS[store.id % COLOR_OPTIONS.length]
                    // }}
                  />
                  <Typography>{store.name}</Typography>
                  <Box flex={1} />
                  <IconButton
                    onClick={() => {
                      onChangeFilter(filteredStores.filter(({ id }) => id !== store.id));
                    }}
                    size="large"
                  >
                    <Icon icon={closeIcon} width={20} height={20} />
                  </IconButton>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default FilterStore;
