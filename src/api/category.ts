import { TCategory, TCategoryExtra } from 'types/category';
import { TModifier } from 'types/Modifier';
import { TProductBase } from 'types/product';
import { BaseReponse } from 'types/response';
import request from 'utils/axios';
import { generateAPIWithPaging } from './utils';

const getExtraCategoriesFromCateId = (catId: string, params?: any) => {
  return request.get<BaseReponse<TCategoryExtra>>(`/categories/${catId}/extras`, { params });
};

const getProductsInCategory = (catId: string, params?: any) => {
  return request.get<BaseReponse<TProductBase>>(`/categories/${catId}/products`, { params });
};

const getChildByCategoryId = (catId: string) => {
  return request.get<TCategory[]>(`/categories/${catId}/childs`);
};

const getModifiersOfCategory = (catId: string) =>
  request.get<TModifier[]>(`/categories/${catId}/modifiers`);

const addModifiersOfCategory = (catId: string, values: Omit<TModifier, 'id'>) =>
  request.post<number>(`/categories/${catId}/modifiers`, values);

const updateModifiersOfCategory = (
  catId: string,
  modifierId: number,
  values: Omit<TModifier, 'id'>
) => request.put<number>(`/categories/${catId}/modifiers/${modifierId}`, values);

const deleteModifiersOfCategory = (catId: string, modifierId: number) =>
  request.delete<number>(`/categories/${catId}/modifiers/${modifierId}`);

const categoryApi = {
  ...generateAPIWithPaging<TCategory>('categories'),
  getExtraCategoriesFromCateId,
  getModifiersOfCategory,
  addModifiersOfCategory,
  getChildByCategoryId,
  updateModifiersOfCategory,
  deleteModifiersOfCategory,
  getProductsInCategory
};

export default categoryApi;
