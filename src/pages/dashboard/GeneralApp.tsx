// material
import { Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  AppAreaInstalled,
  AppCurrentDownload,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopInstalledCountries,
  AppTopRelated,
  AppTotalActiveUsers,
  AppTotalDownloads,
  AppTotalInstalled,
  AppWelcome
} from 'components/_dashboard/general-app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <AppWelcome displayName={user?.displayName} />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppFeatured />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppTotalActiveUsers />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppTotalInstalled />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppTotalDownloads />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentDownload />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppAreaInstalled />
        </Grid>

        <Grid item xs={12} lg={8}>
          <AppNewInvoice />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTopRelated />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTopInstalledCountries />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTopAuthors />
        </Grid>

        {/* <Grid item xs={12}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={4}>
              <AppWidgets1 />
            </Grid>
            <Grid item xs={4}>
              <AppWidgets2 />
            </Grid>
            <Grid item xs={4}>
              <AppWidgets3 />
            </Grid>
            <Grid item xs={4}>
              <AppWidgets4 />
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Page>
  );
}
