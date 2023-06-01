import { Menu } from './menu';

export enum StoreStatus {
  ACTIVE = 'Active',
  DEACTIVE = 'Deactive'
}

export type TStore = {
  id: string;
  brandId: string;
  name: string;
  shortName: string;
  email: string;
  address: string;
  status: StoreStatus;
};

export type TStoreCreate = {
  name: string;
  shortName: string;
  email: string;
  phone: string;
  code: string;
  address: string;
};

export type TStoreUpdate = {
  name?: string;
  shortName?: string;
  email?: string;
  phone?: string;
  code?: string;
  address?: string;
};

export type TStoreDetail = {
  id: string;
  brandId: string;
  name: string;
  shortName: string;
  email: string;
  address: string;
  status: StoreStatus;
  phone: string;
  code: string;
};

export type TStoreInMenu = {
  id: string;
  priority: number;
  dateFilter: number;
  startTime: number;
  endTime: number;
};

export type TStoreInMenuDetail = {
  id: string;
  name: string;
  shortName: string;
  address: string;
};

export type StoreInMenu = {
  menu_in_store_id: number;
  menu_id?: number;
  menu_name?: string | null;
  time_ranges: string[][];
  day_filters: number[];
  store?: {
    id: number;
    store_name: string;
  };
  allDay?: boolean;
  start_time?: any;
  end_time?: any;
  priority: number;
  create_at?: any;
};

export type MenuInStoreAdmin = {
  id: number;
  store_id?: any;
  name: string;
  menus: Menu[];
};

export type TSession = {
  id: string;
  startDateTime: string;
  endDateTime: string;
  name: string;
  numberOfOrders: number;
  currentCashInVault: number;
  totalFinalAmount: number;
};
export type TSessionCreate = {
  name: string;
  startTime: string;
  endTime: string;
};
export type TSessionDetailUpdate = {
  startTime: string;
  endTime: string;
  name: string;
};

export type TSessionDetail = {
  sessionId: string;
  startDateTime: string;
  endDateTime: string;
  name: string;
  numberOfOrders: number;
  totalAmount: number;
  totalPromotion: number;
  currentCashInVault: number;
  initCashInVault: number;
  profitAmount: number;
  totalDiscountAmount: number;
};

export type StoreReport = {
  storeId: string;
  categoryReports: CategoryReport[];
  totalAmount: number;
  totalDiscount: number;
  vatAmount: number;
  finalAmount: number;
  productCosAmount: number;
  totalRevenue: number;
  inStoreAmount: number;
  deliAmount: number;
  takeAwayAmount: number;
  totalProduct: number;
  totalOrder: number;
  totalOrderInStore: number;
  totalOrderTakeAway: number;
  totalOrderDeli: number;
  averageBill: number;
  totalCash: number;
  totalMomo: number;
  totalBanking: number;
  totalVisa: number;
  cashAmount: number;
  momoAmount: number;
  bankingAmount: number;
  visaAmount: number;
  timeLine: number[];
  totalOrderTimeLine: number[];
  totalAmountTimeLine: number[];
  totalSizeS: number;
  totalSizeM: number;
  totalSizeL: number;
  totalAmountSizeS: number;
  totalAmountSizeM: number;
  totalAmountSizeL: number;
  totalProductDiscount: number;
  totalPromotionDiscount: number;
  totalPromotionUsed: number;
};

export type CategoryReport = {
  id: string;
  name: string;
  totalProduct: number;
  totalAmount: number;
  totalDiscount: number;
  finalAmount: number;
  productReports: ProductReport[];
};

export type ProductReport = {
  id: string;
  name: string;
  quantity: number;
  totalAmount: number;
  totalDiscount: number;
  finalAmount: number;
};

export type SessionReport = {
  totalAmount: number;
  totalDiscount: number;
  finalAmount: number;
  totalOrder: number;
  totalCash: number;
  totalBanking: number;
  totalMomo: number;
  totalVisa: number;
  cashAmount: number;
  momoAmount: number;
  bankingAmount: number;
  visaAmount: number;
};
