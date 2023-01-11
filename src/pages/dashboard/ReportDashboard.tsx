// material
import { Grid } from '@mui/material';
// hooks
// components
import dashboardFill from '@iconify/icons-ant-design/dashboard-fill';
import clockOuline from '@iconify/icons-eva/clock-outline';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import trendingUp from '@iconify/icons-eva/trending-up-fill';
import DashboarWidgets from 'components/_dashboard/general-app/DashboarWidgets';
import { useParams } from 'react-router-dom';
import { PATH_REPORT_APP } from 'routes/reportAppPaths';
import palette from 'theme/palette';
import Page from '../../components/Page';
// ----------------------------------------------------------------------

export default function ReportDashboard() {
  const { storeId } = useParams();
  const PATH_REPORT = PATH_REPORT_APP(storeId ?? '0');
  const Widgets = [
    {
      title: 'TỔNG QUAN',
      icon: dashboardFill,
      color: palette.light.reportPalette.green3,
      hoverColor: palette.light.reportPalette.green4,
      path: PATH_REPORT.overviewDate
    },
    {
      title: 'THỜI GIAN',
      icon: clockOuline,
      color: palette.light.reportPalette.green5,
      hoverColor: palette.light.reportPalette.green6,
      path: PATH_REPORT.dayReport
    },
    {
      title: 'SẢN PHẨM',
      icon: shoppingBagFill,
      color: palette.light.reportPalette.yellow3,
      hoverColor: palette.light.reportPalette.yellow4,
      path: PATH_REPORT.productSale
    },
    {
      title: 'DIỄN TIẾN NGÀY',
      icon: trendingUp,
      color: palette.light.reportPalette.red3,
      hoverColor: palette.light.reportPalette.red4,
      path: PATH_REPORT.productProgress
    }
    // {
    //   title: 'SO SÁNH SẢN PHẨM',
    //   icon: repeatFill,
    //   color: palette.light.reportPalette.blue3,
    //   hoverColor: palette.light.reportPalette.blue4,
    //   path: PATH_REPORT.productProgress
    // },
    // {
    //   title: 'SO SÁNH DOANH THU',
    //   icon: peopleFill,
    //   color: palette.light.reportPalette.purple3,
    //   hoverColor: palette.light.reportPalette.purple4,
    //   path: PATH_REPORT.productProgress
    // }
  ];
  return (
    <Page title="Dashboard">
      <Grid container spacing={3}>
        {Widgets?.map((item) => (
          <Grid key={item.title} item xs={12} md={4}>
            <DashboarWidgets Widget={item} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
