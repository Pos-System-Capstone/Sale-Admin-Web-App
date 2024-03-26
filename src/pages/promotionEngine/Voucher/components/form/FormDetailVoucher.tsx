import styled from '@emotion/styled';
import { Paper, Grid, ToggleButton, Stack, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import AppGraficoPizza from './AppGraficoPizza';
import { Box } from '@mui/system';
import { InputField } from 'components/form';
import { Add } from '@mui/icons-material';
import { TVoucherGroupMoreCreate } from 'types/promotion/voucher';
import { useParams } from 'react-router-dom';
import voucherApi from 'api/promotion/voucher';
interface Props {
  watch?: any;
}

const TYPE_OPTIONS = [
  {
    value: 1,
    label: 'Giảm 100% cho sản phẩm Bông lan trứng muối'
  },
  {
    value: 2,
    label: 'Giảm 10% cho sản phẩm Bông lan trứng muối'
  }
];

const FormDetailVoucher = ({ watch }: Props) => {
  const [age, setAge] = React.useState('');
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const performPostRequest = async () => {
    try {
      const response = await voucherApi.createVoucherGroupMore(paramsData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleQuantityChange = (event: any) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) ? 0 : value);
  };
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };
  const [quantity, setQuantity] = React.useState<number>(0);
  const [alignment, setAlignment] = useState('discount');
  const { id } = useParams();
  const StyledToggleButton = styled(ToggleButton)({
    width: '50%',
    height: '55.8px',
    paddingRight: '10px',
    fontSize: '16px',
    pb: '20px',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'white',
      backgroundColor: '#00AB55'
    }
  });
  const used = watch('usedQuantity') !== undefined && watch('usedQuantity');
  const remain = watch('remain') !== undefined && watch('remain');
  const redemped = watch('redempedQuantity') !== undefined && watch('redempedQuantity');
  const paramsData: TVoucherGroupMoreCreate = {
    voucherGroupId: id,
    quantity: quantity
  };
  const PIZZA_CHART = {
    series: [used, remain, redemped],
    labelsData: ['Đã sử dụng', 'Còn lại', 'Đã thu thập']
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} spacing={1}>
        <Paper elevation={3} sx={{ height: '325.98px' }}>
          <Stack direction="row" justifyContent="space-between" sx={{ gap: 2 }}>
            <InputField
              fullWidth
              size="small"
              name="voucherName"
              label="Tên voucher"
              color="primary"
            />
          </Stack>
          <Box sx={{ pt: '15px' }}>
            <Grid item xs={5}>
              <TextField
                id="outlined-helperText"
                variant="outlined"
                type="number"
                sx={{ width: '180px', pb: '2px' }}
                value={quantity === 0 ? '' : quantity}
                label="Nhập số lượng Voucher"
                onChange={handleQuantityChange}
              />
              <Button
                variant="contained"
                sx={{ height: '53px', ml: '10px' }}
                startIcon={<Add />}
                onClick={performPostRequest}
              >
                Thêm voucher
              </Button>
              {/* <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  fontWeight="bold"
                  sx={{ pb: '1px' }}
                >
                  Số lượng tối đa của voucher là 999 voucher
                </Typography> */}
            </Grid>
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Action type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Action type"
                onChange={handleChangeSelect}
              >
                <MenuItem value={10}>Giảm 100% cho sản phẩm Bông lan trứng muối</MenuItem>
                <MenuItem value={20}>Giảm 10% cho sản phẩm Bông lan trứng muối</MenuItem>
                <MenuItem value={30}>Giảm 50% cho sản phẩm Bông lan trứng muối</MenuItem>
                <MenuItem value={40}>Giảm 50% cho sản phẩm Bông lan trứng muối</MenuItem>
              </Select>
            </FormControl> */}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6} spacing={4}>
        <AppGraficoPizza chartData={PIZZA_CHART} />
      </Grid>
    </Grid>
  );
};

export default FormDetailVoucher;
