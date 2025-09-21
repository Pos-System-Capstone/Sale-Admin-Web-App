/* eslint-disable camelcase */
import activityFill from '@iconify/icons-eva/activity-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import clockIcon from '@iconify/icons-eva/clock-fill';
// import { Icon } from '@iconify/react';
import { DateRangePicker, TabContext, TabList, TabPanel } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// material
import { Card, Stack, Tab, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
// import { TTradingBase } from '@types/report/trading';
import tradingApi from 'api/report/trading';
// import ModalForm from 'components/ModalForm/ModalForm';
import ResoTable from 'components/ResoTable/ResoTable';
import MenuWidgets from 'components/_dashboard/general-app/MenuWidgets';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router-dom';
import { PATH_REPORT_APP } from 'routes/reportAppPaths';

import { TTableColumn } from 'types/table';
import { parseParams } from 'utils/axios';
import { formatDate } from 'utils/formatTime';
import ReportBtn from '../components/ReportBtn';
import ReportPage from '../components/ReportPage';
// import Page from './components/Page';

export const menuColumns: TTableColumn<any>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    hideInSearch: true
  },
  {
    fixed: 'left',
    title: 'Khoảng thời gian',
    valueType: 'select',
    valueEnum: [
      {
        label: 'Hôm nay',
        value: true
      },
      {
        label: 'Tuần này',
        value: false
      },
      {
        label: 'Tuần trước',
        value: false
      },
      {
        label: 'Tháng này',
        value: false
      },
      {
        label: 'Tháng trước',
        value: false
      },
      {
        label: 'Tuỳ chọn',
        value: false
      }
    ]
  },
  {
    title: 'Mang đi',
    dataIndex: 'totalOrderTakeAway',
    hideInSearch: true,
    valueType: 'digit'
  },
  {
    title: 'Tại store',
    dataIndex: 'totalOrderAtStore',
    hideInSearch: true,
    valueType: 'digit'
  },
  {
    title: 'Giao hàng',
    dataIndex: 'totalOrderDelivery',
    hideInSearch: true,
    valueType: 'digit'
  },
  {
    title: 'Cửa hàng',
    dataIndex: 'storeName',
    hideInSearch: true
  },
  {
    title: 'Tổng số bill',
    dataIndex: 'totalBills',
    hideInSearch: true,
    valueType: 'digit'
  },
  {
    title: 'Tổng doanh thu',
    dataIndex: 'totalSales',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Tiền giảm giá',
    dataIndex: 'totalDiscount',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Tổng doanh thu sau giảm giá',
    dataIndex: 'totalSalesAfterDiscount',
    hideInSearch: true,
    valueType: 'money'
  }
  // {
  //   title: 'Phiên bản (Version)',
  //   hideInSearch: true
  //   // dataIndex: 'saleRevenue',
  // },
  // {
  //   title: 'Ngày cập nhật (Updated at)',
  //   hideInSearch: true
  //   // dataIndex: 'saleRevenue',
  // }
];

const TimeReport = () => {
  const tableRef = useRef<any>();
  const ref = useRef<any>();
  const { storeId } = useParams();
  const PATH_REPORT = PATH_REPORT_APP(storeId ?? '0');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const [activeTab, setActiveTab] = useState('1');

  const ChartFill = {
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: [
          '0:00 - 1:00',
          '1:00 - 2:00',
          '2:00 - 3:00',
          '3:00 - 4:00',
          '4:00 - 5:00',
          '5:00 - 6:00',
          '6:00 - 7:00',
          '7:00 - 8:00',
          '8:00 - 9:00',
          '9:00 - 10:00',
          '10:00 - 11:00',
          '11:00 - 12:00',
          '12:00 - 13:00',
          '13:00 - 14:00',
          '14:00 - 15:00',
          '15:00 - 16:00',
          '16:00 - 17:00',
          '17:00 - 18:00',
          '18:00 - 19:00',
          '19:00 - 20:00',
          '20:00 - 21:00',
          '21:00 - 22:00',
          '22:00 - 23:00',
          '23:00 - 24:00'
        ]
      }
    },
    series: [
      {
        name: 'Mang đi',
        data: [
          0, 0, 0, 0, 0, 1, 241, 1096, 1425, 301, 439, 221, 469, 305, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
      },
      {
        name: 'Tại store',
        data: [
          0, 0, 0, 0, 0, 1, 109, 615, 749, 541, 351, 243, 403, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
      },
      {
        name: 'Giao hàng',
        data: [0, 0, 0, 0, 0, 0, 4, 21, 34, 17, 17, 7, 10, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  };

  const Feature = [
    {
      title: 'GIỜ',
      icon: clockIcon,
      color: '#FAD02C',
      hoverColor: '#B47324',
      path: PATH_REPORT.timeReport
    },
    {
      title: 'THỨ',
      icon: activityFill,
      color: '#189AB4',
      hoverColor: '#05445E',
      path: PATH_REPORT.dateReport
    },
    {
      title: 'NGÀY',
      icon: alertCircleFill,
      color: '#76B947',
      hoverColor: '#2F5233',
      path: PATH_REPORT.dayReport
    },
    {
      title: 'THÁNG',
      icon: alertTriangleFill,
      color: '#C197D2',
      hoverColor: '#613659',
      path: PATH_REPORT.monthReport
    }
  ];

  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<any>([yesterday, yesterday]);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      tableRef.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  return (
    <ReportPage
      title="Báo cáo doanh thu theo ngày"
      actions={[
        <DateRangePicker
          inputFormat="dd/MM/yyyy"
          minDate={moment(`${today.getFullYear()}/${today.getMonth()}/01`).toDate()}
          disableFuture
          disableCloseOnSelect
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
          key="date-range"
        />
      ]}
    >
      <Box sx={{ width: '100%', paddingBottom: '20px' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Feature.map((item) => (
            <Grid key={item.title} item xs={3}>
              <MenuWidgets Features={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Card>
        <TabContext value={activeTab}>
          <Box>
            <TabList onChange={handleChangeTab}>
              <Tab label="Báo cáo doanh thu" value="1" />
              <Tab label="Sơ đồ doanh thu" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack spacing={2}>
              <Box sx={{ paddingTop: '40px' }}>
                <ResoTable
                  showAction={false}
                  rowKey="trading_id"
                  ref={tableRef}
                  getData={tradingApi.getTrading}
                  columns={menuColumns}
                  pagination
                  toolBarRender={() => [
                    <ReportBtn
                      key="export-excel"
                      onClick={() =>
                        window.open(
                          `${
                            process.env.REACT_APP_REPORT_BASE_URL
                          }/system-report/export?${parseParams(
                            ref.current.formControl.getValues()
                          )}`
                        )
                      }
                    />
                  ]}
                  scroll={{ y: '500px' }}
                />
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Grid container rowSpacing={1}>
              <Grid item>
                <Chart
                  options={ChartFill.options}
                  series={ChartFill.series}
                  type="line"
                  width="1100"
                  height="500"
                />
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default TimeReport;
