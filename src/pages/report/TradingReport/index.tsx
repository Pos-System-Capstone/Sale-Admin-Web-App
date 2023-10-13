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
import AutocompleteStore from 'components/form/common/report/AutocompleteStore';
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
// import SelectDateRange from '../components/SelectDateRange';
// import Page from './components/Page';
interface FetchParams {
  storeId: string | null | undefined;
  FromDate?: string;
  ToDate?: string;
  duration?: string;
}
export const DayReport = () => {
  const defaultFilters = {
    fetchParams: {} as FetchParams
  };
  // const tableRef = useRef<any>();
  const { storeId } = useParams();
  console.log(storeId);
  const PATH_REPORT = PATH_REPORT_APP(storeId ?? '0');
  const ref = useRef<any>();
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const [activeTab, setActiveTab] = useState('1');

  const ChartFill = {
    options: {
      chart: {
        id: 'basic-line'
      },
      xaxis: {
        categories: [
          '1/6/2022',
          '2/6/2022',
          '3/6/2022',
          '4/6/2022',
          '5/6/2022',
          '6/6/2022',
          '7/6/2022',
          '8/6/2022',
          '9/6/2022',
          '10/6/2022',
          '11/6/2022',
          '12/6/2022',
          '13/6/2022',
          '14/6/2022',
          '15/6/2022',
          '16/6/2022',
          '17/6/2022',
          '18/6/2022',
          '19/6/2022',
          '20/6/2022',
          '21/6/2022',
          '22/6/2022',
          '23/6/2022',
          '24/6/2022',
          '25/6/2022',
          '26/6/2022',
          '27/6/2022',
          '28/6/2022',
          '29/6/2022',
          '30/6/2022'
        ]
      }
    },
    series: [
      {
        name: 'Mang đi',
        data: [
          6822, 6154, 6555, 4517, 3651, 6862, 6860, 6793, 6535, 6618, 4598, 3481, 6707, 6706, 6466,
          6634, 6222, 4471, 3031, 6646, 6523, 6369, 5146, 0, 0, 0, 0, 0, 0, 0
        ]
      },
      {
        name: 'Tại store',
        data: [
          4315, 4087, 4065, 3426, 3077, 4136, 4230, 4287, 4227, 4238, 3440, 2670, 4249, 4448, 4546,
          4223, 4086, 3086, 2843, 3864, 3963, 4165, 3317, 0, 0, 0, 0, 0, 0, 0
        ]
      },
      {
        name: 'Giao hàng',
        data: [
          177, 163, 181, 122, 74, 174, 178, 178, 167, 164, 102, 87, 170, 173, 171, 164, 161, 97, 75,
          188, 162, 147, 126, 0, 0, 0, 0, 0, 0, 0
        ]
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

  const menuColumns: TTableColumn<TTradingBase>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Cửa hàng',
      dataIndex: 'storeId',
      hideInTable: true,
      valueType: 'select',
      hideInSearch: storeId != '0',
      renderFormItem: () => <AutocompleteStore name="storeId" label="Cửa hàng" />
    },
    {
      title: 'Cửa hàng',
      dataIndex: 'storeName',
      hideInSearch: true
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
      title: 'Tổng số bill',
      dataIndex: 'totalBills',
      hideInSearch: true,
      valueType: 'digit'
    },
    {
      title: 'Tổng doanh thu',
      dataIndex: 'totalSales',
      hideInSearch: true,
      // render: (x) =>
      //   x.toLocaleString('vi', {
      //     style: 'currency',
      //     currency: 'VND'
      //   })
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
      title={`Báo cáo doanh thu theo ngày: ${yesterday.toLocaleDateString('vi-VI', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })}`}
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
            <Grid key={item.title} item xs={6} md={3}>
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
                  defaultFilters={defaultFilters}
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
            <Grid container rowSpacing={1} columnSpacing={{ xs: 12 }}>
              <Grid item>
                <Chart
                  // updateSeries={this.data.storeName}
                  options={ChartFill.options}
                  series={ChartFill.series}
                  // getData={`${days} ${total}`}
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

export default DayReport;
