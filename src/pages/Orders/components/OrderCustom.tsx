import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { ORDER_STATUS_OPTONS, PAYMENT_TYPE_OPTIONS } from 'types/order';

interface OrderCustomProps {
  title: 'Trạng thái' | 'Phương thức thanh toán';
  data: string;
  widthCustom: string;
  onValueChange: (data: any) => void;
}

const OrderCustom = ({ title, widthCustom, data, onValueChange }: OrderCustomProps) => {
  const options = title === 'Trạng thái' ? ORDER_STATUS_OPTONS : PAYMENT_TYPE_OPTIONS;

  console.log(options);

  const [data1, setData1] = useState(data);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    console.log(newValue);
    setData1(newValue);

    onValueChange(newValue);
  };

  return (
    <>
      <Box
        sx={{
          width: `${widthCustom}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle2" noWrap>
          {title}:
        </Typography>
        <FormControl>
          <Select
            value={data1}
            onChange={handleChange}
            label={title}
            sx={{
              minWidth: 180,
              height: '30px',
              fontSize: '14px',
              border: 'none',
              outline: 'none',
              '&:focus': {
                border: 'none',
                outline: 'none'
              }
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default OrderCustom;
