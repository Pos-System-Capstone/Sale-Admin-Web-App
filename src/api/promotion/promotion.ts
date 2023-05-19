import useLocales from 'hooks/useLocales';
import { TPromotionBase } from 'types/promotion/promotion';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.webAdmin;

export const GIFT_TYPE_DATA = () => {
  const { translate } = useLocales();
  return [
    {
      value: 1,
      label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftVoucher')}`
    },
    {
      value: 2,
      label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftProduct')}`
    },
    {
      value: 3,
      label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftPoint')}`
    },
    {
      value: 4,
      label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftGameCode')}`
    }
  ];
};
export const DISCOUNT_TYPE_DATA = () => {
  const { translate } = useLocales();
  return [
    {
      value: 1,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountAmountOfOrder'
      )}`
    },
    {
      value: 2,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountPercentageOfOrder'
      )}`
    },
    {
      value: 3,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountShippingFeeOfOrder'
      )}`
    },
    {
      value: 4,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountAmountOfItem'
      )}`
    },
    {
      value: 5,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountPercentOfItem'
      )}`
    },
    {
      value: 6,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountUnitOfItem'
      )}`
    },
    {
      value: 7,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.fixedPriceOfItem'
      )}`
    },
    {
      value: 8,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.ladderPriceOfItem'
      )}`
    },
    {
      value: 9,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.bundlePriceOfItem'
      )}`
    }
  ];
};
export const STATUS_TYPE_DATA = () => {
  const { translate } = useLocales();
  return [
    { value: 0, label: translate('promotionSystem.promotion.table.statusType.all') },
    { value: 1, label: translate('promotionSystem.promotion.table.statusType.draft') },
    { value: 2, label: translate('promotionSystem.promotion.table.statusType.published') },
    { value: 3, label: translate('promotionSystem.promotion.table.statusType.unPublished') },
    { value: 4, label: translate('promotionSystem.promotion.table.statusType.expired') }
  ];
};
export const PROMOTION_TYPE_DATA = () => {
  const { translate } = useLocales();
  return [
    { value: 1, label: translate('promotionSystem.promotion.createPromotion.usingVoucher') },
    { value: 2, label: translate('promotionSystem.promotion.createPromotion.usingCode') },
    { value: 3, label: translate('promotionSystem.promotion.createPromotion.automatic') },
    { value: null, label: '' }
  ];
};

const getPromotion = (params?: any) =>
  request.get<BaseReponse<TPromotionBase>>(`/promotions`, { params });

const createPromotion = (data?: any) =>
  request.post<BaseReponse<TPromotionBase>>(`/promotions`, data);

const promotionApi = { getPromotion, createPromotion };

export default promotionApi;
