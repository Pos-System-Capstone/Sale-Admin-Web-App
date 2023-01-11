// material
import { Stack, Typography } from '@mui/material';
// hooks
// components
import { Box } from '@mui/system';
import Page from 'components/Page';
import { useState } from 'react';
import { useParams } from 'react-router';
import SelectDateRange from '../components/SelectDateRange';
// import TopCustomerFeedback from './components/TopCustomerFeedback';

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

  const KeyTrcolumn = [
    { title: 'Tổng doanh thu', dataIndex: 'grossSales' },
    { title: 'Số tiền giao dịch trung bình', dataIndex: 'avgTransactionAmount' },
    { title: 'Doanh thu thuần từ phiếu mua hàng', dataIndex: 'netSales' }
  ];

  return (
    <Page title="Trang chủ">
      <Stack direction={'column'} spacing={3}>
        <Stack direction={'row'} sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4">Thông tin chi tiết về doanh nghiệp</Typography>
            <Typography variant="body2">
              Dựa trên dữ liệu ngày {yesterday.getDate()}/{yesterday.getMonth() + 1}
            </Typography>
          </Box>
          <Box>
            <SelectDateRange value={options} onChange={setOptions} showOptionDateRange={false} />
          </Box>
        </Stack>

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
