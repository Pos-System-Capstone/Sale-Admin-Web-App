import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { merge } from 'lodash';

// ----------------------------------------------------------------------

export interface Props {
  title: string;
  timeline: number[];
  orderTimeLine: number[];
  amountTimeLine: number[];
}

export default function AppAreaInstalled(props: Props) {
  const [seriesData, setSeriesData] = useState(0);

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(Number(event.target.value));
  };

  const CHART_DATA = [
    {
      day: 'Tổng đơn hàng',
      value: 0,
      data: [
        {
          name: 'Số đơn',
          data: props.orderTimeLine
        }
        // { name: 'Hôm qua', data: listOrderByHour(props.yesterdayOrder) }
      ]
    },
    {
      day: 'Tổng doanh thu',
      value: 1,
      data: [
        {
          name: 'Doanh thu',
          data: props.amountTimeLine
        }
        // { name: 'Hôm qua', data: listOrderAmountByHour(props.yesterdayOrder) }
      ]
    }
  ];
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: props.timeline.map((item) => {
        return item.toString().concat('h');
      })
    },
    yaxis: [
      {
        labels: {
          formatter: function (val: number) {
            return val.toFixed(0);
          }
        }
      }
    ]
  });

  return (
    <Card>
      <CardHeader
        title={props.title}
        subheader="Bao gồm tổng đơn và tổng doanh thu cho đơn hàng đã hoành thành"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': {
                pl: 1,
                py: 0.5,
                pr: '24px !important',
                typography: 'subtitle2'
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0.75,
                bgcolor: 'background.neutral'
              },
              '& .MuiNativeSelect-icon': {
                top: 4,
                right: 0,
                width: 20,
                height: 20
              }
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.value} value={option.value}>
                {option.day}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.value} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.value === seriesData && (
            <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
