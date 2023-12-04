import styled from '@emotion/styled';
import {
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  ToggleButton,
  Stack
} from '@mui/material';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AppGraficoPizza from './AppGraficoPizza';
import { Box } from '@mui/system';
import { DataSaverOn } from '@mui/icons-material';

interface Props {}

const PIZZA_CHART = {
  series: [4344, 5435, 1443],
  labelsData: ['Đã sử dụng', 'Chưa sử dụng', 'Còn lại']
};

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

const FormDetailVoucher = (props: Props) => {
  const [age, setAge] = React.useState('');
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };
  const [alignment, setAlignment] = useState('discount');
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} spacing={1}>
        <Paper elevation={3} sx={{ height: '325.98px' }}>
          <Stack direction="row" justifyContent="space-between" sx={{ gap: 2 }}>
            <Typography variant="h6">Giảm 100% cho sản phẩm Bông lan trứng muối</Typography>
            <Box>
              <Button
                startIcon={<DataSaverOn />}
                size="small"
                variant="contained"
                sx={{ width: '120px', height: '40px', fontSize: 15 }}
              >
                Cập nhật
              </Button>
            </Box>
          </Stack>
          <Box sx={{ pt: '15px' }}>
            <FormControl fullWidth>
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
            </FormControl>
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
