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

import useSettings from '../../hooks/useSettings';
// components
import { AppAreaInstalled } from 'components/_dashboard/general-app';
import moment from 'moment';
// import SelectDateRange from 'pages/report/components/SelectDateRange';
import { useQuery } from 'react-query';
import { Role } from 'utils/role';
import Page from '../../components/Page';
import { DatePickerField } from 'components/form';
import { FormProvider, useForm } from 'react-hook-form';

import { fCurrencyVN, fNumber } from 'utils/formatNumber';
import { AnalyticsCurrentVisits } from 'components/_dashboard/general-analytics';
import TimeRangeChart from 'components/_dashboard/general-app/TimeRangeChart';

import AutocompleteStore from 'components/form/common/AutoCompleteStore';
import brandApi from 'api/brand';
import useAuth from 'hooks/useAuth';
import { getUserInfo } from 'utils/utils';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  useSettings();
  const { user } = useAuth();
  const userRaw = getUserInfo();
  const userInfo: any = JSON.parse(userRaw ?? '{}');
  const filterForm = useForm({
    defaultValues: {
      startDate: moment.now(),
      endDate: moment.now(),
      storeCode: user?.role.includes(Role.StoreManager) ? user.storeCode : 'ALL',
      brandCode: user?.brandCode
    }
  });

  const transformdata = (data: any) => {
    const { startDate, endDate, brandCode, storeCode } = data;
    return {
      startDate: moment(startDate).startOf('day').format('YYYY-MM-DD'),
      endDate: moment(endDate).startOf('day').format('YYYY-MM-DD'),
      brandCode,
      storeCode: storeCode === 'ALL' ? null : storeCode
    };
  };

  const params = filterForm.watch();

  const { data: report } = useQuery(
    ['orders', user, params],
    () => brandApi.getBrandReport(transformdata(params)).then((res) => res.data),
    {
      refetchOnWindowFocus: false
    }
  );
  return (
    <Page title={'Báo cáo tổng quan'}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <FormProvider {...filterForm}>
            <Stack direction="row" spacing={1}>
              <DatePickerField size="small" name="startDate" label="Từ ngày" />
              <DatePickerField size="small" name="endDate" label="Đến ngày" />
              <AutocompleteStore
                disabled={user?.role.includes(Role.StoreManager)}
                disableClearable={true}
                name="storeCode"
                isExtra={false}
              />
            </Stack>
          </FormProvider>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Đơn hoàn thành(6)</Typography>
              <Typography variant="h4">{fNumber(report?.totalOrder ?? 0)}</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Sản phẩm đã bán</Typography>
              <Typography variant="h4">{fNumber(report?.totalProduct ?? 0)}</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Khuyến mãi đã dùng</Typography>
              <Typography variant="h4">{fNumber(report?.totalPromotionUsed ?? 0)}</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Bình quân hoá đơn(5)=(3)/(6)</Typography>

              <Typography variant="h4">{fNumber(report?.averageBill ?? 0)}đ</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Doanh thu trước giảm(1)</Typography>

              <Typography variant="h4">{fNumber(report?.totalAmount ?? 0)}đ</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Giảm giá(2)</Typography>

              <Typography variant="h4">{fNumber(report?.totalDiscount ?? 0)}đ</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Giảm giá sản phẩm(2.1)</Typography>
              <Typography variant="h4">{fNumber(report?.totalProductDiscount ?? 0)}đ</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Chương trình khuyến mãi(2.2)</Typography>
              <Typography variant="h4">{fNumber(report?.totalPromotionDiscount ?? 0)}đ</Typography>
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
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Chi phí sản phẩm(4)</Typography>
              <Typography variant="h4">{fNumber(report?.productCosAmount ?? 0)}đ</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Lợi nhuận(5)=(3)-(4)</Typography>
              <Typography variant="h4">{fNumber(report?.totalRevenue ?? 0)}đ</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsCurrentVisits
            title="Loại đơn hàng "
            totalOrder={[
              report?.totalOrderInStore ?? 0,
              report?.totalOrderTakeAway ?? 0,
              report?.totalOrderDeli ?? 0,
              report?.totalOrderTopUp ?? 0
            ]}
            totalOrderAmount={[
              report?.inStoreAmount ?? 0,
              report?.takeAwayAmount ?? 0,
              report?.deliAmount ?? 0,
              report?.topUpAmount ?? 0
            ]}
            listName={['Tại quán', 'Mang đi', 'Giao hàng', 'Nạp thẻ']}
            filterTitle={['Doanh thu', 'Số lượng đơn']}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsCurrentVisits
            title={'Hình thức thanh toán'}
            totalOrder={[
              report?.totalCash ?? 0,
              report?.totalBanking ?? 0,
              report?.totalMomo ?? 0,
              report?.totalGrabFood ?? 0,
              report?.totalShopeeFood ?? 0,
              report?.totalBeFood ?? 0,
              report?.totalVisa ?? 0,
              report?.totalPointify ?? 0
            ]}
            totalOrderAmount={[
              report?.cashAmount ?? 0,
              report?.bankingAmount ?? 0,
              report?.momoAmount ?? 0,
              report?.grabFoodAmount ?? 0,
              report?.shopeeFoodAmount ?? 0,
              report?.beFoodAmount ?? 0,
              report?.visaAmount ?? 0,
              report?.pointifyAmount ?? 0
            ]}
            listName={[
              'Tiền mặt',
              'Ngân hàng',
              'Momo',
              'GrabFood',
              'ShopeeFood',
              'Befood',
              'Visa/MasterCard',
              'Ví thành viên'
            ]}
            filterTitle={['Doanh thu', 'Số lượng đơn']}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsCurrentVisits
            title={'Danh mục sản phẩm'}
            totalOrder={
              report?.categoryReports
                ?.sort((a, b) => b.totalAmount - a.totalAmount)
                .map((item) => item.totalProduct) ?? []
            }
            totalOrderAmount={
              report?.categoryReports
                ?.sort((a, b) => b.totalAmount - a.totalAmount)
                .map((item) => item.totalAmount) ?? []
            }
            listName={
              report?.categoryReports
                ?.sort((a, b) => b.totalAmount - a.totalAmount)
                .map((item) => item.name) ?? []
            }
            filterTitle={['Doanh thu sản phẩm', 'Số lượng sản phẩm']}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsCurrentVisits
            title={'Kích cỡ sản phẩm'}
            totalOrder={[report?.totalSizeS ?? 0, report?.totalSizeM ?? 0, report?.totalSizeL ?? 0]}
            totalOrderAmount={[
              report?.totalAmountSizeS ?? 0,
              report?.totalAmountSizeM ?? 0,
              report?.totalAmountSizeL ?? 0
            ]}
            listName={['Size S', 'Size M', 'Size L']}
            filterTitle={['Doanh thu sản phẩm', 'Số lượng sản phẩm']}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <AppAreaInstalled
            title="Biểu đồ đơn hàng theo giờ"
            timeline={report?.timeLine ?? []}
            orderTimeLine={report?.totalOrderTimeLine ?? []}
            amountTimeLine={report?.totalAmountTimeLine ?? []}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TimeRangeChart
            title="Biểu đồ đơn hàng theo nhóm giờ "
            timeline={report?.timeLine ?? []}
            orderTimeLine={report?.totalOrderTimeLine ?? []}
            amountTimeLine={report?.totalAmountTimeLine ?? []}
          />
        </Grid>
        {report?.categoryReports
          .sort((a, b) => b.totalProduct - a.totalProduct)
          .map((item) => (
            <Grid key={item.id} item xs={12} md={6} lg={6}>
              <AnalyticsCurrentVisits
                title={item.name}
                totalOrder={
                  item.productReports
                    ?.sort((a, b) => b.totalAmount - a.totalAmount)
                    .map((item) => item.quantity) ?? []
                }
                totalOrderAmount={
                  item.productReports
                    ?.sort((a, b) => b.totalAmount - a.totalAmount)
                    .map((item) => item.finalAmount) ?? []
                }
                listName={
                  item.productReports
                    ?.sort((a, b) => b.totalAmount - a.totalAmount)
                    .map((item) => item.name) ?? []
                }
                filterTitle={['Số lượng sản phẩm', 'Doanh thu sản phẩm']}
              />
            </Grid>
          ))}
        {report?.categoryReports
          .sort((a, b) => b.totalProduct - a.totalProduct)
          .map((item) => (
            <Grid key={item.id} item xs={12} md={12} lg={12}>
              <Card>
                <CardHeader
                  title={`${item.name}  -  ${item.totalProduct} SP  -  Trước giảm:${fCurrencyVN(
                    item.totalAmount
                  )}đ  -  Giảm giá:${fCurrencyVN(item.totalDiscount)}đ  -  Sau giảm:${fCurrencyVN(
                    item.finalAmount
                  )}đ`}
                />
                <Divider />
                <CardContent>
                  <TableContainer>
                    <Table aria-label="fixerd products table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Sản phẩm</TableCell>
                          <TableCell align="center">Số lượng</TableCell>
                          <TableCell align="center">Doanh thu trước giảm</TableCell>
                          <TableCell align="center">Giảm giá</TableCell>
                          <TableCell align="center">Doanh thu sau giảm</TableCell>
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
                              <TableCell align="center">{data.totalAmount}</TableCell>
                              <TableCell align="center">{data.totalDiscount}</TableCell>
                              <TableCell align="center">{data.finalAmount}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          ))}

        <Grid item xs={12} md={12} lg={12}>
          <Card>
            <CardHeader title={' Báo cáo chương trình khuyến mãi  '} />
            <Divider />
            <CardContent>
              <TableContainer>
                <Table aria-label="fixerd products table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Khuyến mãi</TableCell>
                      <TableCell align="center">Số lượng</TableCell>
                      <TableCell align="center">Giảm giá</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {report?.promotionReports
                      .sort((a, b) => b.totalDiscount - a.totalDiscount)
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
                          <TableCell align="center">{data.totalDiscount}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
}
