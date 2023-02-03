import { TCollection } from 'types/collection';
import { TProductCollection } from 'types/product-collection';
import { BaseReponse } from 'types/response';
import request from 'utils/axios';
import { generateAPIWithPaging } from './utils';

const getProductsInCollection = (collectionId: string, params?: any) =>
  request.get<BaseReponse<TProductCollection>>(`/collections/${collectionId}/products`);

const collectionApi = {
  ...generateAPIWithPaging<TCollection>('categories'),
  getProductsInCollection
};

export default collectionApi;
