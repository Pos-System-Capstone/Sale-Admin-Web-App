import { Card, Stack } from '@mui/material';
import transactionApi from 'api/report/transaction';
import Label from 'components/Label';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useAuth from 'hooks/useAuth';
import OrderDetailDialog from 'pages/Orders/components/OrderDetailDialog';
import { useState } from 'react';
import { TTransaction } from 'types/report/transaction';
import { TTableColumn } from 'types/table';

export default function TransactionList() {
  const { user } = useAuth();

  const [detailOrder, setDetailOrder] = useState<string | null>(null);

  const transactionColumns: TTableColumn<any>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Giá trị',
      dataIndex: 'amount',
      hideInSearch: true,
      render: (value: any, transaction: TTransaction) => (
        <Label
          color={
            transaction.status == 'SUCCESS'
              ? 'success'
              : transaction.status == 'FAIL'
              ? 'error'
              : 'default'
          }
        >
          {transaction.status == 'SUCCESS' ? '+' : transaction.status == 'FAIL' ? '-' : ''} {value}{' '}
          {transaction.currency}
        </Label>
      )
    },
    {
      title: 'Đơn vị',
      dataIndex: 'currency',
      hideInSearch: true
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      valueType: 'datetime'
      // hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      render: (value: any, transaction: TTransaction) => (
        <Label
          color={
            transaction.status == 'SUCCESS'
              ? 'success'
              : transaction.status == 'FAIL'
              ? 'error'
              : 'default'
          }
        >
          {value}
        </Label>
      )
    }
  ];

  return (
    <Page
      title="Danh sách giao dịch trong thương hiệu"
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
              return transactionApi.getTransactionOfBrand(user?.brandId ?? '', params);
            }}
            columns={transactionColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
}
