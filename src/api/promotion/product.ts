import { TProductPromotion } from 'types/promotion/product';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getProduct = (params?: any) =>
  request.get<BaseReponse<TProductPromotion>>(`/product/brand`, { params });

const productPromotionApi = { getProduct };

export default productPromotionApi;
