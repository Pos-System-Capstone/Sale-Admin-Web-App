export type TPromotionBase = {
  BrandId?: any;
  promotionId?: string;
  brandId?: string;
  promotionCode?: string;
  promotionName?: string;
  actionType?: number;
  // actionType?: number[];
  postActionType?: number;
  imgUrl?: string;
  description?: string;
  startDate?: any;
  endDate?: any;
  exclusive?: any;
  applyBy?: any;
  saleMode?: any;
  gender?: number;
  paymentMethod?: any;
  forHoliday?: number;
  forMembership?: number;
  dayFilter?: number;
  hourFilter?: number;
  status?: number;
  // status?: number[];
  delFlg?: boolean;
  insDate?: Date;
  updDate?: Date;
  hasVoucher?: boolean;
  isAuto?: boolean;
  promotionType?: number;
  brand?: any;
  gameCampaign?: [];
  memberLevelMapping?: [];
  promotionChannelMapping?: PromotionChannelMapping[];
  promotionStoreMapping?: PromotionStoreMapping[];
  promotionTier?: PromotionTier[];
  voucher?: [];
};

export type PromotionChannelMapping = {
  promotionChannelId?: string;
  promotionId?: string;
  channelId?: string;
  insDate?: Date;
  updDate?: Date;
  channel?: any;
};

export type PromotionStoreMapping = {
  id?: string;
  storeId?: string;
  promotionId?: string;
  insDate?: Date;
  updDate?: Date;
  store?: any;
};

export type PromotionTier = {
  promotionTierId?: string;
  conditionRuleId?: string;
  actionId?: string;
  promotionId?: string;
  giftId?: any;
  insDate?: Date;
  updDate?: Date;
  summary?: any;
  tierIndex?: number;
  voucherGroupId?: string;
  priority?: number;
  voucherQuantity?: number;
  action?: any;
  conditionRule?: any;
  gift?: any;
  voucherGroup?: {
    voucherGroupId?: string;
    brandId?: string;
    voucherName?: string;
    quantity?: number;
    usedQuantity?: number;
    redempedQuantity?: number;
    delFlg?: boolean;
    insDate?: Date;
    updDate?: Date;
    charset?: string;
    postfix?: string;
    prefix?: string;
    customCharset?: string;
    actionId?: string;
    giftId?: any;
    codeLength?: number;
    imgUrl?: any;
    action?: any;
    brand?: any;
    gift?: any;
    promotionTier?: [];
    voucher?: [];
  };
};

export type TPromotion = {
  id: string;
  name: string;
  code: string;
  description: string;
  type: string;
  maxDiscount: number;
  minConditionAmount: number;
  discountAmount: number;
  discountPercent: number;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
  dateFilters: string[];
  listProductApply: ListProductApply[];
  status: string;
};

export type ListProductApply = {
  productId: string;
};
export enum PromotionType {
  AMOUNT = 'Amount',
  PRODUCT = 'Product',
  PERCENT = 'Percent',
  AUTO_APPLY = 'AutoApply'
}
