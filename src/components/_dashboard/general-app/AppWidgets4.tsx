import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import castFill from '@iconify/icons-eva/cast-fill';
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
  backgroundColor: '#00bcd4'
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

// const TOTAL = 'GIỜ';
// const CHART_DATA = [44];

export default function AppWidgets4() {
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
    <RootStyle sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#4dd0e1' } }}>
      <ReactApexChart type="radialBar" options={chartOptions} width={86} height={86} />
      <Box sx={{ ml: 3, color: 'common.white', cursor: 'pointer' }}>
        {/* <Typography variant="h4" sx={{ marginLeft: '-110px' }}></Typography>   */}
        <Typography variant="h6" sx={{ opacity: 0.72, marginLeft: '-110px' }}>
          DRAFT PROMOTION
        </Typography>
        <Typography variant="h3" sx={{ marginLeft: '-110px', p: '20px' }}>
          1
        </Typography>
      </Box>
      <IconStyle icon={castFill} />
    </RootStyle>
  );
}
