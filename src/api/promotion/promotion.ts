import useLocales from 'hooks/useLocales';
import { TBasePromotionTier, TPromotionBase, TPromotionUpdate } from 'types/promotion/promotion';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

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
    },
    {
      value: 10,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.getPointMember'
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
    { value: 1, label: translate('promotionSystem.promotion.createPromotion.automatic') },
    { value: 2, label: translate('promotionSystem.promotion.createPromotion.usingCode') },
    { value: 3, label: translate('promotionSystem.promotion.createPromotion.usingVoucher') },
    { value: null, label: '' }
  ];
};

const getPromotion = (params?: any) =>
  request.get<BaseReponse<TPromotionBase>>(`/promotions`, { params });

const createPromotion = (data?: any) =>
  request.post<BaseReponse<TPromotionBase>>(`/promotions`, data);

const createPromotionTier = (data?: any) =>
  request.post<BaseReponse<TBasePromotionTier>>(`/promotion-tiers`, data);

const updatePromotionTier = (id: string, data?: any) =>
  request.put<TBasePromotionTier>(`/promotion-tiers/${id}`, data);

const updatePromotion = (id: string, data?: any) =>
  request.patch<TPromotionUpdate>(`/promotions/${id}`, data);

const getPromotionById = (id?: string) => request.get<TPromotionBase>(`/promotions/${id}`);

const promotionApi = {
  getPromotion,
  createPromotion,
  getPromotionById,
  createPromotionTier,
  updatePromotionTier,
  updatePromotion
};

export default promotionApi;
