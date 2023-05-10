// material
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import { AppAreaInstalled, AppCurrentDownload } from 'components/_dashboard/general-app';
import moment from 'moment';
// import SelectDateRange from 'pages/report/components/SelectDateRange';
import { useQuery } from 'react-query';
import { Role } from 'utils/role';
import Page from '../../components/Page';
import { DatePickerField } from 'components/form';
import { FormProvider, useForm } from 'react-hook-form';
import storeApi from 'api/store';
import { fNumber } from 'utils/formatNumber';
import { AnalyticsConversionRates } from 'components/_dashboard/general-analytics';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  useSettings();
  const { user } = useAuth();
  if (user?.role.includes(Role.StoreManager)) {
  }

  // const [options, setOptions] = useState('TODAY');
  // const dateRange = () => {
  //   switch (options) {
  //     case 'TODAY':
  //       return [
  //         moment(moment().startOf('day')).format('YYYY-MM-DD HH:mm:ss'),
  //         moment(moment()).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
  //       ];
  //     case '7_DAYS':
  //       return [
  //         moment(moment().startOf('day').add(-7, 'days')).format('YYYY-MM-DD HH:mm:ss'),
  //         moment(moment().startOf('day')).format('YYYY-MM-DD HH:mm:ss')
  //       ];
  //     case 'PREV_WEEK':
  //       return [
  //         moment().startOf('week').subtract(6, 'days').format('YYYY-MM-DD HH:mm:ss'),
  //         moment()
  //           .endOf('week')
  //           .subtract(6, 'days')
  //           .add(1, 'day')
  //           .startOf('day')
  //           .format('YYYY-MM-DD HH:mm:ss')
  //       ];
  //     case 'PREV_MONTH':
  //       return [
  //         moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
  //         moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
  //       ];
  //     case '30_DAYS':
  //       return [
  //         moment(moment().add(-30, 'days').startOf('days')).format('YYYY-MM-DD HH:mm:ss'),
  //         moment(moment().startOf('days')).format('YYYY-MM-DD HH:mm:ss')
  //       ];
  //     case '90_DAYS':
  //       return [
  //         moment(moment().add(-90, 'days').startOf('days')).format('YYYY-MM-DD HH:mm:ss'),
  //         moment(moment().startOf('days')).format('YYYY-MM-DD HH:mm:ss')
  //       ];
  //     default:
  //       return [
  //         moment(moment().startOf('day')).format('YYYY-MM-DD HH:mm:ss'),
  //         moment(moment()).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
  //       ];
  //   }
  // };
  const filterForm = useForm({
    defaultValues: {
      size: 10000,
      page: 1,
      startDate: moment.now(),
      endDate: moment.now()
    }
  });

  const transformdata = (data: any) => {
    const { startDate, endDate, size, page } = data;
    return {
      page: page,
      size: size,
      startDate: moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment(endDate).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    };
  };

  const params = filterForm.watch();

  const { data: report } = useQuery(
    ['orders', user, params],
    () =>
      storeApi.getStoreReport(user?.storeId ?? '', transformdata(params)).then((res) => res.data),
    {
      refetchOnWindowFocus: false
    }
  );
  console.log('dateRange', filterForm.watch());
  console.log('report', report);
  return (
    <Page title={user?.role.includes(Role.StoreManager) ? 'Báo cáo tổng quan' : ''}>
      <Grid container spacing={2}>
        {user?.role.includes(Role.StoreManager) && (
          <>
            <Grid item xs={12} md={12}>
              <FormProvider {...filterForm}>
                <Stack direction="row" spacing={1}>
                  <DatePickerField size="small" name="startDate" label="Từ ngày" />
                  <DatePickerField size="small" name="endDate" label="Đến ngày" />
                </Stack>
              </FormProvider>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Đơn hoàn thành</Typography>
                  <Typography variant="h4">{fNumber(report?.totalOrder ?? 0)}</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Doanh thu</Typography>

                  <Typography variant="h4">{fNumber(report?.finalAmount ?? 0)}đ</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Chi phí SP</Typography>
                  <Typography variant="h4">{fNumber(report?.productCosAmount ?? 0)}đ</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Lợi nhuận</Typography>

                  <Typography variant="h4">{fNumber(report?.totalRevenue ?? 0)}đ</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <AppCurrentDownload
                title="Loại đơn hàng "
                totalInStore={report?.totalOrderInStore ?? 0}
                totalTakeAway={report?.totalOrderTakeAway ?? 0}
                totalDelivery={report?.totalOrderDeli ?? 0}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <AppAreaInstalled
                title="Biểu đồ đơn hàng theo giờ"
                timeline={report?.timeLine ?? []}
                orderTimeLine={report?.totalOrderTimeLine ?? []}
                amountTimeLine={report?.totalAmountTimeLine ?? []}
              />
            </Grid>
            {report?.categoryReports
              .sort((a, b) => b.totalProduct - a.totalProduct)
              .map((item) => (
                <Grid key={item.id} item xs={12} md={6} lg={6}>
                  <AnalyticsConversionRates category={item} />
                </Grid>
              ))}
          </>
        )}
      </Grid>
    </Page>
  );
}
