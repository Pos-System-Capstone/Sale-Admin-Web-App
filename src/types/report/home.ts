export type TSummaryReportBase = {
  netSales?: number;
  totalOrders?: number | string;
  lastUpdatedTime?: any;
};

export type TBusinessInsights = {
  topPerformingStore: string;
  topSellingItem: string;
  orders: {
    date: any;
    value: number;
  }[];
  totalTransaction: {
    value: number;
    trend: number;
  };
  grossSales: {
    value: number;
    trend: number;
  };
  netSales: {
    value: number;
    trend: number;
  };
  avgTransactionAmount: {
    value: number;
    trend: number;
  };
  totalCustomers: any;
};
