/* eslint-disable prettier/prettier */
import { TActionBase, TActionCreate } from 'types/promotion/action';
import { TGiftBase } from 'types/promotion/gift';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const get = (params?: any) => request.get<BaseReponse<TGiftBase>>(`/post-actions`, { params });

const createAction = (data?: TActionCreate) =>
    request.post<TActionBase>(`/post-actions`, data);

const getActionById = (id?: string) =>
    request.get<TActionBase>(`/post-actions/${id}`);
const giftApi = { get, createAction, getActionById };

export default giftApi;