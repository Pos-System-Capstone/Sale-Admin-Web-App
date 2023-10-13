import React, { useState } from 'react';
import { Stack } from '@mui/material';
import SelectDateRange from '../components/SelectDateRange';

interface SalesProps {
  onDateRangeChange: (newOptions: any) => void;
}

const Sales: React.FC<SalesProps> = ({ onDateRangeChange }) => {
  const [options, setOptions] = useState<any>(null);

  const handleDateRangeChange = (newOptions: any) => {
    setOptions(newOptions);
    onDateRangeChange(newOptions);
  };

  return (
    <Stack direction={'column'}>
      <SelectDateRange onChange={handleDateRangeChange} value={options} />
    </Stack>
  );
};

export default Sales;
