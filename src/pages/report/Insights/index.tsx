import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab, Grid } from '@mui/material';
import { useState } from 'react';
import ReportPage from '../components/ReportPage';
import Sales from './Sales';
import homeApi from 'api/report/insight';
import { useQuery } from 'react-query';
import KeyTrend from '../Home/components/KeyTrends';
import { useParams } from 'react-router';
import InsightsChart from './components/TransactionChart';
import { fDate } from 'utils/formatTime';
const Insights = () => {
  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const [options, setOptions] = useState('PREV_WEEK');
  const [store, setStore] = useState(null);
  const { storeId } = useParams();
  const { data: summaryData } = useQuery(
    ['summary', { store }],
    () => homeApi.getSummary({ storeId: storeId == '0' ? store : storeId }).then((res) => res.data),
    { refetchOnWindowFocus: false, enabled: true }
  );
  const { data: insightsData } = useQuery(
    ['insights', { options, store }],
    () =>
      homeApi
        .getInsights({ storeId: storeId == '0' ? store : storeId, duration: options })
        .then((res) => res.data),
    { refetchOnWindowFocus: false, enabled: true }
  );
  const KeyTrcolumn = [
    { title: 'Tổng doanh thu', dataIndex: 'grossSales' },
    { title: 'Doanh thu thuần từ phiếu mua hàng', dataIndex: 'netSales' },
    { title: 'Tổng đơn hàng', dataIndex: 'totalOrders' },
    { title: 'Số tiền giao dịch trung bình', dataIndex: 'averageTransactionAmount' }
  ];

  return (
    <ReportPage title={`Insights`}>
      <Card sx={{ paddingBottom: 5 }}>
        <TabContext value={activeTab}>
          <Box mb={2}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Sales" value="1" />
              <Tab label="Menu" value="2" />
              <Tab label="Feedback" value="3" />
              <Tab label="Customers" value="4" />
              <Tab label="Operations" value="5" />
              <Tab label="Offers" value="6" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Sales onDateRangeChange={setOptions} />
            <br></br>
            <Box>
              <Grid container item spacing={2}>
                <Grid item md={4} xs={12}>
                  <Grid item xs={12} md={12} height={'100%'} style={{ order: 1 }}>
                    <KeyTrend column={KeyTrcolumn} data={insightsData} />
                  </Grid>
                </Grid>
                <Grid item container md={8} spacing={2}>
                  <Grid item xs={12} md={12}>
                    {/* <TransactionChart data={businessInsightsData} /> */}
                    <InsightsChart
                      key={'1'}
                      title="Tổng doanh thu"
                      listKey={
                        insightsData === undefined
                          ? []
                          : insightsData!.grossSalesDashboard.map((x: any) => fDate(x.date))
                      }
                      listValue={
                        insightsData === undefined
                          ? []
                          : insightsData!.grossSalesDashboard.map((x: any) => x.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {/* <TransactionChart data={businessInsightsData} /> */}
                    <InsightsChart
                      key={'2'}
                      title="Số tiền giao dịch trung bình"
                      listKey={
                        insightsData === undefined
                          ? []
                          : insightsData!.numberOfTransactionsDashboard.map((x: any) =>
                              fDate(x.date)
                            )
                      }
                      listValue={
                        insightsData === undefined
                          ? []
                          : insightsData!.numberOfTransactionsDashboard.map((x: any) => x.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {/* <TransactionChart data={businessInsightsData} /> */}
                    <InsightsChart
                      key={'3'}
                      title="Doanh thu thuần từ phiếu mua hàng"
                      listKey={
                        insightsData === undefined
                          ? []
                          : insightsData!.netSalesDashboard.map((x: any) => fDate(x.date))
                      }
                      listValue={
                        insightsData === undefined
                          ? []
                          : insightsData!.netSalesDashboard.map((x: any) => x.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {/* <TransactionChart data={businessInsightsData} /> */}
                    <InsightsChart
                      key={'4'}
                      title=" Tổng quan về số tiền giao dịch trung bình"
                      listKey={
                        insightsData === undefined
                          ? []
                          : insightsData!.avgTransactionAmountDashboard.map((x: any) =>
                              fDate(x.date)
                            )
                      }
                      listValue={
                        insightsData === undefined
                          ? []
                          : insightsData!.avgTransactionAmountDashboard.map((x: any) => x.value)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value="2">Hello 2</TabPanel>
          <TabPanel value="3">Hello 3</TabPanel>
          <TabPanel value="4">Hello 4</TabPanel>
          <TabPanel value="5">Hello 5</TabPanel>
          <TabPanel value="6">Hello 6</TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default Insights;
