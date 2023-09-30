import { TProductPromotion } from 'types/promotion/product';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getProduct = (params?: any) =>
  request.get<BaseReponse<TProductPromotion>>(`/product/brand`, { params });

// const createPromotion = (data?: any) =>
//   request.post<BaseReponse<TPromotionBase>>(`/product`, data);

const productPromotionApi = { getProduct };

export default productPromotionApi;
