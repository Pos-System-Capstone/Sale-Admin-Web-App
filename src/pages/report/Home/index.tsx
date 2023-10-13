// material
import { FormControl, Grid, InputLabel, MenuItem, Stack, Typography } from '@mui/material';
// hooks
// components
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import homeApi from 'api/report/home';
import Page from 'components/Page';
import useStore from 'hooks/report/useStore';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import SelectDateRange from '../components/SelectDateRange';
import KeyTrend from './components/KeyTrends';
import NetSale from './components/NetSale';
// import TopCustomerFeedback from './components/TopCustomerFeedback';
import TopPerformingStore from './components/TopPerformingStore';
import TopSellingItem from './components/TopSellingItem';
import { TotalSaleCard } from './components/TotalSaleCard';

import TransactionChart from './components/TransactionChart';

// ----------------------------------------------------------------------

export default function HomeReport() {
  const [store, setStore] = useState(null);
  const handleChange = (event: any) => {
    setStore(event.target.value);
  };

  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);

  const trends = {
    total_transaction: '00:18:45',
    gross_sales: '1.31396e+08',
    net_sales: '1.31396e+08',
    average_transaction_amount: '118695.5736',
    total_customers: '827'
  };
  const [options, setOptions] = useState('PREV_WEEK');
  const { storeId } = useParams();
  const { data: storeData } = useStore();
  const { data: summaryData } = useQuery(
    ['summary', { store }],
    () => homeApi.getSummary({ storeId: storeId == '0' ? store : storeId }).then((res) => res.data),
    { refetchOnWindowFocus: false, enabled: true }
  );
  const { data: businessInsightsData } = useQuery(
    ['business_insights', { options, store }],
    () =>
      homeApi
        .getBusinessInsights({ storeId: storeId == '0' ? store : storeId, duration: options })
        .then((res) => res.data),
    { refetchOnWindowFocus: false, enabled: true }
  );

  const KeyTrcolumn = [
    { title: 'Tổng doanh thu', dataIndex: 'grossSales' },
    { title: 'Số tiền giao dịch trung bình', dataIndex: 'avgTransactionAmount' },
    { title: 'Doanh thu thuần từ phiếu mua hàng', dataIndex: 'netSales' }
  ];

  return (
    <Page title="Trang chủ">
      <Stack direction={'column'} spacing={3}>
        {storeId == '0' && (
          <FormControl sx={{ width: '250px' }}>
            <InputLabel id="Store">Store</InputLabel>
            <Select labelId="Store" id="Store" value={store} label="Store" onChange={handleChange}>
              {storeData?.map((x: any) => (
                <MenuItem key={x.id} value={x.id}>
                  {x.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <TotalSaleCard data={summaryData} />

        <Stack direction={'row'} sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4">Thông tin chi tiết về doanh nghiệp</Typography>
            <Typography variant="body2">
              Dựa trên dữ liệu ngày {yesterday.getDate()}/{yesterday.getMonth() + 1}
            </Typography>
          </Box>
          <Box>
            <SelectDateRange value={options} onChange={setOptions} showOptionDateRange={true} />
          </Box>
        </Stack>

        <Box>
          <Grid container item spacing={2}>
            <Grid item container md={8} spacing={2}>
              <Grid item xs={12} md={'auto'}>
                <NetSale data={businessInsightsData} />
              </Grid>
              <Grid item xs={12} md={12}>
                <TransactionChart data={businessInsightsData} />
              </Grid>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid item xs={12} md={12} height={'100%'} width={'100%'}>
                <KeyTrend column={KeyTrcolumn} data={businessInsightsData} />
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} md={4}>
              <TopPerformingStore data={businessInsightsData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TopSellingItem data={businessInsightsData} />
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <TopCustomerFeedback />
            </Grid> */}
          </Grid>
        </Box>

        {/* <Grid item xs={12} md={4}>
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
        </Grid> */}
      </Stack>
    </Page>
  );
}
