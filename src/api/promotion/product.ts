import { Products } from 'types/promotion/product';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getProduct = (params?: any) =>
  request.get<BaseReponse<Products>>(`/product`, { params });

// const createPromotion = (data?: any) =>
//   request.post<BaseReponse<TPromotionBase>>(`/product`, data);

const productApi = { getProduct };

export default productApi;
