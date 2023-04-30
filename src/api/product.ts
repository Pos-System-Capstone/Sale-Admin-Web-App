import { CreateGroupProductForm, ProductsInGroup, TGroupProduct, TProduct } from 'types/product';
import { generateAPIWithPaging } from './utils';
import request from 'utils/axios';
import { BaseReponse } from 'types/response';

const createGroupProduct = (brandId: string, data: CreateGroupProductForm) =>
  request.post<BaseReponse<CreateGroupProductForm>>(`/brands/${brandId}/groupProducts`, data);
const getListGroupProductOfCombo = (brandId: string, productId: string, params?: any) =>
  request.get<TGroupProduct[]>(`/brands/${brandId}/products/${productId}/groupProducts`, {
    params
  });
const updateGroupProductOfComBos = (brandId: string, groupId: string, payload: any) =>
  request.put<TGroupProduct>(`/brands/${brandId}/groupProducts/${groupId}`, payload);

const updateProductInGroup = (productInGroupId: string, groupId: string, payload: any) =>
  request.put<ProductsInGroup>(
    `/groupProducts/${groupId}/productInGroup/${productInGroupId}`,
    payload
  );
const productApi = {
  createGroupProduct,
  getListGroupProductOfCombo,
  updateGroupProductOfComBos,
  updateProductInGroup,
  ...generateAPIWithPaging<TProduct>('products')
};

export default productApi;
