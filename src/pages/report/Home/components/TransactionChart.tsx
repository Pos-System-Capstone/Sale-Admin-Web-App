import { Box, Card, CardHeader } from '@mui/material';
import { BaseOptionChart } from 'components/charts';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { fDate } from 'utils/formatTime';
// ----------------------------------------------------------------------

export default function TransactionChart({ data }: any) {
  const valueOrders = data?.orders.map((x: any) => x.value);
  const dateOrders = data?.orders.map((x: any) => fDate(x.date));

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: dateOrders
    }
  });

  return (
    <Card>
      <CardHeader
        title="Số lượng giao dịch"
        // subheader="+13.66% from previous"
        // action={
        //   <TextField
        //     select
        //     fullWidth
        //     value={data?.topSellingItem}
        //     SelectProps={{ native: true }}
        //     sx={{
        //       '& fieldset': { border: '0 !important' },
        //       '& select': {
        //         pl: 1,
        //         py: 0.5,
        //         pr: '24px !important',
        //         typography: 'subtitle2'
        //       },
        //       '& .MuiOutlinedInput-root': {
        //         borderRadius: 0.75,
        //         bgcolor: 'background.neutral'
        //       },
        //       '& .MuiNativeSelect-icon': {
        //         top: 4,
        //         right: 0,
        //         width: 20,
        //         height: 20
        //       }
        //     }}
        //   >
        //     <option value={data?.topSellingItem}>{data?.topSellingItem}</option>
        //   </TextField>
        // }
      />

      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={[{ name: 'Số lượng', data: valueOrders }]}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
