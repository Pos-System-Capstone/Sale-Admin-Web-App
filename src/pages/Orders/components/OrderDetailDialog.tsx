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
import useAuth from 'hooks/useAuth';
import React from 'react';
import { useQuery } from 'react-query';
import {
  ORDER_STATUS_OPTONS,
  ORDER_TYPE_OPTONS,
  PAYMENT_TYPE_OPTIONS,
  TOrderDetail
} from 'types/order';
import { TProductInOrderDetail } from 'types/product';
import { TTableColumn } from 'types/table';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  orderId?: string | null;
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
  const { user } = useAuth();
  const { data: order, isLoading } = useQuery(
    ['orders', orderId],
    () => orderApi.getOrderDetail(user?.storeId, orderId!).then((res) => res.data),
    {
      enabled: Boolean(orderId)
    }
  );

  const orderColumns: ResoDescriptionColumnType<TOrderDetail>[] = [
    {
      title: 'Mã hoá đơn',
      dataIndex: 'invoiceId',
      hideInSearch: true
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'checkInDate',
      valueType: 'datetime',
      hideInSearch: true
    },
    {
      title: 'Thuế áp dụng',
      dataIndex: 'vat',
      render: (vatAmount) => {
        return (
          <Stack spacing={2}>
            <Typography>{vatAmount != null && `${vatAmount * 100} %`}</Typography>
          </Stack>
        );
      },
      hideInSearch: true
    },
    {
      title: 'Giá trị thuế',
      dataIndex: 'vatAmount',
      valueType: 'money',
      hideInSearch: true
    },
    {
      title: 'Giá giảm',
      dataIndex: 'discount',
      valueType: 'money',
      hideInSearch: true
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      valueType: 'money',
      hideInSearch: true
    },
    {
      title: 'Giá tiền',
      dataIndex: 'finalAmount',
      valueType: 'money',
      hideInSearch: true
    },
    {
      title: 'Loại đơn hàng',
      dataIndex: 'orderType',
      valueEnum: ORDER_TYPE_OPTONS,
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      valueEnum: ORDER_STATUS_OPTONS,
      hideInSearch: true
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentType',
      hideInSearch: true,
      valueEnum: PAYMENT_TYPE_OPTIONS,
      valueType: 'select'
    }
  ];

  const orderItemColumns: TTableColumn<TProductInOrderDetail>[] = [
    {
      title: 'STT',
      dataIndex: 'index'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Giá bán',
      dataIndex: 'sellingPrice',
      valueType: 'money',
      hideInSearch: true
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      valueType: 'digit',
      fixed: 'right',
      hideInSearch: true
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      valueType: 'money',
      fixed: 'right',
      hideInSearch: true
    },
    {
      title: 'Thanh toán',
      dataIndex: 'finalAmount',
      valueType: 'money',
      fixed: 'right',
      hideInSearch: true
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
                column={2}
              />

              <ResoTable
                showFilter={false}
                showSettings={false}
                showAction={false}
                pagination={false}
                columns={orderItemColumns}
                dataSource={order?.productList}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="error" variant="outlined" onClick={onClose}>
              Huỷ đơn
            </Button>
            <Button onClick={onClose}>Đóng</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default OrderDetailDialog;
