import styled from '@emotion/styled';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  ToggleButton
} from '@mui/material';
import useLocales from 'hooks/useLocales';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AppGraficoPizza from './AppGraficoPizza';

interface Props {}
interface PercentageChartProps {
  percentage: number;
}
const PIZZA_CHART = {
  title: 'Gráfico em Pizza',
  series: [4344, 5435, 1443, 4443],
  labelsData: ['A', 'B', 'C', 'D']
};

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
  const { t } = useLocales();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} spacing={2}>
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardContent>
              Action type: Discount percent of Item
              <Typography variant="h6">Giảm 100% cho sản phẩm Bông lan trứng muối</Typography>
            </CardContent>
            <CardActions>
              <Stack>
                <Button variant="contained" sx={{ width: '120px', height: '40px', fontSize: 15 }}>
                  Cập nhật
                </Button>
              </Stack>
            </CardActions>
          </Box>
          <CardActions>
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
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={6} spacing={4}>
        <AppGraficoPizza chartData={PIZZA_CHART} />
      </Grid>
    </Grid>
  );
};

export default FormDetailVoucher;
