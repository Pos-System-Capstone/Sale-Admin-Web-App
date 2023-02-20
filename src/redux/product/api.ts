import { CreateComboForm } from 'types/product';
import request from '../../utils/axios';

export const createMasterProd = (data: any) => request.post<number>(`/products`, data);

export const getProdById = (id: number) => request.get(`/products/${id}`);

export const updateProdById = (id: string, data: any) => request.put(`/products/${id}`, data);

export const deleteProdById = (id: number) => request.delete(`/products/${id}`);

export const getAllProduct = (params: any = {}) =>
  request.get('/products', {
    params
  });

export const getComboById = (comboId: number) =>
  request.get<CreateComboForm>(`/collections/${comboId}`);
