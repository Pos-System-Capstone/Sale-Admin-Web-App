// export type VoucherActionType = {
//   actionId?: string;
//   actionType?: number;
//   discountQuantity?: number;
//   discountAmount?: number;
//   discountPercentage?: number;
//   fixedPrice?: number;
//   maxAmount?: number;
//   minPriceAfter?: number;
//   orderLadderProduct?: number;
//   ladderPrice?: number;
//   bundlePrice?: number;
//   bundleQuantity?: number;
//   bundleStrategy?: number;
//   delFlg?: boolean;
//   insDate?: Date;
//   updDate?: Date;
//   name?: string;
//   brandId?: string;
//   brand?: any;
//   actionProductMapping?: [];
//   promotionTier?: PromotionTier[];
//   voucherGroup?: [];
// };

// export type TVoucherBase = {
//   voucherGroupId?: string;
//   brandId?: string;
//   voucherName?: string;
//   quantity?: number;
//   usedQuantity?: number;
//   redempedQuantity?: number;
//   delFlg?: boolean;
//   insDate?: Date;
//   updDate?: Date;
//   charset?: string;
//   postfix?: string;
//   prefix?: string;
//   customCharset?: string;
//   actionId?: string;
//   giftId?: any;
//   codeLength?: number;
//   imgUrl?: any;
//   action?: VoucherActionType[];
//   brand?: any;
//   gift?: any;
//   promotionTier?: PromotionTier[];
//   voucher?: [];
// };

// export type PromotionTier = {
//   promotionTierId?: string;
//   conditionRuleId?: string;
//   actionId?: string;
//   promotionId?: string;
//   giftId?: any;
//   insDate?: Date;
//   updDate?: Date;
//   summary?: any;
//   tierIndex?: number;
//   voucherGroupId?: string;
//   priority?: number;
//   voucherQuantity?: number;
//   action?: any;
//   conditionRule?: any;
//   gift?: any;
//   promotion?: any;
// };

export type TVoucherBase = {
  delFlg?: any;
  insDate?: any;
  updDate?: any;
  voucherGroupId?: any;
  promotionId?: any;
  brandId?: any;
  voucherName?: any;
  quantity?: any;
  usedQuantity?: any;
  redempedQuantity?: any;
  charset?: any;
  postfix?: any;
  prefix?: any;
  customCharset?: any;
  conditionRuleId?: any;
  actionId?: any;
  giftId?: any;
  codeLength?: any;
  imgUrl?: any;
  voucherChannel?: VoucherChannel[];
};

export type TVoucherGroupMoreCreate = {
  voucherGroupId?: string;
  quantity: number;
};

export type TApplyVoucher = {
  voucherGroupId: string;
  quantity: number;
  membershipId: string;
};

export type TVoucherCreate = {
  delFlg: boolean;
  insDate: string;
  updDate: string;
  voucherGroupId: string;
  promotionId: string;
  brandId: string;
  voucherName: string;
  quantity: number;
  usedQuantity: number;
  redempedQuantity: number;
  charset: string;
  postfix: string;
  prefix: string;
  customCharset: string;
  conditionRuleId: string;
  actionId: string;
  giftId: string;
  codeLength: number;
  imgUrl: string;
  voucherChannel?: VoucherChannel[]; // Thêm dấu ? để làm cho nó trở thành tùy chọn
};

export type VoucherChannel = {
  delFlg: boolean;
  insDate: string;
  updDate: string;
  voucherChannelId: string;
  voucherGroupId: string;
  promotionId: string;
  channelId: string;
};

export type TVoucher = {
  voucherId?: any;
  voucherCode?: any;
  channelId?: any;
  storeId?: any;
  voucherGroupId?: any;
  membershipId?: any;
  isUsed?: any;
  isRedemped?: any;
  usedDate?: any;
  redempedDate?: any;
  insDate?: any;
  updDate?: any;
  promotionId?: any;
  index?: any;
  gameCampaignId?: any;
  promotionTierId?: any;
  orderId?: any;
  transactionId?: any;
  channel?: any;
  gameCampaign?: any;
  promotion?: any;
  store?: any;
  voucherGroup?: any;
};
