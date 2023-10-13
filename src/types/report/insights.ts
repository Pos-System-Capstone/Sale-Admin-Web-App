interface TrendValue {
  value: number;
  trend: number;
}
interface DateValue {
  date: string;
  value: number;
}
export interface Insights {
  grossSales: TrendValue;
  netSales: TrendValue;
  totalOrders: TrendValue;
  averageTransactionAmount: TrendValue;
  grossSalesDashboard: DateValue[];
  numberOfTransactionsDashboard: DateValue[];
  netSalesDashboard: DateValue[];
  avgTransactionAmountDashboard: DateValue[];
}
