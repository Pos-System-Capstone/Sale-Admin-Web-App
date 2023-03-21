export enum PaymentType {
  AT_RESTAURANT = 'Tại quán',
  DELIVERY = 'Giao hàng',
  TAKE_AWAY = 'Mang đi',
  CREDIT = 'Nạp thẻ'
}

// export type TOrder = {
//   status: OrderStatus;
//   paymentType: PaymentType;
//   order_id: number;
//   invoice_id: string;
//   check_in_date: Date;
//   check_out_date: Date;
//   approve_date: Date;
//   total_amount: number;
//   discount: number;
//   final_amount: number;
//   order_status: number;
//   order_type: number;
//   notes: string;
//   fee_description: string;
//   booking_date: Date;
//   customer_id: number;
//   store_id: number;
//   delivery_address: string;
//   delivery_status: number;
//   vat: number;
//   delivery_receiver: string;
//   delivery_phone: string;
//   delivery_type: number;
//   customer_address: string;
//   customer_email: string;
//   customer_gender: number;
//   customer_name: string;
//   customer_phone: string;
//   customer_phone_receiver: string;
//   store: TStore;
// };

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
  id: string;
  invoiceId: string;
  staffName: string;
  startDate: string;
  endDate: string;
  finalAmount: number;
  orderType: OrderType;
  status: OrderStatus;
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
    label: 'Đang xử lý',
    value: `${OrderStatus.PENDING}`,
    color: 'warning'
  },
  {
    label: 'Hoàn thành',
    value: OrderStatus.PAID,
    color: 'success'
  },
  {
    label: 'Huỷ',
    value: OrderStatus.CANCEL,
    color: 'error'
  }
];

export const ORDER_TYPE_OPTONS = [
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
