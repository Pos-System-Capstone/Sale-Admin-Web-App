import { forEach, merge } from 'lodash';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { OrderStatus, TOrder } from 'types/order';

// ----------------------------------------------------------------------

export interface Props {
  title: string;
  todayOrder: TOrder[];
}

export default function AppAreaInstalled(props: Props) {
  const [seriesData, setSeriesData] = useState(0);

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(Number(event.target.value));
  };
  const listOrderByHour = (listOrder: TOrder[]) => {
    const listOrderTime = [];
    for (let index = 6; index < 24; index++) {
      let count: number = 0;
      forEach(listOrder, (order) => {
        const time = new Date(order.endDate).getHours();
        if (time === index && order.status === OrderStatus.PAID) {
          count++;
        }
      });
      listOrderTime.push(count);
    }
    console.log('listOrderTime', listOrderTime);
    return listOrderTime;
  };

  const listOrderAmountByHour = (listOrder: TOrder[]) => {
    const listOrderTime = [];
    for (let index = 6; index < 24; index++) {
      let count: number = 0;
      forEach(listOrder, (order: TOrder) => {
        const time = new Date(order.endDate).getHours();
        if (time === index && order.status === OrderStatus.PAID) {
          count += order.finalAmount;
        }
      });
      listOrderTime.push(count);
    }
    return listOrderTime;
  };

  const CHART_DATA = [
    {
      day: 'Tổng đơn hàng',
      value: 0,
      data: [
        {
          name: 'Số đơn',
          data: listOrderByHour(props.todayOrder)
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
          data: listOrderAmountByHour(props.todayOrder)
        }
        // { name: 'Hôm qua', data: listOrderAmountByHour(props.yesterdayOrder) }
      ]
    }
  ];
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: [
        '6h',
        '7h',
        '8h',
        '9h',
        '10h',
        '11h',
        '12h',
        '13h',
        '14h',
        '15h',
        '16',
        '17h',
        '18h',
        '19h',
        '20h',
        '21h',
        '22h',
        '23h'
      ]
    }
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
