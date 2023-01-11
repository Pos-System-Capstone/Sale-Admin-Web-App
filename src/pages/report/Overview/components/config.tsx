import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyIcon from '@mui/icons-material/Money';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import WindowIcon from '@mui/icons-material/Window';
import TimelineIcon from '@mui/icons-material/Timeline';
// I. Bán hàng
const totalSalesRevenue: any = [
  {
    title: <AttachMoneyIcon />,
    dataIndex: 'totalRevenue'
  },
  {
    title: 'Doanh thu trước giảm giá (1)',
    dataIndex: 'totalRevenueWithDiscount',
    highlight: true
  },
  {
    title: 'Giảm giá Passio100 (2.1)',
    dataIndex: 'totalDiscount100',
    fontSize: 'small'
  },
  {
    title: 'Giảm giá bán hàng (2.2)',
    dataIndex: 'totalDiscount',
    fontSize: 'small'
  },
  {
    title: 'Tổng giảm giá bán hàng (2) = (2.1) + (2.2)',
    dataIndex: 'totalDiscount',
    fontSize: 'small'
  },
  {
    title: 'Doanh thu Thực Tế (3)',
    dataIndex: 'totalRevenue',
    highlight: true
  }
];
const totalSalesInvoice: any = [
  {
    title: <SyncAltIcon />,
    dataIndex: 'totalOrder'
  },
  {
    title: 'Tại quán (1)',
    dataIndex: 'totalOrderAtStore',
    highlight: true
  },
  {
    title: 'Mang đi (2)',
    dataIndex: 'totalOrderTakeAway'
  },
  {
    title: 'Giao hàng (3)',
    dataIndex: 'totalOrderDelivery',
    highlight: true
  }
];

// II. Nạp thẻ
const TotalRevenueCardRecharge: any = [
  {
    title: <AttachMoneyIcon />,
    dataIndex: 'totalRevenueOrderCard'
  }
];
const totalBillOfCard: any = [
  {
    title: <SyncAltIcon />,
    dataIndex: 'totalOrderCard'
  }
];

//III. Thành phần doanh thu
const totalRevenue: any = [
  {
    title: <AttachMoneyIcon />,
    dataIndex: 'totalRevenue'
  }
];
const totalBill: any = [
  {
    title: <WindowIcon />,
    dataIndex: 'totalOrder'
  }
];
const averageBill: any = [
  {
    title: <WindowIcon />,
    dataIndex: 'avgRevenueOrder'
  }
];
const averageProduct: any = [
  {
    title: <WindowIcon />,
    dataIndex: 'avgProductOrder'
  }
];

const atStore: any = [
  {
    title: 'Doanh thu',
    unit: 'VNĐ',
    dataIndex: 'totalRevenueAtStore',
    highlight: true
  },
  {
    title: 'Tổng hóa đơn',
    unit: 'Hóa đơn',
    dataIndex: 'totalOrderAtStore'
  },
  {
    title: 'TB hóa đơn',
    unit: 'VNĐ/Hóa đơn',
    dataIndex: '',
    highlight: true
  },
  {
    title: 'TB sản phẩm',
    unit: 'SP/Hóa đơn',
    dataIndex: 'avgProductOrderAtStore'
  }
];
const takeAway: any = [
  {
    title: 'Doanh thu',
    unit: 'VNĐ',
    dataIndex: 'totalRevenueTakeAway',
    highlight: true
  },
  {
    title: 'Tổng hóa đơn',
    unit: 'Hóa đơn',
    dataIndex: 'totalOrderTakeAway'
  },
  {
    title: 'TB hóa đơn',
    unit: 'VNĐ/Hóa đơn',
    dataIndex: '',
    highlight: true
  },
  {
    title: 'TB sản phẩm',
    unit: 'SP/Hóa đơn',
    dataIndex: 'avgProductOrderTakeAway'
  }
];
const delivery: any = [
  {
    title: 'Doanh thu',
    unit: 'VNĐ',
    dataIndex: 'totalRevenueDelivery',
    highlight: true
  },
  {
    title: 'Tổng hóa đơn',
    unit: 'Hóa đơn',
    dataIndex: 'totalOrderDelivery'
  },
  {
    title: 'TB hóa đơn',
    unit: 'VNĐ/Hóa đơn',
    dataIndex: '',
    highlight: true
  },
  {
    title: 'TB sản phẩm',
    unit: 'SP/Hóa đơn',
    dataIndex: 'avgProductOrderDelivery'
  }
];
const cancel: any = [
  {
    title: 'Tổng giá trị',
    unit: 'VNĐ',
    dataIndex: 'totalRevenuePrecancel',
    highlight: true
  },
  {
    title: 'Tổng hóa đơn',
    unit: 'Hóa đơn',
    dataIndex: 'totalOrderPreCancel'
  },
  {
    title: 'Hủy trước chế biến',
    unit: 'VNĐ/Hóa đơn',
    dataIndex: '',
    highlight: true
  },
  {
    title: 'Hủy sau chế biến',
    unit: 'SP/Hóa đơn',
    dataIndex: 'totalOrderAfterCancel'
  }
];

// IV. Thanh Toán & Thu Ngân
const totalPayment: any = [
  {
    title: <MoneyIcon />,
    dataIndex: 'totalPayment'
  },
  {
    title: 'Tiền mặt [bán hàng] (1)',
    dataIndex: 'totalPaymentForSales',
    highlight: true
  },
  {
    title: 'Tiền mặt [nạp thẻ] (2)',
    dataIndex: 'totalPaymentCard'
  },
  {
    title: 'Thẻ thành viên (3)',
    dataIndex: 'totalPaymentBuyCard',
    highlight: true
  },
  {
    title: 'Ví điện tử (4)',
    dataIndex: 'null'
  },
  {
    title: 'Momo:',
    dataIndex: 'totalPaymentE_Wallet_Momo',
    fontSize: 'small'
  },
  {
    title: 'Grab Pay',
    dataIndex: 'totalPaymentE_Wallet_GrabPay',
    fontSize: 'small'
  },
  {
    title: 'Grab Food',
    dataIndex: 'totalPaymentE_Wallet_GrabFood',
    fontSize: 'small'
  },
  {
    title: 'VN Pay',
    dataIndex: 'totalPaymentE_Wallet_VNPay',
    fontSize: 'small'
  },
  {
    title: 'Baemin',
    dataIndex: 'totalPaymentE_Wallet_Baemin',
    fontSize: 'small'
  },
  {
    title: 'Shopee pay',
    dataIndex: 'totalPaymentE_Wallet_Shopeepay',
    fontSize: 'small'
  },
  {
    title: 'Zalo pay',
    dataIndex: 'totalPaymentE_Wallet_ZaloPay',
    fontSize: 'small'
  },
  {
    title: <AttachMoneyIcon />,
    dataIndex: 'totalPaymentE_Wallet'
  },
  {
    title: 'Ngân hàng (5)',
    dataIndex: 'totalPaymentBank',
    highlight: true
  },
  {
    title: 'Thanh toán khác (6)',
    dataIndex: 'totalPaymentOther'
  }
];
const totalAmountPayment: any = [
  {
    title: <SyncAltIcon />,
    dataIndex: 'totalTransactionPayment'
  },
  {
    title: 'Tiền mặt [bán hàng] (1)',
    dataIndex: 'totalTransactionPaymentForSales',
    highlight: true
  },
  {
    title: 'Tiền mặt [nạp thẻ] (2)',
    dataIndex: 'totalTransactionPaymentCard'
  },
  {
    title: 'Thẻ thành viên (3)',
    dataIndex: 'totalTransactionPaymentBuyCard',
    highlight: true
  },
  {
    title: 'Ví điện tử (4)',
    dataIndex: 'null'
  },
  {
    title: 'Momo:',
    dataIndex: 'totalTransactionPaymentE_Wallet_Momo',
    fontSize: 'small'
  },
  {
    title: 'Grab Pay',
    dataIndex: 'totalTransactionPaymentE_Wallet_GrabPay',
    fontSize: 'small'
  },
  {
    title: 'Grab Food',
    dataIndex: 'totalTransactionPaymentE_Wallet_GrabFood',
    fontSize: 'small'
  },
  {
    title: 'VN Pay',
    dataIndex: 'totalTransactionPaymentE_Wallet_VNPay',
    fontSize: 'small'
  },
  {
    title: 'Baemin',
    dataIndex: 'totalTransactionPaymentE_Wallet_Baemin',
    fontSize: 'small'
  },
  {
    title: 'Shopee pay',
    dataIndex: 'totalTransactionPaymentE_Wallet_Shopeepay',
    fontSize: 'small'
  },
  {
    title: 'Zalo pay',
    dataIndex: 'totalTransactionPaymentE_Wallet_ZaloPay',
    fontSize: 'small'
  },
  {
    title: <TimelineIcon />,
    dataIndex: 'totalTransactionPaymentE_Wallet'
  },
  {
    title: 'Ngân hàng (5)',
    dataIndex: 'TotalTransactionPaymentBank',
    highlight: true
  },
  {
    title: 'Thanh toán khác (6)',
    dataIndex: 'totalTransactionPaymentOther'
  }
];

const config = {
  totalSalesRevenue,
  totalSalesInvoice,
  TotalRevenueCardRecharge,
  totalBillOfCard,
  totalRevenue,
  totalBill,
  averageBill,
  averageProduct,
  atStore,
  takeAway,
  delivery,
  cancel,
  totalPayment,
  totalAmountPayment
};

export default config;
