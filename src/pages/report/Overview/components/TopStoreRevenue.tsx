import { Stack, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { TTopStoreRevenueBase } from 'types/report/overview';
import { TTableColumn } from 'types/table';
import { formatDate } from 'utils/formatTime';
function TopStoreRevenue({ dateRange }: any) {
  const ref = useRef<any>();
  const { storeId } = useParams();

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

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  return (
    <Stack direction={'column'}>
      {/* V. Top Doanh Thu Sản Phẩm*/}
      <Stack spacing={2}>
        <Typography pl={2} variant="h4">
          V. Top Doanh Thu Cửa Hàng
        </Typography>
      </Stack>
    </Stack>
  );
}

export default TopStoreRevenue;
