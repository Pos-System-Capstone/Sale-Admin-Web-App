import { TCategory, TCategoryExtra } from 'types/category';
import { TModifier } from 'types/Modifier';
import { TProductBase } from 'types/product';
import { BaseReponse } from 'types/response';
import request from 'utils/axios';
import { generateAPIWithPaging } from './utils';

const getExtraCategoriesFromCateId = (catId: number, params?: any) => {
  return request.get<BaseReponse<TCategoryExtra>>(`/categories/${catId}/extras`, { params });
};

const getProductsInCategory = (catId: number, params?: any) => {
  return request.get<BaseReponse<TProductBase>>(`/categories/${catId}/products`, { params });
};

const getChildByCategoryId = (catId: number) => {
  return request.get<TCategory[]>(`/categories/${catId}/childs`);
};

const getModifiersOfCategory = (catId: number) =>
  request.get<TModifier[]>(`/categories/${catId}/modifiers`);

const addModifiersOfCategory = (catId: number, values: Omit<TModifier, 'id'>) =>
  request.post<number>(`/categories/${catId}/modifiers`, values);

const updateModifiersOfCategory = (
  catId: number,
  modifierId: number,
  values: Omit<TModifier, 'id'>
) => request.put<number>(`/categories/${catId}/modifiers/${modifierId}`, values);

const deleteModifiersOfCategory = (catId: number, modifierId: number) =>
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
