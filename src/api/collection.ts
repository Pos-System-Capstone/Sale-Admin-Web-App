import { TCollection } from 'types/collection';
import { BaseReponse } from 'types/response';
import request from 'utils/axios';
import { generateAPIWithPaging } from './utils';
import { TProduct } from 'types/product';

const getProductsInCollection = (collectionId: string, params?: any) => {
  return request.get<BaseReponse<TProduct>>(`/collections/${collectionId}/products`, {
    params
  });
};
const getCollectionById = (id: string, params?: any) => {
  return request.get<TCollection>(`/collections/${id}`, { params });
};
const addProductsToCollection = (id: string, values: string[]) =>
  request.post<string[]>(`/collections/${id}/products`, values);

const collectionApi = {
  ...generateAPIWithPaging<TCollection>('collections'),
  getCollectionById,
  getProductsInCollection,
  addProductsToCollection
};

export default collectionApi;
