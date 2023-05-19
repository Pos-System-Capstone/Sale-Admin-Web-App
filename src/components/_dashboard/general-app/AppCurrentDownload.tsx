import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, TextField } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import { useState } from 'react';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important' as 'relative',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export interface Props {
  title: string;
  totalInStore: number;
  totalTakeAway: number;
  totalDelivery: number;
  totalInStoreAmount: number;
  totalTakeAwayAmount: number;
  totalDeliveryAmount: number;
}

export default function AppCurrentDownload(props: Props) {
  const theme = useTheme();
  const [seriesData, setSeriesData] = useState(0);

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(Number(event.target.value));
  };
  const CHART_DATA_PIE = [
    {
      day: 'Tổng đơn hàng',
      value: 0,
      data: [
        props.totalInStore,
        props.totalTakeAway,
        props.totalDelivery
        // { name: 'Hôm qua', data: listOrderByHour(props.yesterdayOrder) }
      ]
    },
    {
      day: 'Tổng doanh thu',
      value: 1,
      data: [
        props.totalInStoreAmount,
        props.totalTakeAwayAmount,
        props.totalDeliveryAmount
        // { name: 'Hôm qua', data: listOrderAmountByHour(props.yesterdayOrder) }
      ]
    }
  ];
  const CHART_DATA = [props.totalInStore, props.totalTakeAway, props.totalDelivery];
  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.error.main],
    labels: ['Tại quán', 'Mang đi', 'Giao hàng'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: string) => fNumber(seriesName),
        title: {
          formatter: (seriesName: string) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            value: {
              formatter: (val: number | string) => fNumber(val)
            },
            total: {
              formatter: (w: { globals: { seriesTotals: number[] } }) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              }
            }
          }
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader
        title={props.title}
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
            {CHART_DATA_PIE.map((option) => (
              <option key={option.value} value={option.value}>
                {option.day}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA_PIE.map(
        (item) =>
          item.value === seriesData && (
            <ChartWrapperStyle dir="ltr">
              <ReactApexChart type="donut" series={item.data} options={chartOptions} height={320} />
            </ChartWrapperStyle>
          )
      )}
      {/* <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle> */}
    </Card>
  );
}
