import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HomeIcon from '@mui/icons-material/Home';
import { Backdrop, Box, Card, Grid, Stack, Typography } from '@mui/material';
import LoadingScreen from 'components/LoadingScreen';
import ReactApexChart from 'react-apexcharts';
import { useParams } from 'react-router';
import palette from 'theme/palette';
import TableCard, { MiniTableCard } from '../components/TableCard';
import config from './config';

function RevenueOverview({
  dateRange,
  done,
  setLoading,
  loading,
  revenueData,
  isFetched1,
  isFetching1,
  paymentData,
  isFetched2,
  isFetching2
}: any) {
  const { storeId } = useParams();

  if (isFetched1 && isFetched2) {
    setLoading(false);
  }
  if (isFetching1 || isFetching2) {
    setLoading(true);
  }

  // Chart
  const actualRevenueChart = {
    series: [
      revenueData?.totalRevenueAtStore,
      revenueData?.totalRevenueTakeAway,
      revenueData?.totalRevenueDelivery
    ],
    chartOptions: {
      legend: { show: true, fontSize: '16px' },
      labels: ['Tại cửa hàng', 'Mang về', 'Giao hàng'],
      colors: [
        palette.light.reportPalette.red1,
        palette.light.reportPalette.darkGreen1,
        palette.light.reportPalette.yellow1
      ]
    }
  };

  const billOfSaleChart = {
    series: [
      revenueData?.totalOrderAtStore,
      revenueData?.totalOrderTakeAway,
      revenueData?.totalOrderDelivery
    ],
    chartOptions: {
      legend: { show: true, fontSize: '16px' },
      labels: ['Tại cửa hàng', 'Mang về', 'Giao hàng'],
      colors: [
        palette.light.reportPalette.red1,
        palette.light.reportPalette.darkGreen1,
        palette.light.reportPalette.yellow1
      ]
    }
  };

  return (
    <Stack spacing={4} minHeight="50vh">
      <Stack spacing={4}>
        {/* I. Bán hàng */}
        <Stack spacing={2}>
          <Typography pl={2} variant="h4">
            I. Bán hàng
          </Typography>

          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TableCard
                  title="Tổng doanh thu bán hàng"
                  subtitle="Đơn vị (VNĐ)"
                  bc="reportPalette.green1"
                  bch="reportPalette.green2"
                  column={config.totalSalesRevenue}
                  data={revenueData!}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TableCard
                  title="Tổng số hóa đơn bán hàng"
                  subtitle="Đơn vị (Hóa đơn)"
                  bc="reportPalette.blue1"
                  bch="reportPalette.blue2"
                  column={config.totalSalesInvoice}
                  data={revenueData!}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>

        {/* II. Nạp thẻ */}
        <Stack spacing={2}>
          <Typography pl={2} variant="h4">
            II. Nạp thẻ
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TableCard
                  title="Tổng doanh thu nạp thẻ"
                  subtitle="Đơn vị (VNĐ)"
                  bc="reportPalette.green1"
                  bch="reportPalette.green2"
                  column={config.TotalRevenueCardRecharge}
                  data={revenueData!}
                />
              </Grid>
              <Grid item xs={6}>
                <TableCard
                  title="Tổng số hóa đơn nạp thẻ"
                  subtitle="Đơn vị (Hóa đơn)"
                  bc="reportPalette.blue1"
                  bch="reportPalette.blue2"
                  column={config.totalBillOfCard}
                  data={revenueData!}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>

        {/* III. Thành phần doanh thu*/}
        <Stack spacing={2}>
          <Typography pl={2} variant="h4">
            III. Thành phần doanh thu
          </Typography>

          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <MiniTableCard
                  title="Doanh thu"
                  subtitle="Đơn vị (VNĐ)"
                  bc="reportPalette.pine1"
                  bch="reportPalette.darkGreen2"
                  column={config.totalRevenue}
                  data={revenueData!}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <MiniTableCard
                  title="Tổng hóa đơn"
                  subtitle="Đơn vị(Hóa đơn)"
                  bc="reportPalette.blue1"
                  bch="reportPalette.blue2"
                  column={config.totalBill}
                  data={revenueData!}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <MiniTableCard
                  title="Bình Quân hóa đơn"
                  subtitle="VNĐ/Hoá đơn"
                  bc="reportPalette.green1"
                  bch="reportPalette.green2"
                  column={config.averageBill}
                  data={revenueData!}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <MiniTableCard
                  title="Bình quân sản phẩm"
                  subtitle="Sản phẩm/Hoá đơn"
                  bc="reportPalette.yellow1"
                  bch="reportPalette.yellow2"
                  column={config.averageProduct}
                  data={revenueData!}
                />
              </Grid>
            </Grid>
          </Box>

          <Box pt={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <Box p={1} py={2}>
                    <Typography textAlign="center" variant="h4">
                      Doanh thu thực tế
                    </Typography>
                  </Box>
                  <ReactApexChart
                    options={actualRevenueChart.chartOptions}
                    series={actualRevenueChart.series}
                    type="pie"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <Box p={1} py={2}>
                    <Typography textAlign="center" variant="h4">
                      Hóa đơn bán hàng
                    </Typography>
                  </Box>
                  <ReactApexChart
                    options={billOfSaleChart.chartOptions}
                    series={billOfSaleChart.series}
                    type="pie"
                  />
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Box pt={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TableCard
                  smallCard={true}
                  title={<HomeIcon />}
                  subtitle="Tại cửa hàng"
                  bc="reportPalette.red1"
                  bch="reportPalette.red2"
                  column={config.atStore}
                  data={revenueData!}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TableCard
                  smallCard={true}
                  title={<BusinessCenterIcon />}
                  subtitle="Mang về"
                  bc="reportPalette.darkGreen1"
                  bch="reportPalette.darkGreen2"
                  column={config.takeAway}
                  data={revenueData!}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TableCard
                  smallCard={true}
                  title={<DeliveryDiningIcon />}
                  subtitle="Giao hàng"
                  bc="reportPalette.yellow1"
                  bch="reportPalette.yellow2"
                  column={config.delivery}
                  data={revenueData!}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TableCard
                  smallCard={true}
                  title={<CancelIcon />}
                  subtitle="Hóa đơn hủy"
                  bc="reportPalette.green1"
                  bch="reportPalette.green2"
                  column={config.cancel}
                  data={revenueData!}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Stack>

      {/* IV. Thanh Toán & Thu Ngân*/}

      <Stack spacing={2}>
        <Typography pl={2} variant="h4">
          IV. Thanh Toán & Thu Ngân
        </Typography>

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TableCard
                title="Tổng thanh toán"
                subtitle="(1) + (2) + (3) + (4) + (5) + (6)| Đơn vị (VNĐ)"
                bc="reportPalette.purple1"
                bch="reportPalette.purple2"
                column={config.totalPayment}
                data={paymentData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TableCard
                title="Tổng lượt thanh toán"
                subtitle="(1) + (2) + (3) + (4) + (5) + (6)| Đơn vị (Hóa đơn)"
                bc="reportPalette.blue1"
                bch="reportPalette.blue2"
                column={config.totalAmountPayment}
                data={paymentData}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <Backdrop open={loading} invisible={true}>
        <LoadingScreen sx={{ backgroundColor: 'transparent' }} />
      </Backdrop>
    </Stack>
  );
}

export default RevenueOverview;
