/* eslint-disable camelcase */
import React, { useState } from 'react';
// material
import { DateRange, DateRangePicker, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab, TextField } from '@mui/material';
// components
import moment from 'moment';
import ReportPage from 'pages/report/components/ReportPage';
import TopStoreRevenue from '../components/TopStoreRevenue';

export default function OverviewMonth() {
  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<DateRange<Date>>([
    moment(`${today.getFullYear()}/${today.getMonth() + 1}/01`).toDate(),
    yesterday
  ]);
  const [done, setDone] = useState(true);
  const [loading, setLoading] = useState(true);

  return (
    <ReportPage
      title={`Báo cáo tổng quan`}
      actions={[
        <DateRangePicker
          inputFormat="dd/MM/yyyy"
          minDate={moment(`${today.getFullYear()}/${today.getMonth()}/01`).toDate()}
          // disabled={loading}
          disableCloseOnSelect
          disableFuture
          value={dateRange}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} label="Từ" />
              <Box sx={{ mx: 2 }}> - </Box>
              <TextField {...endProps} label="Đến" />
            </>
          )}
          onChange={(e) => {
            if (e[0] && e[1]) {
              setDateRange(e);
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
