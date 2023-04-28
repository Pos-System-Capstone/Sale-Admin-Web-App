import { CreateGroupProductForm, TProduct } from 'types/product';
import { generateAPIWithPaging } from './utils';
import request from 'utils/axios';
import { BaseReponse } from 'types/response';

const createGroupProduct = (brandId: string, data: CreateGroupProductForm) =>
  request.post<BaseReponse<CreateGroupProductForm>>(`/brands/${brandId}/groupProducts`, data);
const productApi = {
  createGroupProduct,
  ...generateAPIWithPaging<TProduct>('products')
};

export default productApi;
