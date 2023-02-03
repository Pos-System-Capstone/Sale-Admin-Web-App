import request from 'utils/axios';
import { TCollection } from 'types/collection';
import { generateAPIWithPaging } from 'redux/utils';
import { TProductBase } from 'types/product';

export const getCollections = (params: any) => request.get<TCollection>('/collections', { params });

export const createCollection = (data: TCollection) =>
  request.post<TCollection>('/collections', data);

export const deleteCollection = (collectionId: string) =>
  request.delete<any>(`/collections/${collectionId}`);

export const updateCollection = (collectionId: string, data: TCollection) =>
  request.put<any>(`/collections/${collectionId}`, data);

export const productCollectionApi = (collectionId: string) =>
  generateAPIWithPaging<TProductBase>(`admin/collections/${collectionId}/products`);

export const getCollectionById = (collectionId: string) =>
  request.get<TCollection>(`/collections/${collectionId}`);
