import { Stack } from '@mui/material';
import { useState } from 'react';
import SelectDateRange from '../components/SelectDateRange';

function Sales() {
  const [options, setOptions] = useState();
  console.log(options);
  return (
    <Stack direction={'column'}>
      <SelectDateRange onChange={setOptions} value={options} />
    </Stack>
  );
}

export default Sales;
