import { TTableColumn } from 'types/table';

export const paymentColumns: TTableColumn<any>[] = [
  {
    title: 'Cửa hàng',
    dataIndex: 'storeName',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: 'Tiền mặt',
    dataIndex: 'cash',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Nạp thẻ',
    dataIndex: 'creditCard',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Thẻ thành viên',
    dataIndex: 'creditCardUse',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Ngân hàng',
    dataIndex: 'bank',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Momo',
    dataIndex: 'momo',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'GrabPay',
    dataIndex: 'grabPay',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'GrabFood',
    dataIndex: 'grabFood',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'VnPay',
    dataIndex: 'vnPay',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Baemin',
    dataIndex: 'baemin',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'ShopeePay',
    dataIndex: 'shopeePay',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'ZaloPay',
    dataIndex: 'zaloPay',
    hideInSearch: true,
    valueType: 'money'
  }
];

export const storePaymentColumns: TTableColumn<any>[] = [
  {
    title: 'Ngày',
    dataIndex: 'date',
    // valueType: 'date',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Tiền mặt',
    dataIndex: 'cash',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Nạp thẻ',
    dataIndex: 'creditCard',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Thẻ thành viên',
    dataIndex: 'creditCardUse',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Ngân hàng',
    dataIndex: 'bank',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Momo',
    dataIndex: 'momo',
    hideInSearch: true
  },
  {
    title: 'GrabPay',
    dataIndex: 'grabPay',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'GrabFood',
    dataIndex: 'grabFood',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'VnPay',
    dataIndex: 'vnPay',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Baemin',
    dataIndex: 'baemin',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'ShopeePay',
    dataIndex: 'shopeePay',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'ZaloPay',
    dataIndex: 'zaloPay',
    hideInSearch: true,
    valueType: 'money'
  }
];
