import request from '../../utils/axios';

export const getPromoById = (promotionId: number) => request.get(`/promotions/${promotionId}`);
