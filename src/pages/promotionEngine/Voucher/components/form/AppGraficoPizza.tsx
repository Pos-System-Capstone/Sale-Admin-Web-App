import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card } from '@mui/material';
// utils
import { fNumber } from 'utils/formatNumber';
//
import { BaseOptionChart } from 'components/charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 270;
const LEGEND_HEIGHT = 40;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(3),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

interface AppGraficoPizzaProps {
  chartData: {
    series: any[];
    labelsData: string[];
  };
}

const AppGraficoPizza: React.FC<AppGraficoPizzaProps> = ({ chartData }) => {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.error.main, theme.palette.primary.main, theme.palette.warning.main],
    labels: chartData.labelsData,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: number) => fNumber(seriesName)
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={chartData.series} options={chartOptions} height={250} />
      </ChartWrapperStyle>
    </Card>
  );
};

export default AppGraficoPizza;
