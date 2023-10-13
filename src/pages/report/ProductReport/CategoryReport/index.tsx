/* eslint-disable camelcase */
// material
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
import categorySaleApi from 'api/report/category';
import AutocompleteStore from 'components/form/common/report/AutocompleteStore';
import ResoTable from 'components/ResoTable/ResoTable';
import moment from 'moment';
// import ReportBtn from 'pages/report/components/ReportBtn';
import ReportPage from 'pages/report/components/ReportPage';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { TCategorySaleReportBase } from 'types/report/category';
import { TTableColumn } from 'types/table';
import { DateRange } from '@mui/lab';
import SelectDateRange from 'pages/report/components/SelectDateRange';
// import { parseParams } from 'utils/axios';
import { formatDate } from 'utils/formatTime';
interface FetchParams {
  storeId: string | null | undefined;
  FromDate?: string;
  ToDate?: string;
  duration?: string;
}
const CategoryReport = () => {
  const defaultFilters = {
    fetchParams: {} as FetchParams
  };
  const tableRef = useRef<any>();
  const ref = useRef<any>();
  const { storeId } = useParams();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const [activeTab, setActiveTab] = useState('1');

  const categorySaleColumn: TTableColumn<TCategorySaleReportBase>[] = [
    {
      title: 'Cửa hàng',
      hideInTable: true,
      valueType: 'select',
      dataIndex: 'storeId',
      hideInSearch: storeId != '0',
      renderFormItem: () => <AutocompleteStore name="storeId" label="Cửa hàng" />
    },
    {
      title: 'STT',
      hideInSearch: true,
      dataIndex: 'index'
    },
    {
      title: 'Mã sản phẩm',
      hideInSearch: true,
      dataIndex: 'categoryId'
    },
    {
      title: 'Tên sản phẩm',
      hideInSearch: true,
      dataIndex: 'categoryName'
    },
    {
      title: 'Số lượng bán ra',
      hideInSearch: true,
      dataIndex: 'quantity',
      valueType: 'digit'
    },
    {
      title: 'Đơn giá (Đã VAT)',
      hideInSearch: true,
      dataIndex: 'percent',
      valueType: 'digit'
    },
    {
      title: 'discount',
      hideInSearch: true,
      dataIndex: 'discount',
      valueType: 'digit'
    },
    {
      title: 'Doanh thu (Chưa VAT)',
      hideInSearch: true,
      dataIndex: 'totalBeforeDiscount',
      valueType: 'money'
    },
    {
      title: 'Doanh thu (Đã VAT)',
      hideInSearch: true,
      valueType: 'money',
      dataIndex: 'totalAfterDiscount'
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

  //chart
  const chartFill = {
    series: [44, 55, 13, 43, 22],
    options: {
      title: {
        text: 'Doanh thu sản phẩm',
        align: 'center'
      },
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: [
        'Iced Espresso (M)',
        'Iced Espresso With Milk (M)',
        'Card 200K',
        'Iced Espresso With Milk (L)',
        'Phần còn lại'
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  };

  return (
    <ReportPage
      title="Báo cáo doanh thu sản phẩm"
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
      <Card>
        <TabContext value={activeTab}>
          <Box mb={2}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Báo cáo doanh thu" value="1" />
              <Tab label="Sơ đồ doanh thu" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ResoTable
              ref={ref}
              columns={categorySaleColumn}
              getData={categorySaleApi.get}
              showAction={false}
              pagination={true}
              defaultFilters={defaultFilters}
              // toolBarRender={() => [
              //   <ReportBtn
              //     key="export-excel"
              //     onClick={() =>
              //       window.open(
              //         `${process.env.REACT_APP_REPORT_BASE_URL}/product-report/export?${parseParams(
              //           ref.current.formControl.getValues()
              //         )}`
              //       )
              //     }
              //   />
              // ]}
              scroll={{ y: '500px' }}
            />
          </TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default CategoryReport;
