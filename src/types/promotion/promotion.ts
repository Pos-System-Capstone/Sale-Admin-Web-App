import { TActionBase } from './action';
import { TConditionBase } from './condition';

export type TPromotionBase = {
  promotionId: string;
  brandId: string;
  promotionCode: string;
  promotionName: string;
  actionType: number;
  postActionType: number;
  imgUrl: any;
  description: string;
  startDate: any;
  endDate: any;
  exclusive: number;
  applyBy: number;
  saleMode: number;
  gender: number;
  paymentMethod: any;
  forHoliday: number;
  forMembership: number;
  dayFilter: any;
  hourFilter: any;
  status: number;
  delFlg: boolean;
  insDate: string;
  updDate: string;
  hasVoucher: boolean;
  unlimitedDate: boolean;
  isAuto: boolean;
  promotionType: number;
  brand: any;
  gameCampaign: any[];
  memberLevelMapping: MemberLevelMapping[];
  promotionChannelMapping: PromotionChannelMapping[];
  promotionStoreMapping: PromotionStoreMapping[];
  promotionTier: PromotionTier[];
  voucher: any[];
};

export type MemberLevelMapping = {
  id: string;
  memberLevelId: string;
  promotionId: string;
  insDate: string;
  updDate: string;
  memberLevel: any;
};

export type PromotionStoreMapping = {
  id: string;
  storeId: string;
  promotionId: string;
  insDate: string;
  updDate: string;
  store: any;
};

export type PromotionTier = {
  promotionTierId: string;
  conditionRuleId: string;
  actionId: string;
  promotionId: string;
  giftId: any;
  insDate: string;
  updDate: string;
  summary: any;
  tierIndex: number;
  voucherGroupId: any;
  priority: number;
  voucherQuantity: number;
  productCode: any;
  action: TActionBase;
  conditionRule: TConditionBase;
  gift: any;
  voucherGroup: any;
};

export type PromotionChannelMapping = {
  promotionChannelId?: string;
  promotionId?: string;
  channelId?: string;
  insDate?: Date;
  updDate?: Date;
  channel?: any;
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
