// material
import { Grid, Container, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  AnalyticsTasks,
  AnalyticsNewUsers,
  AnalyticsBugReports,
  AnalyticsItemOrders,
  AnalyticsNewsUpdate,
  AnalyticsWeeklySales,
  AnalyticsOrderTimeline,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsCurrentSubject
} from '../../components/_dashboard/general-analytics';
import { useQuery } from 'react-query';
import brandApi from 'api/brand';

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  const params = {
    size: 1000,
    page: 1
  };
  const { data: brands } = useQuery(['brands', params], () =>
    brandApi.get(params).then((res) => res.data.items)
  );

  console.log('brands', brands);
  return (
    <Page title="Báo cáo tổng hợp">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Chào mừng bạn đến với trang quản trị hệ thống
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWeeklySales title="Thương hiệu" brands={brands ?? []} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsNewUsers title="Cửa hàng" brands={brands ?? []} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsItemOrders />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
