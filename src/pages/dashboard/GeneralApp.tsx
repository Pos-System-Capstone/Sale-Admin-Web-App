// material
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
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
import { fCurrencyVN, fNumber } from 'utils/formatNumber';
import { AnalyticsCurrentVisits } from 'components/_dashboard/general-analytics';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  useSettings();
  const { user } = useAuth();
  if (user?.role.includes(Role.StoreManager)) {
  }

  const filterForm = useForm({
    defaultValues: {
      startDate: moment.now(),
      endDate: moment.now()
    }
  });

  const transformdata = (data: any) => {
    const { startDate, endDate } = data;
    return {
      startDate: moment(startDate).startOf('day').format('YYYY-MM-DD'),
      endDate: moment(endDate).startOf('day').format('YYYY-MM-DD')
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
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Đơn hoàn thành(6)</Typography>
                  <Typography variant="h4">{fNumber(report?.totalOrder ?? 0)}</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Sản phẩm đã bán</Typography>
                  <Typography variant="h4">{fNumber(report?.totalProduct ?? 0)}</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Bình quân hoá đơn(5)=(3)/(6)</Typography>

                  <Typography variant="h4">{fNumber(report?.averageBill ?? 0)}đ</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Doanh thu trước giảm giá(1)</Typography>

                  <Typography variant="h4">{fNumber(report?.totalAmount ?? 0)}đ</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Giảm giá(2)</Typography>

                  <Typography variant="h4">{fNumber(report?.totalDiscount ?? 0)}đ</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Doanh thu thực tế(3)=(1)-(2)</Typography>

                  <Typography variant="h4">{fNumber(report?.finalAmount ?? 0)}đ</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Chi phí SP(4)</Typography>
                  <Typography variant="h4">{fNumber(report?.productCosAmount ?? 0)}đ</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Lợi nhuận(5)=(3)-(4)</Typography>

                  <Typography variant="h4">{fNumber(report?.totalRevenue ?? 0)}đ</Typography>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <AppCurrentDownload
                title="Loại đơn hàng "
                totalInStore={report?.totalOrderInStore ?? 0}
                totalTakeAway={report?.totalOrderTakeAway ?? 0}
                totalDelivery={report?.totalOrderDeli ?? 0}
                totalInStoreAmount={report?.inStoreAmount ?? 0}
                totalTakeAwayAmount={report?.takeAwayAmount ?? 0}
                totalDeliveryAmount={report?.deliAmount ?? 0}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <AnalyticsCurrentVisits />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
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
                <Grid key={item.id} item xs={12} md={12} lg={12}>
                  <Card>
                    <CardHeader
                      title={`${item.name} - ${item.totalProduct} Sp -  ${fCurrencyVN(
                        item.totalAmount
                      )} đ`}
                    />
                    <Divider />
                    <CardContent>
                      <TableContainer>
                        <Table aria-label="fixerd products table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Sản phẩm</TableCell>
                              <TableCell align="center">Số lượng</TableCell>
                              <TableCell align="center">Doanh thu</TableCell>
                              <TableCell align="center">Giảm giá</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {item.productReports
                              .sort((a, b) => b.totalAmount - a.totalAmount)
                              .map((data, idx) => (
                                <TableRow key={idx}>
                                  <TableCell align="left">
                                    <Box display="flex" justifyContent="space-between">
                                      <Stack direction="row" spacing={2} alignItems="center">
                                        <Typography noWrap>{data.name}</Typography>
                                      </Stack>
                                    </Box>
                                  </TableCell>
                                  <TableCell align="center">{data.quantity}</TableCell>
                                  <TableCell align="center">
                                    {fCurrencyVN(data.totalAmount)} đ
                                  </TableCell>
                                  <TableCell align="center">
                                    {fCurrencyVN(data.totalDiscount)} đ
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            {/* {report?.categoryReports
              .sort((a, b) => b.totalProduct - a.totalProduct)
              .map((item) => (
                <Grid key={item.id} item xs={12} md={6} lg={6}>
                  <AnalyticsConversionRates category={item} />
                </Grid>
              ))} */}
          </>
        )}
      </Grid>
    </Page>
  );
}
