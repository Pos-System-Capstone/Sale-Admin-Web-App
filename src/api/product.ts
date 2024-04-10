import { CreateGroupProductForm, ProductsInGroup, TGroupProduct, TProduct } from 'types/product';
import { generateAPIWithPaging } from './utils';
import request from 'utils/axios';
import { BaseReponse } from 'types/response';
import { TVariant } from 'types/report/variant';

const createGroupProduct = (brandId: string, data: CreateGroupProductForm) =>
  request.post<BaseReponse<CreateGroupProductForm>>(`/brands/${brandId}/groupProducts`, data);
const getListGroupProductOfCombo = (brandId: string, productId: string, params?: any) =>
  request.get<TGroupProduct[]>(`/brands/${brandId}/products/${productId}/groupProducts`, {
    params
  });
const updateGroupProductOfComBos = (brandId: string, groupId: string, payload: any) =>
  request.patch<TGroupProduct>(`/brands/${brandId}/groupProducts/${groupId}`, payload);

const getVariantsInProduct = (productId: any, params?: any) =>
  request.get<BaseReponse<TVariant>>(`products/${productId}/variants`, { params });

const updateProductInGroup = (productInGroupId: string, groupId: string, payload: any) =>
  request.patch<ProductsInGroup>(
    `/groupProducts/${groupId}/productInGroup/${productInGroupId}`,
    payload
  );
const addVariantsToProduct = (id: string, values: string[]) =>
  request.post<string[]>(`/products/${id}/variants`, values);

const productApi = {
  createGroupProduct,
  addVariantsToProduct,
  getListGroupProductOfCombo,
  updateGroupProductOfComBos,
  updateProductInGroup,
  getVariantsInProduct,
  ...generateAPIWithPaging<TProduct>('products')
};

export default productApi;
