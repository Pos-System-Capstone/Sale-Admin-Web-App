import { TActionBase } from './action';
import { TConditionBase } from './condition';

export type TPromotionBase = {
  promotionId: string;
  brandId: string;
  promotionCode: string;
  promotionName?: string;
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

export type TPromotionCreate = {
  brandId: string;
  promotionCode: string;
  promotionName: string;
  actionType: number;
  postActionType: number;
  imgUrl: string;
  description: string;
  exclusive: number;
  applyBy: number;
  startDate: any;
  endDate: any;
  saleMode: number;
  gender: number;
  paymentMethod: number | number[];
  forHoliday: number;
  forMembership: number;
  dayFilter: number | number[];
  hourFilter: number | number[];
  status: number;
  hasVoucher: boolean;
  isAuto: boolean;
  allDay: boolean;
  allHour: boolean;
  // promotionType: number;
  storeIdMappings: string[];
  memberLevelIdMappings: string[];
  chanelIdMappings: string[];
};

export type TCreatePromotionTier = {
  conditionRuleId: string;
  actionId: string;
  promotionId: string;
  voucherGroupId: string;
  summary: string;
  priority: number;
  moreQuantity: number;
};

export type TUpdatePromotionTier = {
  promotionTierId: string;
  conditionRuleId: string;
  actionId: string;
  promotionId: string;
  voucherGroupId: string;
  summary: string;
  priority: number;
  moreQuantity: number;
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
