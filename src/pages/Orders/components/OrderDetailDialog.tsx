import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography
} from '@mui/material';
import orderApi from 'api/order';
import EmptyContent from 'components/EmptyContent';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { useQuery } from 'react-query';
import { ORDER_STATUS_OPTONS, TOrderDetail, TOrderDetailItem } from 'types/order';
import { TTableColumn } from 'types/table';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  orderId?: number | null;
};

const OrderSummaryItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'left',
  '& > h6': {
    width: '40%',
    marginRight: '1rem'
  },
  '& > p': {
    width: '60%',
    textAlign: 'left'
  }
});

const OrderDetailDialog: React.FC<Props> = ({ open, onClose, orderId }) => {
  const { translate } = useLocales();

  const { data: order, isLoading } = useQuery(
    ['orders', orderId],
    () => orderApi.getOrderDetail(orderId!).then((res) => res.data),
    {
      enabled: Boolean(orderId)
    }
  );

  const custColumns: ResoDescriptionColumnType<TOrderDetail>[] = [
    {
      title: translate('pages.orders.table.customerName'),
      dataIndex: 'delivery_receiver'
    },
    {
      title: translate('pages.orders.table.customerPhone'),
      dataIndex: 'delivery_phone'
    },
    {
      title: translate('pages.orders.table.address'),
      dataIndex: 'delivery_address'
    }
  ];

  const orderColumns: ResoDescriptionColumnType<TOrderDetail>[] = [
    {
      title: translate('pages.orders.table.invoice'),
      dataIndex: 'invoice_id'
    },
    {
      title: translate('pages.orders.table.status'),
      dataIndex: 'order_status',
      valueType: 'select',
      valueEnum: ORDER_STATUS_OPTONS
    },

    {
      title: translate('pages.orders.table.totalAmount'),
      dataIndex: 'total_amount',
      valueType: 'money'
    },
    {
      title: translate('pages.orders.table.discount'),
      dataIndex: 'discount'
    },
    {
      title: translate('pages.orders.table.finalAmount'),
      dataIndex: 'final_amount',
      hideInSearch: true,
      valueType: 'money'
    },
    {
      title: translate('pages.orders.table.paymentType'),
      dataIndex: 'payments',
      render: (payments) => {
        if (!payments) return '-';
        return (
          <Stack spacing={2}>
            {(payments as TOrderDetail['payments'])?.map((payment) => (
              <Typography key={`${payment.type}`}>
                {payment.type}: {payment.amount}
              </Typography>
            ))}
          </Stack>
        );
      }
    },
    {
      title: translate('pages.orders.table.store'),
      dataIndex: ['store', 'name']
    },

    {
      title: translate('pages.orders.table.note'),
      dataIndex: 'notes'
    },
    {
      title: translate('pages.orders.table.orderTime'),
      dataIndex: 'check_in_date',
      valueType: 'datetime'
    }
  ];

  const orderItemColumns: TTableColumn<TOrderDetailItem>[] = [
    {
      title: 'STT',
      dataIndex: 'index'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name'
    },
    {
      title: 'Giá',
      dataIndex: 'unit_price',
      valueType: 'money'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      valueType: 'digit'
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      valueType: 'money'
    },
    {
      title: 'Thanh toán',
      dataIndex: 'final_amount',
      valueType: 'money'
    }
  ];

  return (
    <Dialog maxWidth="lg" scroll="paper" open={open} onClose={onClose}>
      {isLoading ? (
        <CircularProgress />
      ) : !order ? (
        <EmptyContent title="Không tìm thấy đơn hàng" />
      ) : (
        <>
          <DialogTitle
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="h4">Chi tiết đơn hàng</Typography>
            <IconButton aria-label="close" onClick={onClose} size="large">
              <Icon icon={closeFill} />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <ResoDescriptions
                title="Thông tin"
                labelProps={{ fontWeight: 'bold' }}
                columns={orderColumns as any}
                datasource={order}
                column={3}
              />
              <ResoDescriptions
                title="Thông tin khách hàng"
                labelProps={{ fontWeight: 'bold' }}
                columns={custColumns as any}
                datasource={order}
                column={3}
              />

              <ResoTable
                showFilter={false}
                showSettings={false}
                showAction={false}
                pagination={false}
                columns={orderItemColumns}
                dataSource={order.order_detail}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Đóng</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default OrderDetailDialog;
