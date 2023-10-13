/* eslint-disable camelcase */
import activityFill from '@iconify/icons-eva/activity-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import clockIcon from '@iconify/icons-eva/clock-fill';
// import { Icon } from '@iconify/react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// material
import { Card, Stack, Tab } from '@mui/material';
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
import { DateRange } from '@mui/lab';
import SelectDateRange from 'pages/report/components/SelectDateRange';
// import Page from './components/Page';
interface FetchParams {
  storeId: string | null | undefined;
  FromDate?: string;
  ToDate?: string;
  duration?: string;
}
export const menuColumns: TTableColumn<TTradingBase>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    hideInSearch: true
  },
  // {
  //   fixed: 'left',
  //   title: 'Thứ',
  //   valueType: 'select',
  //   valueEnum: [
  //     {
  //       label: 'Tuần này',
  //       value: false
  //     },
  //     {
  //       label: 'Tuần trước',
  //       value: false
  //     },
  //     {
  //       label: 'Tháng này',
  //       value: false
  //     },
  //     {
  //       label: 'Tháng trước',
  //       value: false
  //     },
  //     {
  //       label: 'Tuỳ chọn',
  //       value: false
  //     }
  //   ]
  // },
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

const DateReport = () => {
  const defaultFilters = {
    fetchParams: {} as FetchParams
  };
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
        categories: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật']
      }
    },
    series: [
      {
        name: 'Mang đi',
        data: [6668, 6651, 6444, 5113, 0, 0, 0]
      },
      {
        name: 'Tại store',
        data: [3887, 4001, 4221, 3280, 0, 0, 0]
      },
      {
        name: 'Giao hàng',
        data: [189, 178, 150, 126, 0, 0, 0]
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
  const [dateRange, setDateRange] = useState<DateRange<Date>>([
    moment(`${today.getFullYear()}/${today.getMonth() + 1}/01`).toDate(),
    today
  ]);
  const [options, setOptions] = useState('PREV_WEEK');
  const { FromDate, ToDate, duration } = defaultFilters.fetchParams;
  // State lưu giá trị hiện tại
  const [fromDate, setFromDate] = useState(FromDate);
  const [toDate, setToDate] = useState(ToDate);
  const [toDuration, setToDuration] = useState(duration);
  // console.log(toDuration);

  if (Array.isArray(options) && options.length === 2) {
    defaultFilters.fetchParams.FromDate = formatDate(options[0]);
    defaultFilters.fetchParams.ToDate = formatDate(options[1]);
  } else {
    defaultFilters.fetchParams.duration = options;
  }
  // Xử lý ref
  useEffect(() => {
    if (ref.current) {
      if (ref.current.formControl.setValue) {
        if (toDuration) {
          ref.current.formControl.setValue('duration', toDuration);
          ref.current.formControl.setValue('fromDate', null);
          ref.current.formControl.setValue('toDate', null);
        } else {
          ref.current.formControl.setValue('fromDate', fromDate);
          ref.current.formControl.setValue('toDate', toDate);
          ref.current.formControl.setValue('duration', null);
        }
      }
    }
  }, [toDuration, fromDate, toDate]);

  useEffect(() => {
    setToDuration(defaultFilters.fetchParams.duration);
  }, [defaultFilters]);
  // Xử lý khi defaultFilters thay đổi
  useEffect(() => {
    setFromDate(defaultFilters.fetchParams.FromDate);
    setToDate(defaultFilters.fetchParams.ToDate);
  }, [defaultFilters]);

  // Xử lý khi dateRange thay đổi
  useEffect(() => {
    if (dateRange && dateRange[0]) {
      setFromDate(dateRange[0].toString()); // Assuming dateRange[0] is a Date object
    }
    if (dateRange && dateRange[1]) {
      setToDate(dateRange[1].toString()); // Assuming dateRange[1] is a Date object
    }
  }, [dateRange]);

  const isSystemRole = storeId == '0';

  return (
    <ReportPage
      title="Báo cáo doanh thu theo ngày"
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
                  ref={ref}
                  getData={tradingApi.getTrading}
                  columns={menuColumns}
                  defaultFilters={defaultFilters}
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

export default DateReport;
