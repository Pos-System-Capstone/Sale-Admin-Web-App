import { PromotionBase } from 'types/report/promotion';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const getPromotion = (id?: number, params?: any) =>
  request.get<BaseReponse<PromotionBase>>(`promotion-report/${id}`, { params });

const promotionApi = { getPromotion };

export default promotionApi;
