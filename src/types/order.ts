import { TProductInOrderDetail } from './product';

export enum PaymentType {
  AT_RESTAURANT = 'Tại quán',
  DELIVERY = 'Giao hàng',
  TAKE_AWAY = 'Mang đi',
  CREDIT = 'Nạp thẻ'
}

export enum OrderType {
  EATIN = 'EAT_IN',
  TAKE_AWAY = 'TAKE_AWAY',
  DELIVERY = 'DELIVERY'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CANCEL = 'CANCELED',
  PAID = 'PAID'
}

export type TOrder = {
  items: any;
  id: string;
  invoiceId: string;
  staffName: string;
  startDate: string;
  endDate: string;
  finalAmount: number;
  orderType: OrderType;
  status: OrderStatus;
  paymentType: string;
};

export type TOrderDetailItem = {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  total_amount: number;
  quantity: number;
  status: number;
  final_amount: number;
  discount: number;
  tax_percent: number;
  tax_value: number;
  unit_price: number;
  product_type: number;
  parent_id: number;
  tmp_detail_id: number;
  active: boolean;
  product_name: string;
  pic_url: string;
};

export enum TOrderPaymentType {
  CASH = 'CASH',
  MOMO = 'MOMO',
  BANKING = 'BANKING',
  VISA = 'VISA'
}

export type TOrderPayment = {
  id: string;
  name: string;
  picUrl: string;
};

export type TOrderDetail = {
  orderId: string;
  invoiceId: string;
  totalAmount: number;
  finalAmount: number;
  vat: number;
  vatAmount: number;
  discount: number;
  orderStatus: OrderStatus;
  orderType: OrderType;
  checkInDate: string;
  paymentType: string;
  payment: TOrderPayment;
  productList: TProductInOrderDetail[];
};

export const ORDER_STATUS_OPTONS = [
  {
    label: 'Tất cả',
    value: ``
  },
  {
    label: 'Đang xử lý',
    value: `${OrderStatus.PENDING}`,
    color: 'warning'
  },
  {
    label: 'Hoàn thành',
    value: OrderStatus.PAID,
    color: 'success'
  }
  // {
  //   label: 'Huỷ',
  //   value: OrderStatus.CANCEL,
  //   color: 'error'
  // }
];

export const ORDER_TYPE_OPTONS = [
  {
    label: 'Tất cả',
    value: ``
  },
  {
    label: 'Dùng ngay',
    value: OrderType.EATIN,
    color: 'warning'
  },
  {
    label: 'Mang đi',
    value: OrderType.TAKE_AWAY,
    color: 'warning'
  },
  {
    label: 'Đặt hàng',
    value: OrderType.DELIVERY,
    color: 'warning'
  }
];

export const PAYMENT_TYPE_OPTIONS = [
  {
    label: 'Tiền mặt',
    value: TOrderPaymentType.CASH
  },
  {
    label: 'Momo',
    value: TOrderPaymentType.MOMO
  },
  {
    label: 'Ngân hàng',
    value: TOrderPaymentType.BANKING
  },
  {
    label: 'Visa/MasterCard',
    value: TOrderPaymentType.VISA
  }
];
