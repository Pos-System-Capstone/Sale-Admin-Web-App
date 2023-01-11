import { CreateComboForm } from 'types/product';
import request from '../../utils/axios';

export const createMasterProd = (data: any) => request.post<number>(`/admin/products`, data);

export const getProdById = (id: number) => request.get(`/admin/products/${id}`);

export const updateProdById = (id: number, data: any) => request.put(`/admin/products/${id}`, data);

export const deleteProdById = (id: number) => request.delete(`/admin/products/${id}`);

export const getAllProduct = (params: any = {}) =>
  request.get('/admin/products', {
    params
  });

export const getComboById = (comboId: number) =>
  request.get<CreateComboForm>(`/collections/${comboId}`);
