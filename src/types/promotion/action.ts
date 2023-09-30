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
  bonusPointRate: number;
  actionProductMapping?: [];
  promotionTier?: [];
  voucherGroup?: [];
};
export type TActionCreate = {
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
  bonusPointRate: number;
  listProduct?: ListProduct[];
};

export type ListProduct = {
  productId: string;
  quantity: number;
};

export const ACTION_TYPE_DATA = () => {
  return [
    {
      value: 1,
      label: 'Giảm giá đơn hàng'
    },
    {
      value: 2,
      label: 'Giảm phần trăm đơn hàng'
    },
    {
      value: 3,
      label: 'Giảm phí shíp'
    },
    {
      value: 4,
      label: 'Giảm giá sản phẩm'
    },
    {
      value: 5,
      label: 'Giảm phần trăm sản phẩm'
    },
    {
      value: 6,
      label: 'Unit'
    },
    {
      value: 7,
      label: 'Giá cố định'
    },
    {
      value: 8,
      label: 'Ladder'
    },
    {
      value: 9,
      label: 'Bundle'
    }
  ];
};
