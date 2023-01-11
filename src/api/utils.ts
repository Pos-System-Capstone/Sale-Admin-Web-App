import { AxiosResponse } from 'axios';
import { BaseReponse, TRequestPaging } from 'types/response';
import requestWebAdmin from 'utils/axios';

export interface BaseApi<T> {
  get: (params?: any) => Promise<AxiosResponse<T[]>>;
  create: (data: Partial<T>) => Promise<AxiosResponse<T>>;
  getById: (id: any, params?: any) => Promise<AxiosResponse<T>>;
  delete: (id: any) => Promise<AxiosResponse<any>>;
  update: (id: any, data: T) => Promise<AxiosResponse<any>>;
}
export interface BaseApiWithPaging<T, Q extends TRequestPaging = TRequestPaging> {
  get: (params?: Q) => Promise<AxiosResponse<BaseReponse<T>>>;
  create: (data: Partial<T>) => Promise<AxiosResponse<any>>;
  getById: (id: any, params?: any) => Promise<AxiosResponse<T>>;
  delete: (id: any) => Promise<AxiosResponse<any>>;
  update: (id: any, data: T) => Promise<AxiosResponse<any>>;
}

export function generateAPI<T>(resource: string): BaseApi<T> {
  return {
    get: (params) =>
      requestWebAdmin.get<T[]>(`/${resource}`, {
        params
      }),
    getById: (id, params) =>
      requestWebAdmin.get<T>(`/${resource}/${id}`, {
        params
      }),
    delete: (id) => requestWebAdmin.delete<any>(`/${resource}/${id}`),
    create: (data) => requestWebAdmin.post<T>(`/${resource}`, data),
    update: (id, data) => requestWebAdmin.put<T>(`/${resource}/${id}`, data)
  };
}

export function generateAPIWithPaging<T, Q extends TRequestPaging = TRequestPaging>(
  resource: string
): BaseApiWithPaging<T, Q> {
  return {
    get: (params?: Q) =>
      requestWebAdmin.get<BaseReponse<T>>(`/${resource}`, {
        params: { ...params }
      }),
    getById: (id, params: Q) =>
      requestWebAdmin.get<T>(`/${resource}/${id}`, {
        params
      }),
    delete: (id) => requestWebAdmin.delete<any>(`/${resource}/${id}`),
    create: (data) => requestWebAdmin.post<BaseReponse<T>>(`/${resource}`, data),
    update: (id, data) => requestWebAdmin.put<T>(`/${resource}/${id}`, data)
  };
}

export const normalizeParams = (filters: any) => {
  const normalized = { ...filters };
  const sort = filters.sort?.split(',');

  if (Array.isArray(sort) && sort.length) {
    normalized.sortBy = sort[0];
    normalized.sortDirection = sort[1];
  }

  const removeEmptyValueParams = Object.fromEntries(
    Object.entries(normalized).filter(([_, v]) => v != null)
  );

  return removeEmptyValueParams;
};
