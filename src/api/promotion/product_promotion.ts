import { TProductPromotionAPI } from 'types/promotion/productPromotion';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getProduct = (params?: any) =>
  request.get<BaseReponse<TProductPromotionAPI>>(`/product`, { params });

const deleteProduct = (id: string | undefined, data?: TProductPromotionAPI) =>
  request.delete<TProductPromotionAPI>(`/product/${id}`);

const getProductById = (id: string | undefined) =>
  request.get<TProductPromotionAPI>(`/product/${id}`);

const updateProduct = (id: string | undefined, data?: TProductPromotionAPI) =>
  request.put<TProductPromotionAPI>(`/product/${id}`, data);

const addProduct = (data?: TProductPromotionAPI) =>
  request.post<TProductPromotionAPI>(`/product`, data);

const productPromotion = { getProduct, deleteProduct, updateProduct, getProductById, addProduct };

export default productPromotion;
