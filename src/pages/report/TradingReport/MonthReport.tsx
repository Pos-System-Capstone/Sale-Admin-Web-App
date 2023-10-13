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
import ResoReportTable from 'components/ResoReportTable/ResoReportTable';
import MenuWidgets from 'components/_dashboard/general-app/MenuWidgets';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router-dom';
import { PATH_REPORT_APP } from 'routes/reportAppPaths';
import { TTradingBase } from 'types/report/trading';
import { TTableColumn } from 'types/table';
import { parseParams } from 'utils/axios';
import { formatDate } from 'utils/formatTime';
import ReportBtn from '../components/ReportBtn';
import ReportPage from '../components/ReportPage';
// import Page from './components/Page';

export const menuColumns: TTableColumn<TTradingBase>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    hideInSearch: true
  },
  {
    fixed: 'left',
    title: 'Tháng',
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

const MonthReport = () => {
  const tableRef = useRef<any>();
  const ref = useRef<any>();
  const { storeId } = useParams();
  const PATH_REPORT = PATH_REPORT_APP(storeId ?? '0');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const [activeTab, setActiveTab] = useState('1');

  const ChartFill = {
    series: [
      {
        name: 'Mang đi',
        data: [139260, 124435, 171075, 179795, 185100, 134483, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'Tại store',
        data: [60744, 63131, 90132, 105611, 112283, 89058, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'Giao hàng',
        data: [3897, 2711, 4203, 4113, 4230, 3405, 0, 0, 0, 0, 0, 0]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10
        }
      },
      xaxis: {
        categories: [
          'Tháng 1',
          'Tháng 2',
          'Tháng 3',
          'Tháng 4',
          'Tháng 5',
          'Tháng 6',
          'Tháng 7',
          'Tháng 8',
          'Tháng 9',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12'
        ]
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    }
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
      title={'Báo cáo doanh thu theo tháng'}
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
                <ResoReportTable
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
                  // options={ChartFill.options}
                  series={ChartFill.series}
                  type="bar"
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

export default MonthReport;
