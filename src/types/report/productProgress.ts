export type ProductProgressBase = {
  startTime?: string;
  productId?: number;
  cateId?: number;
  cateName?: string;
  productName?: string;
  quantity?: number;
  quantityAtStore?: number;
  quantityTakeAway?: number;
  quantityDelivery?: number;
  totalPrice?: number;
  percent?: number;
  discount?: number;
  totalOrder?: number;
};
