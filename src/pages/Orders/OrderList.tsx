/* eslint-disable camelcase */
import { Visibility } from '@mui/icons-material';
// material
import { Card, IconButton, Stack, Tooltip } from '@mui/material';
import orderApi from 'api/order';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useAuth from 'hooks/useAuth';
import useLocales from 'hooks/useLocales';
import { useState } from 'react';
// components
import { ORDER_STATUS_OPTONS, ORDER_TYPE_OPTONS, PAYMENT_TYPE_OPTIONS, TOrder } from 'types/order';
import { TTableColumn } from 'types/table';
import OrderDetailDialog from './components/OrderDetailDialog';

const OrderListPage = () => {
  const { translate } = useLocales();
  const { user } = useAuth();

  const [detailOrder, setDetailOrder] = useState<string | null>(null);

  const orderColumns: TTableColumn<TOrder>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Mã hoá đơn',
      dataIndex: 'invoiceId',
      hideInSearch: true,
      fixed: 'left'
    },
    // {
    //   title: 'Người tạo',
    //   dataIndex: 'staffName',
    //   hideInSearch: true
    // },
    {
      title: 'Ngày tạo',
      dataIndex: 'startDate',
      valueType: 'date'
      // hideInSearch: true
    },
    // {
    //   title: 'Thời gian hoàn thành',
    //   dataIndex: 'endDate',
    //   valueType: 'datetime'
    //   // hideInSearch: true
    // },
    {
      title: 'Tổng tiền',
      dataIndex: 'finalAmount',
      hideInSearch: true,
      valueType: 'money'
    },
    {
      title: 'Loại đơn hàng',
      dataIndex: 'orderType',
      valueEnum: ORDER_TYPE_OPTONS,
      valueType: 'select',
      fixed: 'left'
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paymentType',
      valueEnum: PAYMENT_TYPE_OPTIONS,
      valueType: 'select',
      hideInSearch: true,
      fixed: 'left'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueEnum: ORDER_STATUS_OPTONS,
      valueType: 'select',
      fixed: 'left'
    },
    {
      title: translate('pages.orders.table.detail'),
      fixed: 'right',
      hideInSearch: true,
      render: (_: any, order: TOrder) => (
        <Tooltip title="Chi tiết">
          <IconButton onClick={() => setDetailOrder(order.id)} size="large">
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
    <Page
      title="Danh sách đơn hàng"
      // actions={() => [
      //   <Button
      //     key="export-file"
      //     onClick={() => {
      //       //   navigate('/menus/create');
      //     }}
      //     variant="contained"
      //     startIcon={<FileDownload />}
      //   >
      //     Xuất file
      //   </Button>
      // ]}
    >
      <OrderDetailDialog
        orderId={detailOrder}
        open={Boolean(detailOrder)}
        onClose={() => setDetailOrder(null)}
      />
      <Card>
        <Stack spacing={2}>
          <ResoTable
            showAction={false}
            rowKey="menu_id"
            getData={(params: any) => {
              return orderApi.getOrderList(user?.storeId ?? '', params);
            }}
            columns={orderColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default OrderListPage;
