export type TActionBase = {
  actionId?: any;
  actionType?: any;
  discountQuantity?: any;
  discountAmount?: any;
  discountPercentage?: any;
  fixedPrice?: any;
  maxAmount?: any;
  minPriceAfter?: any;
  orderLadderProduct?: any;
  ladderPrice?: any;
  bundlePrice?: any;
  bundleQuantity?: any;
  bundleStrategy?: any;
  delFlg?: any;
  insDate?: any;
  updDate?: any;
  name?: any;
  brandId?: any;
  brand?: any;
  actionProductMapping?: [];
  promotionTier?: [];
  voucherGroup?: [];
};
export interface ActionCreate {
  name: string;
  brandId: string;
  actionType: number;
  discountType: number;
  discountQuantity: number;
  discountAmount: number;
  discountPercentage: number;
  fixedPrice: number;
  maxAmount: number;
  minPriceAfter: number;
  orderLadderProduct: number;
  ladderPrice: number;
  bundlePrice: number;
  bundleQuantity: number;
  bundleStrategy: number;
  listProduct: ListProduct[];
}
export interface ListProduct {
  productId: string;
  quantity: number;
}