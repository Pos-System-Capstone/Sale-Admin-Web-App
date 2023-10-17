/* eslint-disable prettier/prettier */
import { TActionBase, TActionCreate } from 'types/promotion/action';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const get = (params?: any) => request.get<BaseReponse<TActionBase>>(`/actions`, { params });

const createAction = (data?: TActionCreate) => request.post<TActionBase>(`/actions`, data);

const getActionById = (id?: string) => request.get<TActionBase>(`/actions/${id}`);

const actionApi = { get, createAction, getActionById };

export default actionApi;
