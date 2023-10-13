import { Stack, Typography } from '@mui/material';
import overviewApi from 'api/report/overview';
import ResoReportTable from 'components/ResoReportTable/ResoReportTable';
import ReportBtn from 'pages/report/components/ReportBtn';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { TTopStoreRevenueBase } from 'types/report/overview';
import { TTableColumn } from 'types/table';
import { parseParams } from 'utils/axios';
function TopStoreRevenue({ dateRange, defaultFilters }: any) {
  const ref = useRef<any>();
  const { storeId } = useParams();
  // console.log(defaultFilters);
  const { FromDate, ToDate, duration } = defaultFilters.fetchParams;

  // State lưu giá trị hiện tại
  const [fromDate, setFromDate] = useState(FromDate);
  const [toDate, setToDate] = useState(ToDate);
  const [toDuration, setToDuration] = useState(duration);
  // console.log(toDuration);
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
    if (dateRange) {
      setFromDate(dateRange[0]);
      setToDate(dateRange[1]);
    }
  }, [dateRange]);

  const orderColumns: TTableColumn<TTopStoreRevenueBase>[] = [
    {
      title: 'STT',
      hideInSearch: true,
      dataIndex: 'index'
    },
    {
      title: 'Cửa hàng',
      hideInSearch: true,
      dataIndex: 'storeName'
    },
    {
      title: 'Tổng sản phẩm',
      hideInSearch: true,
      dataIndex: 'totalProduct',
      valueType: 'digit'
    },
    {
      title: 'Hóa đơn bán hàng',
      hideInSearch: true,
      dataIndex: 'totalOrderSale',
      valueType: 'digit'
    },
    {
      title: 'Trung bình bill',
      hideInSearch: true,
      dataIndex: 'avgRevenueSale',
      valueType: 'money'
    },
    {
      title: 'DT trước giảm giá',
      hideInSearch: true,
      dataIndex: 'totalRevenueBeforeDiscount',
      valueType: 'money'
    },
    {
      title: 'Giảm giá',
      hideInSearch: true,
      dataIndex: 'totalDiscount',
      valueType: 'money'
    },
    {
      title: 'DT sau giảm giá',
      hideInSearch: true,
      dataIndex: 'totalRevenueSale',
      valueType: 'money'
    },
    {
      title: 'Hóa đơn nạp thẻ',
      hideInSearch: true,
      dataIndex: 'totalOrderCard',
      valueType: 'digit'
    },
    {
      title: 'Doanh thu nạp thẻ',
      hideInSearch: true,
      dataIndex: 'totalRevenueCard',
      valueType: 'money'
    }
  ];

  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
  //     ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
  //   }
  // }, [dateRange]);

  return (
    <Stack direction={'column'}>
      {/* V. Top Doanh Thu Sản Phẩm*/}
      <Stack spacing={2}>
        <Typography pl={2} variant="h4">
          V. Top Doanh Thu Cửa Hàng
        </Typography>
        <ResoReportTable
          showAction={false}
          toolBarRender={() => [
            <ReportBtn
              key="export-excel"
              onClick={() =>
                window.open(
                  `${
                    process.env.REACT_APP_REPORT_BASE_URL
                  }/overview-dashboard/top-store-revenue/export?${parseParams(
                    ref.current.formControl.getValues()
                  )}`
                )
              }
            />
          ]}
          columns={orderColumns}
          ref={ref}
          getData={overviewApi.getTopStoreRevenue}
          pagination
          defaultFilters={defaultFilters}
          scroll={{ y: '500px' }}
        />
      </Stack>
    </Stack>
  );
}

export default TopStoreRevenue;
