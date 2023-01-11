import { TStore } from './store';

export enum OrderStatus {
  COMPLETE = 4,
  CANCEL_AFTER_COOK = 'Hủy sau chế biến',
  CANCEL_BEFORE_COOK = 'Hủy trước chế biến',
  PROCESSING = 0
}

export enum PaymentType {
  AT_RESTAURANT = 'Tại quán',
  DELIVERY = 'Giao hàng',
  TAKE_AWAY = 'Mang đi',
  CREDIT = 'Nạp thẻ'
}

export type TOrder = {
  status: OrderStatus;
  paymentType: PaymentType;
  order_id: number;
  invoice_id: string;
  check_in_date: Date;
  check_out_date: Date;
  approve_date: Date;
  total_amount: number;
  discount: number;
  final_amount: number;
  order_status: number;
  order_type: number;
  notes: string;
  fee_description: string;
  booking_date: Date;
  customer_id: number;
  store_id: number;
  delivery_address: string;
  delivery_status: number;
  vat: number;
  delivery_receiver: string;
  delivery_phone: string;
  delivery_type: number;
  customer_address: string;
  customer_email: string;
  customer_gender: number;
  customer_name: string;
  customer_phone: string;
  customer_phone_receiver: string;
  store: TStore;
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

export type TOrderPayment = {
  amount: number;
  type: number;
  status: number;
  transaction_id?: string;
};

export type TOrderDetail = TOrder & {
  order_detail: TOrderDetailItem[];
  payments: TOrderPayment[];
};

export const ORDER_STATUS_OPTONS = [
  {
    label: 'Tất cả',
    value: ''
  },
  {
    label: 'Đang xử lý',
    value: `${OrderStatus.PROCESSING}`,
    color: 'warning'
  },
  {
    label: 'Hoàn thành',
    value: OrderStatus.COMPLETE,
    color: 'success'
  }
];
export const PAYMENT_TYPE_OPTONS = [
  {
    label: 'Tất cả',
    value: ''
  },
  {
    label: PaymentType.AT_RESTAURANT,
    value: PaymentType.AT_RESTAURANT
  },
  {
    label: PaymentType.DELIVERY,
    value: PaymentType.DELIVERY
  },
  {
    label: PaymentType.TAKE_AWAY,
    value: PaymentType.TAKE_AWAY
  },
  {
    label: PaymentType.CREDIT,
    value: PaymentType.CREDIT
  }
];
