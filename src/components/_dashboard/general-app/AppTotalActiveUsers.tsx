import { ApexOptions } from 'apexcharts';

// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
import { TOrder } from 'types/order';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

// const PERCENT = 2.6;

export interface Props {
  title: string;
  todayOrder: TOrder[];
}

export default function AppTotalActiveUsers(props: Props) {
  const theme = useTheme();
  // const CHART_DATA = [{ data: [TOTAL_YESTERDAY_ORDER, TOTAL_TODAY_ORDER] }];
  const chartOptions: ApexOptions = {
    colors: [theme.palette.primary.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    labels: ['Hôm qua', 'Hôm nay'],
    tooltip: {
      x: { show: true },
      y: {
        formatter: (seriesName: number | string) => fNumber(seriesName),

        title: {
          formatter: (seriesName: number | string) => `Đơn hàng:`
        }
      },
      marker: { show: true }
    }
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{props.title}</Typography>
        {/* <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <IconWrapperStyle
            sx={{
              ...(PERCENT < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {PERCENT > 0 && '+'}
            {fPercent(PERCENT)}
          </Typography>
        </Stack> */}

        <Typography variant="h3">
          {fNumber(props.todayOrder !== undefined ? props.todayOrder.length : 0)}
        </Typography>
      </Box>

      {/* <ReactApexChart
        type="bar"
        series={CHART_DATA}
        options={chartOptions}
        width={60}
        height={36}
      /> */}
    </Card>
  );
}
