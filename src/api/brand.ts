import { TBrand, TBrandDetail } from 'types/brand';
import { BaseReponse } from 'types/response';
import { TStore } from 'types/store';
import requestWebAdmin from 'utils/axios';
import { generateAPIWithPaging } from './utils';
import { TUser, TUserCreate } from 'types/user';

const getBrandDetail = (brandId: string) => requestWebAdmin.get<TBrandDetail>(`brands/${brandId}`);

const getStoreOfBrand = (brandId: string, params?: any) => {
  return requestWebAdmin.get<BaseReponse<TStore>>(`brands/${brandId}/stores`, { params });
};
const getListUserOfBrand = (brandId: string, params?: any) => {
  return requestWebAdmin.get<BaseReponse<TUser>>(`brands/${brandId}/users`, { params });
};
const createUserOfBrand = (brandId: string, values: TUserCreate) => {
  return requestWebAdmin.post<BaseReponse<TUser>>(`brands/${brandId}/users`, values);
};

const brandApi = {
  getBrandDetail,
  getStoreOfBrand,
  getListUserOfBrand,
  createUserOfBrand,
  ...generateAPIWithPaging<TBrand>('brands')
};

export default brandApi;
