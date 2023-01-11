import { TProductCollection } from 'types/product-collection';
import { BaseReponse } from 'types/response';
import request from 'utils/axios';

const getProductsInCollection = (collectionId: number, params?: any) =>
  request.get<BaseReponse<TProductCollection>>(`/admin/collections/${collectionId}/products`);

const productInCollectionApi = {
  getProductsInCollection
};

export default productInCollectionApi;
