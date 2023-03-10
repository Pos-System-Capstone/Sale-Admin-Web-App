export type TRevenueOverviewBase = {
  totalRevenue?: number;
  totalRevenueWithoutCard?: number;
  totalRevenueWithDiscount?: number;
  totalDiscount?: number;
  totalDiscount100?: number;
  totalRevenueWithoutDiscountAndCard?: number;
  totalRevenueCard?: number;
  totalRevenuePreCancel?: number;
  totalRevenueAfterCancel?: number;
  totalOrder?: number;
  totalOrderAtStore?: number;
  totalRevenueAtStore?: number;
  totalRevenueAtStore2?: number;
  totalOrderTakeAway?: number;
  totalRevenueTakeAway?: number;
  totalOrderDelivery?: number;
  totalRevenueDelivery?: number;
  totalOrderCard?: number;
  totalRevenueOrderCard?: number;
  totalOrderPreCancel?: number;
  totalOrderAfterCancel?: number;
  avgRevenueOrder?: number;
  avgRevenueOrderAtStore?: number;
  avgRevenueOrderTakeAway?: number;
  avgRevenueOrderDelivery?: number;
  avgProductOrder?: number;
  avgProductOrderTakeAway?: number;
  avgProductOrderAtStore?: number;
  avgProductOrderDelivery?: number;
};

export type TPaymentOverviewBase = {
  totalPayment?: number;
  totalTransactionPayment?: number;
  totalPaymentForSales?: number;
  totalTransactionExchangeCash?: number;
  totalTransactionPaymentForSales?: number;
  totalPaymentCard?: number;
  totalTransactionPaymentCard?: number;
  totalPaymentE_Wallet?: number;
  totalTransactionPaymentE_Wallet?: number;
  totalTransactionPaymentE_Wallet_GrabPay?: number;
  totalPaymentE_Wallet_GrabPay?: number;
  totalTransactionPaymentE_Wallet_GrabFood?: number;
  totalTransactionPaymentE_Wallet_VnPay?: number;
  totalPaymentE_Wallet_GrabFood?: number;
  totalPaymentE_Wallet_VNPay?: number;
  totalPaymentE_Wallet_Momo?: number;
  totalPaymentE_Wallet_ZaloPay?: number;
  totalTransactionPaymentE_Wallet_Momo?: number;
  totalTransactionPaymentE_Wallet_ZaloPay?: number;
  totalPaymentE_Wallet_Baemin?: number;
  totalTransactionPaymentE_Wallet_Baemin?: number;
  totalPaymentE_Wallet_Shopeepay?: number;
  totalTransactionPaymentE_Wallet_Shopeepay?: number;
  totalPaymentBank?: number;
  totalTransactionPaymentBank?: number;
  totalPaymentOther?: number;
  totalTransactionPaymentOther?: number;
  totalTransactionPaymentBuyCard?: number;
  totalPaymentBuyCard?: number;
};
