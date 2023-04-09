// material
import { Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
//
import { Visibility } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { ORDER_STATUS_OPTONS, TOrder } from 'types/order';
import { TTableColumn } from 'types/table';
import ResoTable from 'components/ResoTable/ResoTable';
import orderApi from 'api/order';
import OrderDetailDialog from 'pages/Orders/components/OrderDetailDialog';

// ----------------------------------------------------------------------

// const INVOICES = [
//   {
//     id: faker.datatype.uuid(),
//     category: 'Android',
//     price: faker.finance.amount(),
//     status: 'in_progress'
//   },
//   {
//     id: faker.datatype.uuid(),
//     category: 'Windows',
//     price: faker.finance.amount(),
//     status: 'paid'
//   },
//   {
//     id: faker.datatype.uuid(),
//     category: 'Mac',
//     price: faker.finance.amount(),
//     status: 'out_of_date'
//   },
//   {
//     id: faker.datatype.uuid(),
//     category: 'Windows',
//     price: faker.finance.amount(),
//     status: 'paid'
//   },
//   {
//     id: faker.datatype.uuid(),
//     category: 'Windows',
//     price: faker.finance.amount(),
//     status: 'in_progress'
//   }
// ];

// ----------------------------------------------------------------------

export default function AppNewInvoice() {
  const [detailOrder, setDetailOrder] = useState<string | null>(null);
  const { user } = useAuth();
  const theme = useTheme();
  const orderColumns: TTableColumn<TOrder>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Mã hoá đơn',
      dataIndex: 'invoiceId',
      hideInSearch: true
    },
    {
      title: 'Người tạo',
      dataIndex: 'staffName',
      hideInSearch: true
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'startDate',
      valueType: 'date',
      hideInSearch: true
    },
    {
      title: 'Thời gian hoàn thành',
      dataIndex: 'endDate',
      valueType: 'date',
      hideInSearch: true
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'finalAmount',
      hideInSearch: true,
      valueType: 'money'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueEnum: ORDER_STATUS_OPTONS,
      valueType: 'select',
      fixed: 'right',
      hideInSearch: true
    },
    {
      title: 'Chi tiết',
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
    <Card>
      {/* <CardHeader title="New Invoice" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{`INV-${row.id}`}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{fCurrency(row.price)}</TableCell>
                  <TableCell>
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.status === 'in_progress' && 'warning') ||
                        (row.status === 'out_of_date' && 'error') ||
                        'success'
                      }
                    >
                      {sentenceCase(row.status)}
                    </Label>
                  </TableCell>
                  <TableCell align="right">
                    <MoreMenuButton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View All
        </Button>
      </Box> */}
      <OrderDetailDialog
        orderId={detailOrder}
        open={Boolean(detailOrder)}
        onClose={() => setDetailOrder(null)}
      />
      <Stack spacing={2}>
        <Typography variant="h3">Hoá đơn cửa hàng</Typography>
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
  );
}
