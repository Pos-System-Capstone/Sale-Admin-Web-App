// material
import { Box, Grid, Stack, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import orderApi from 'api/order';
import {
  AppAreaInstalled,
  AppCurrentDownload,
  AppTotalActiveUsers,
  AppTotalDownloads,
  AppTotalInstalled,
  AppWelcome
} from 'components/_dashboard/general-app';
import moment from 'moment';
// import SelectDateRange from 'pages/report/components/SelectDateRange';
import { useQuery } from 'react-query';
import { Role } from 'utils/role';
import Page from '../../components/Page';
import { DatePickerField } from 'components/form';
import { FormProvider, useForm } from 'react-hook-form';

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

  const { data: orders } = useQuery(
    ['orders', user, params],
    () =>
      orderApi
        .getListOrder(user?.storeId ?? '', transformdata(params))
        .then((res) => res.data.items),
    {
      refetchOnWindowFocus: false
    }
  );
  console.log('dateRange', filterForm.watch());
  console.log('orders', orders);
  return (
    <Page title={user?.role.includes(Role.StoreManager) ? 'Báo cáo tổng quan' : ''}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <AppWelcome displayName={user?.displayName} />
        </Grid>{' '}
        {user?.role.includes(Role.StoreManager) && (
          <>
            <Grid item xs={12} md={12}>
              <Stack
                direction={'column'}
                sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}
              >
                <Box>
                  <Typography variant="h4">Thông tin chi tiết về cửa hàng</Typography>
                  {/* <Typography variant="body2">
                    Dựa trên dữ liệu ngày {dateRange()[0]} đến {dateRange()[1]}
                  </Typography> */}
                </Box>
                <Box>
                  <FormProvider {...filterForm}>
                    <Stack direction="row" spacing={1}>
                      <DatePickerField size="small" name="startDate" label="Từ ngày" />
                      <DatePickerField size="small" name="endDate" label="Đến ngày" />
                    </Stack>
                  </FormProvider>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <AppTotalActiveUsers title="Tổng đơn hàng" todayOrder={orders} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AppTotalDownloads
                title="Tổng đơn hàng hoàn thành"
                todayOrder={orders !== undefined ? orders : []}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <AppTotalInstalled
                title="Tổng doanh thu"
                todayOrder={orders !== undefined ? orders : []}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <AppCurrentDownload
                title="Loại đơn hàng "
                todayOrder={orders !== undefined ? orders : []}
              />
            </Grid>

            <Grid item xs={12} md={8} lg={8}>
              <AppAreaInstalled
                title="Biểu đồ đơn hàng theo giờ"
                todayOrder={orders !== undefined ? orders : []}
              />
            </Grid>
          </>
        )}
        {/* {user?.role.includes(Role.StoreManager) && (
          <Grid item xs={12} lg={12}>
            <AppNewInvoice />
          </Grid>
        )} */}
        {/* <Grid item xs={12} md={6} lg={4}>
          <AppTopAuthors />
        </Grid> */}
      </Grid>
    </Page>
  );
}
