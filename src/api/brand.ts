import { TBrand, TBrandDetail, TBrandUpdate, TNewBrandCreate } from 'types/brand';
import { TEmployeeCreate } from 'types/employee';
import { BaseReponse } from 'types/response';
import { StoreReport, TStore, TStoreCreate, TStoreDetail } from 'types/store';

import requestWebAdmin from 'utils/axios';
import { generateAPIWithPaging } from './utils';

const getBrandDetail = (brandId: string) => requestWebAdmin.get<TBrandDetail>(`brands/${brandId}`);

const getStoreOfBrand = (brandId: string, params?: any) => {
  return requestWebAdmin.get<BaseReponse<TStore>>(`brands/${brandId}/stores`, { params });
};

const checkBrandHasBaseMenu = (brandId: string) => {
  return requestWebAdmin.get<{ hasBaseMenu: boolean }>(`brands/${brandId}/menus/hasBaseMenu`);
};

const getStoresOfBrandWithoutPaging = () => {
  return requestWebAdmin.get<BaseReponse<TStoreDetail>>(`brands/stores`);
};

const getListUserOfBrand = (brandId: string, params?: any) => {
  return requestWebAdmin.get<BaseReponse<any>>(`brands/${brandId}/users`, { params });
};
const createUserOfBrand = (brandId: string, values: TEmployeeCreate) => {
  return requestWebAdmin.post<BaseReponse<any>>(`brands/${brandId}/users`, values);
};

const createNewBrand = (data: TNewBrandCreate) => {
  return requestWebAdmin.post<BaseReponse<TBrandDetail>>('brands', data);
};

const updateBrandInformation = (brandId: string, values: TBrandUpdate) => {
  return requestWebAdmin.patch<BaseReponse<TBrandDetail>>(`brands/${brandId}`, values);
};

const createNewBrandStore = (data: TStoreCreate) => {
  return requestWebAdmin.post<BaseReponse<TStoreDetail>>('stores', data);
};
const getBrandReport = (params: any) =>
  requestWebAdmin.get<StoreReport>(`brands/day-report`, { params: params });
const getBrandProductReport = (params: any) =>
  requestWebAdmin.get<StoreReport>(`brands/product-report`, { params: params });

const brandApi = {
  getBrandDetail,
  getStoreOfBrand,
  checkBrandHasBaseMenu,
  getListUserOfBrand,
  createUserOfBrand,
  createNewBrand,
  updateBrandInformation,
  createNewBrandStore,
  getStoresOfBrandWithoutPaging,
  getBrandReport,
  getBrandProductReport,
  ...generateAPIWithPaging<TBrand>('brands')
};

export default brandApi;
