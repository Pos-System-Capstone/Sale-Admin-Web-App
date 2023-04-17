import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import { OrderType, TOrder } from 'types/order';

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
  todayOrder: TOrder[];
}

export default function AppCurrentDownload(props: Props) {
  const theme = useTheme();

  const TOTAL_PAID_ORDER = props.todayOrder.reduce(
    (acc: any, cur: TOrder) => (cur.orderType === OrderType.EATIN ? (acc += 1) : (acc += 0)),
    0
  );
  const TOTAL_PENDING_ORDER = props.todayOrder.reduce(
    (acc: any, cur: TOrder) => (cur.orderType === OrderType.TAKE_AWAY ? (acc += 1) : (acc += 0)),
    0
  );
  const TOTAL_CANCLE_ORDER = props.todayOrder.reduce(
    (acc: any, cur: TOrder) => (cur.orderType === OrderType.DELIVERY ? (acc += 1) : (acc += 0)),
    0
  );
  const CHART_DATA = [TOTAL_PAID_ORDER, TOTAL_PENDING_ORDER, TOTAL_CANCLE_ORDER];
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
          formatter: (seriesName: string) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
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
      <CardHeader title={props.title} />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
