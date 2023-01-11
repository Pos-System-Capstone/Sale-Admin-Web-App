export type TProductSaleReportBase = {
  storeId?: any;
  productName?: string;
  productCode?: string;
  cateName?: string;
  productId?: number;
  quantity?: number;
  unitPrice?: number;
  unitPriceNoVat?: number;
  unit?: string;
  totalPriceBeforeVat?: number;
  vat?: number;
  discount?: number;
  percent?: number;
  updatedAt?: any;
  version?: number;
  totalBeforeDiscount?: number;
  totalAfterDiscount?: number;
};

export type TProductLineBase = {
  startTime?: any;
  productId?: number;
  cateId?: number;
  cateName?: any;
  productName?: any;
  quantity?: number;
  quantityAtStore?: number;
  quantityTakeAway?: number;
  quantityDelivery?: number;
  totalPrice?: number;
  percent?: number;
  discount?: number;
  totalOrder?: number;
};

export type TProductListBase = {
  productId?: number;
  productName?: any;
};
