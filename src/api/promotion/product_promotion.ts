import { TProductPromotionAPI } from 'types/promotion/productPromotion';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getProduct = (params?: any) =>
  request.get<BaseReponse<TProductPromotionAPI>>(`/product`, { params });

const deleteProduct = (id: string | undefined, data?: TProductPromotionAPI) =>
  request.delete<TProductPromotionAPI>(`/product/${id}`);

const productPromotion = { getProduct, deleteProduct };

export default productPromotion;
