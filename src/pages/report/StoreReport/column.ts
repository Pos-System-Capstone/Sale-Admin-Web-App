import { TStoreReport } from 'types/report/store';
import { TTableColumn } from 'types/table';

export const storeColumns: TTableColumn<TStoreReport>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: 'Tên cửa hàng',
    dataIndex: 'name',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: 'Loại cửa hàng',
    // dataIndex: 'cash',
    hideInSearch: true
  },
  {
    title: 'Lần chạy báo cáo',
    // dataIndex: 'creditCard',
    hideInSearch: true
  },
  {
    title: 'Phiên bản (Version)',
    hideInSearch: true
    // dataIndex: 'saleRevenue',
  },
  {
    title: 'Ngày cập nhật (Updated at)',
    hideInSearch: true
    // dataIndex: 'saleRevenue',
  }
];
