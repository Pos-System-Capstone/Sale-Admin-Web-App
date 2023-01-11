import { Stack, Typography } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import { useRef } from 'react';
import { TTableColumn } from 'types/table';
import { fNumber } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';
function TabTwo() {
  const ref = useRef<any>();

  type ProductSaleDetail = {
    index?: any;
    name?: any;
    bill?: any;
    billCard?: any;
    totalProduct?: any;
    saleRevenue?: any;
    billRevenue?: any;
    totalRevenue?: any;
  };

  const data = [
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    }
  ];

  const orderColumns: TTableColumn<ProductSaleDetail>[] = [
    {
      title: 'Ngày',
      valueType: 'date',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: 'STT',
      hideInSearch: true,
      dataIndex: 'index'
    },
    {
      title: 'Cửa hàng',
      hideInSearch: true,
      dataIndex: 'name'
    },
    {
      title: 'Hóa Đơn Bán Hàng',
      hideInSearch: true,
      dataIndex: 'bill',
      render: (value) => fNumber(value)
    },
    {
      title: 'Tổng sản phẩm',
      hideInSearch: true,
      dataIndex: 'totalProduct',
      render: (value) => fNumber(value)
    },
    {
      title: 'DT nạp thẻ',
      hideInSearch: true,
      dataIndex: 'billCard',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Tổng danh thu',
      hideInSearch: true,
      dataIndex: 'saleRevenue',
      render: (value) => formatCurrency(value)
    }
  ];
  return (
    <Stack direction={'column'}>
      {/* VI. Chi tiet Doanh Thu Sản Phẩm*/}
      <Stack spacing={2}>
        <Typography pl={2} variant="h4">
          VI. Top Doanh Thu Sản Phẩm
        </Typography>
        <ResoTable
          showAction={false}
          columns={orderColumns}
          ref={ref}
          dataSource={data}
          // getData={getFakeApi}
          scroll={{ y: '320px' }}
        />
      </Stack>
    </Stack>
  );
}

export default TabTwo;
