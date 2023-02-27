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

const getExtraCategoriesInProductCategory = (catId: string, params?: any) => {
  return request.get<BaseReponse<TCategory>>(`/categories/${catId}/extra-categories`, { params });
};

const getModifiersOfCategory = (catId: string) =>
  request.get<TModifier[]>(`/categories/${catId}/modifiers`);

const addExtraCategoriesToProductCategory = (catId: string, values: string[]) =>
  request.post<string[]>(`/categories/${catId}/extra-categories`, values);

const categoryApi = {
  ...generateAPIWithPaging<TCategory>('categories'),
  getExtraCategoriesFromCateId,
  getModifiersOfCategory,
  addExtraCategoriesToProductCategory,
  getExtraCategoriesInProductCategory,
  getProductsInCategory
};

export default categoryApi;
