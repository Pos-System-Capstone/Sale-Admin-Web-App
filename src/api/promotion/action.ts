/* eslint-disable prettier/prettier */
import { TActionBase, TActionCreate, TActionUpdate } from 'types/promotion/action';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const get = (params?: any) => request.get<BaseReponse<TActionBase>>(`/actions`, { params });

const createAction = (data?: TActionCreate) => request.post<TActionBase>(`/actions`, data);


const updateAction = (id: string | undefined, data?: TActionUpdate) =>
    request.put<TActionBase>(`/actions/${id}`, data);

const deleteAction = (id: string | undefined, data?: TActionUpdate) =>
    request.delete<TActionBase>(`/actions/${id}`);

const getActionById = (id?: string) =>
    request.get<TActionBase>(`/actions/${id}`);

const actionApi = { get, createAction, getActionById, updateAction, deleteAction };

export default actionApi;
