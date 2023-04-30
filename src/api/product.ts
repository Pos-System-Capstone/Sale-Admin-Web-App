import { CreateGroupProductForm, TGroupProduct, TProduct } from 'types/product';
import { generateAPIWithPaging } from './utils';
import request from 'utils/axios';
import { BaseReponse } from 'types/response';

const createGroupProduct = (brandId: string, data: CreateGroupProductForm) =>
  request.post<BaseReponse<CreateGroupProductForm>>(`/brands/${brandId}/groupProducts`, data);
const getListGroupProductOfCombo = (brandId: string, productId: string, params?: any) =>
  request.get<TGroupProduct[]>(`/brands/${brandId}/products/${productId}/groupProducts`, {
    params
  });
const productApi = {
  createGroupProduct,
  getListGroupProductOfCombo,
  ...generateAPIWithPaging<TProduct>('products')
};

export default productApi;
