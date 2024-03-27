import { TPStore } from 'types/promotion/store';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;
const getStores = (params?: any) => request.get<BaseReponse<TPStore>>(`/stores`, { params });
const getStoreById = (id: string | undefined, params?: any) =>
  request.get<BaseReponse<TPStore>>(`/stores/${id}`, { params });

const createStores = (data?: any) => request.post<BaseReponse<TPStore>>(`/stores`, data);
const updateStores = (id: string | undefined, data?: any) =>
  request.post<BaseReponse<TPStore>>(`/stores/${id}`, { data });

const storePromotionApi = {
  getStores,
  updateStores,
  getStoreById,
  createStores
};

export default storePromotionApi;
