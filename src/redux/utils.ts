import { AxiosResponse } from 'axios';
import { BaseReponse, TRequestPaging } from 'types/response';
import request from 'utils/axios';

type Params = Partial<TRequestPaging> & {
  [key: string]: any;
};

export interface BaseApi<T> {
  get: (params?: Params) => Promise<AxiosResponse<T[]>>;
  create: (data: Partial<T>) => Promise<AxiosResponse<T>>;
  getById: (id: any, params?: Params) => Promise<AxiosResponse<T>>;
  delete: (id: any) => Promise<AxiosResponse<any>>;
  update: (id: any, data: T) => Promise<AxiosResponse<any>>;
}
export interface BaseApiWithPaging<T> {
  get: (params?: Params) => Promise<AxiosResponse<BaseReponse<T>>>;
  create: (data: Partial<T>) => Promise<AxiosResponse<T>>;
  getById: (id: any, params?: Params) => Promise<AxiosResponse<T>>;
  delete: (id: any) => Promise<AxiosResponse<any>>;
  update: (id: any, data: T) => Promise<AxiosResponse<any>>;
}

export function generateAPI<T>(resource: string): BaseApi<T> {
  return {
    get: (params) =>
      request.get<T[]>(`/${resource}`, {
        params
      }),
    getById: (id, params) =>
      request.get<T>(`/${resource}/${id}`, {
        params
      }),
    delete: (id) => request.delete<any>(`/${resource}/${id}`),
    create: (data) => request.post<T>(`/${resource}`, data),
    update: (id, data) => request.put<T>(`/${resource}/${id}`, data)
  };
}

export function generateAPIWithPaging<T>(resource: string): BaseApiWithPaging<T> {
  return {
    get: (params) =>
      request.get<BaseReponse<T>>(`/${resource}`, {
        params
      }),
    getById: (id, params) =>
      request.get<T>(`/${resource}/${id}`, {
        params
      }),
    delete: (id) => request.delete<any>(`/${resource}/${id}`),
    create: (data) => request.post<T>(`/${resource}`, data),
    update: (id, data) => request.put<T>(`/${resource}/${id}`, data)
  };
}
