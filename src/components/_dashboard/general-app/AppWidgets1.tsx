import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import calendarFill from '@iconify/icons-eva/calendar-fill';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
// import { fNumber } from '../../../utils/formatNumber';
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: '#aa0a0a'
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white
}));

// ----------------------------------------------------------------------

const TOTAL = 38566;
const CHART_DATA = [44];

export default function AppWidgets1() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '78%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.palette.common.white,
            fontSize: theme.typography.subtitle2.fontSize
          }
        }
      }
    }
  });

  return (
    <RootStyle sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#F51720' } }}>
      <ReactApexChart type="radialBar" options={chartOptions} width={86} height={86} />
      <Box sx={{ ml: 3, color: 'common.white', cursor: 'pointer' }}>
        <Typography variant="h6" sx={{ opacity: 0.72, marginLeft: '-110px' }}>
          TOTAL PROMOTION
        </Typography>
        <Typography variant="h3" sx={{ marginLeft: '-110px', p: '20px' }}>
          2
        </Typography>
      </Box>
      <IconStyle icon={calendarFill} />
    </RootStyle>
  );
}
