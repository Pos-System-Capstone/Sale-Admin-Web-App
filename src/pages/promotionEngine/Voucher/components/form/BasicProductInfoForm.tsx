import styled from '@emotion/styled';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { AutoCompleteField, InputField } from 'components/form';
import useLocales from 'hooks/useLocales';
import React, { useState } from 'react';

interface Props {}

const BasicProductInfoForm = (props: Props) => {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };
  const [alignment, setAlignment] = useState('discount');
  const StyledToggleButton = styled(ToggleButton)({
    width: '50%',
    height: '55.8px',
    paddingRight: '10px',
    pb: '20px',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'white',
      backgroundColor: '#00AB55'
    }
  });
  const { t } = useLocales();

  return (
    <Grid container flexWrap="nowrap" gap={2}>
      <Grid item xs={6}>
        <Stack spacing={2} direction="column">
          <Box>
            <InputField
              fullWidth
              name="product_name"
              label={`${t('promotionSystem.voucher.addVoucher.groupName')}`}
              required
              sx={{ height: '30px', pb: '50px' }}
            />
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutoCompleteField
                  name="tags"
                  label={`${t('promotionSystem.voucher.addVoucher.quantity')}`}
                  required
                  multiple
                  freeSolo
                  variant="outlined"
                  options={[]}
                  limitTags={2}
                  fullWidth
                  sx={{ height: '30px', pb: '70px' }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  fullWidth
                  type="number"
                  name="price"
                  label={`${t('promotionSystem.voucher.addVoucher.length')}`}
                  required
                  helperText={`${t('promotionSystem.voucher.addVoucher.helperLength')}: 62`}
                  sx={{ height: '30px', pb: '70px' }}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack>
          <Box>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleChange}
              sx={{ display: 'flex' }}
            >
              <StyledToggleButton value="discount">{`${t(
                'promotionSystem.voucher.addVoucher.discountAction'
              )}`}</StyledToggleButton>
              <StyledToggleButton value="gift">{`${t(
                'promotionSystem.voucher.addVoucher.giftAction'
              )}`}</StyledToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            {alignment !== 'gift' && (
              <Box sx={{ height: '55.8px', pt: '10px' }}>
                <FormControl fullWidth disabled={alignment === 'gift'}>
                  <InputLabel id="demo-simple-select-label">{`${t(
                    'promotionSystem.voucher.addVoucher.discountAction'
                  )}`}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={`${t('promotionSystem.voucher.addVoucher.discountAction')}`}
                    sx={{ mb: '10px' }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Giảm 5k cho phí ship</MenuItem>
                    <MenuItem value={10}>Action. tests</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
            {alignment === 'gift' && (
              <Box sx={{ height: '55.8px', pt: '10px' }}>
                <FormControl fullWidth disabled={alignment !== 'gift'}>
                  <InputLabel id="demo-simple-select-label">{`${t(
                    'promotionSystem.voucher.addVoucher.giftAction'
                  )}`}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={`${t('promotionSystem.voucher.addVoucher.giftAction')}`}
                    sx={{ mb: '10px' }}
                  >
                    <MenuItem value="">
                      <em>No data</em>
                    </MenuItem>
                    <MenuItem value={10}></MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BasicProductInfoForm;
