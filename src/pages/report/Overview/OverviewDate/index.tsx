/* eslint-disable camelcase */
import React, { useState } from 'react';
// material
import { DatePicker, DateRange, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab, TextField } from '@mui/material';
// components
import moment from 'moment';
import ReportPage from 'pages/report/components/ReportPage';
import TopStoreRevenue from '../components/TopStoreRevenue';

export default function OverviewDate() {
  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<DateRange<Date>>([yesterday, yesterday]);
  const [done, setDone] = useState(true);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <ReportPage
      title={`Báo cáo tổng quan`}
      actions={[
        <DatePicker
          inputFormat="dd/MM/yyyy"
          renderInput={(params) => <TextField {...params} />}
          minDate={moment(`${today.getFullYear()}/${today.getMonth()}/01`).toDate()}
          // disabled={loading}
          disableCloseOnSelect
          disableFuture
          value={dateRange[0]}
          onChange={(e) => {
            if (e) {
              setDateRange([e, e]);
            }
          }}
          onOpen={() => setDone(false)}
          onClose={() => setDone(true)}
          key="date-range"
        />
      ]}
    >
      <Card sx={{ paddingBottom: 5 }}>
        <TabContext value={activeTab}>
          <Box mb={2}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Tổng quan doanh thu" value="1" />
              <Tab label="Top doanh thu cửa hàng" value="2" />
              {/* <Tab label="Chi tiết doanh thu sản phẩm" value="3" /> */}
              {/* <Tab label="Thống kê nhân viên" value="4" /> */}
            </TabList>
          </Box>

          <TabPanel value="2">
            <TopStoreRevenue dateRange={dateRange} />
          </TabPanel>

          {/* <TabPanel value="3">
            <ProductSaleDetail />
          </TabPanel> */}

          {/* <TabPanel value="4">
            <EmployeeStatistics />
          </TabPanel> */}
        </TabContext>
      </Card>
    </ReportPage>
  );
}
