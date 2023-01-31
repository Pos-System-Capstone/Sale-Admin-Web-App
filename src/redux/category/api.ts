import request from 'utils/axios';
import { TCategory } from 'types/category';

export const getCategories = (params: any) => request.get<TCategory>('/categories', { params });

export const getCategoyById = (cateId: number) => request.get<TCategory>(`/categories/${cateId}`);

export const deleteCategoyById = (cateId: string) => request.delete<any>(`/categories/${cateId}`);

export const addCategoy = (values: Omit<TCategory, 'cate_id'>) =>
  request.post<number>(`/categories`, values);

export const editCategory = (cateId: number, data: TCategory) =>
  request.put<any>(`/categories/${cateId}`, data);
