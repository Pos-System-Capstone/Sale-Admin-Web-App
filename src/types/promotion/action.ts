export interface TActionBase {
  actionId: string;
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
  listProduct: ListProduct[];
  delFlg: boolean;
  insDate: string;
  updDate: string;
}
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

export type TActionUpdate = {
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
    },
    {
      value: 10,
      label: 'Tặng điểm'
    },
    {
      value: 11,
      label: 'Giảm phí shíp phan tram'
    }
  ];
};
