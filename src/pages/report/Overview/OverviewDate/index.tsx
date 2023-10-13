/* eslint-disable camelcase */
import React, { useState } from 'react';
// material
import { DateRange, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
// components
import moment from 'moment';
import ReportPage from 'pages/report/components/ReportPage';
import RevenueOverview from '../components/RevenueOverview';
import TopStoreRevenue from '../components/TopStoreRevenue';
import EmployeeStatistics from '../components/EmployeeStatistics';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import revenueApi from 'api/report/revenue';
import SelectDateRange from 'pages/report/components/SelectDateRange';
import { formatDate } from 'utils/formatTime';
type FetchParams = {
  storeId: string | null | undefined;
  FromDate?: string;
  ToDate?: string;
  duration?: string;
};

export default function OverviewDate() {
  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);

  const [dateRange, setDateRange] = useState<DateRange<Date>>([
    moment(`${today.getFullYear()}/${today.getMonth() + 1}/01`).toDate(),
    today
  ]);

  const [done, setDone] = useState(true);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const [options, setOptions] = useState('PREV_WEEK');
  const { storeId } = useParams();
  const [store, setStore] = useState(null);

  const defaultFilters = {
    fetchParams: {} as FetchParams
  };

  if (Array.isArray(options) && options.length === 2) {
    defaultFilters.fetchParams.FromDate = formatDate(options[0]);
    defaultFilters.fetchParams.ToDate = formatDate(options[1]);
  } else {
    defaultFilters.fetchParams.duration = options;
  }

  const {
    data: revenueData,
    isFetched: isFetched1,
    isFetching: isFetching1
  } = useQuery(
    ['revenue', { options, store }],
    () => {
      let fetchParams = defaultFilters.fetchParams;
      return revenueApi.getRevenueOverview(fetchParams).then((res) => res.data);
    },
    { refetchOnWindowFocus: false, enabled: true }
  );

  const {
    data: paymentData,
    isFetched: isFetched2,
    isFetching: isFetching2
  } = useQuery(
    'payment',
    () => {
      let fetchParams = defaultFilters.fetchParams;

      return revenueApi.getPaymentOverview(fetchParams).then((res) => res.data);
    },
    { refetchOnWindowFocus: false, enabled: true }
  );

  return (
    <ReportPage
      title={`Báo cáo tổng quan`}
      actions={[
        <>
          <Box>
            <SelectDateRange
              key="day-range"
              value={options}
              onChange={setOptions}
              showOptionDateRange={true}
            />
          </Box>
        </>
      ]}
    >
      <Card sx={{ paddingBottom: 5 }}>
        <TabContext value={activeTab}>
          <Box mb={2}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Tổng quan doanh thu" value="1" />
              <Tab label="Top doanh thu cửa hàng" value="2" />
              {/* <Tab label="Chi tiết doanh thu sản phẩm" value="3" /> */}
              <Tab label="Thống kê nhân viên" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <RevenueOverview
              revenueData={revenueData}
              paymentData={paymentData}
              isFetched1={isFetched1}
              isFetching1={isFetching1}
              isFetched2={isFetched2}
              isFetching2={isFetching2}
              dateRange={dateRange}
              done={done}
              loading={loading}
              setLoading={setLoading}
            />
          </TabPanel>

          <TabPanel value="2">
            <TopStoreRevenue defaultFilters={defaultFilters} dateRange={dateRange} />
          </TabPanel>

          <TabPanel value="3">
            <EmployeeStatistics />
          </TabPanel>

          {/* <TabPanel value="4">
            <EmployeeStatistics />
          </TabPanel> */}
        </TabContext>
      </Card>
    </ReportPage>
  );
}
