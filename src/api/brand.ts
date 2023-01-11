import { TBrand, TBrandDetail } from 'types/brand';
import { BaseReponse } from 'types/response';
import { TStore } from 'types/store';
import requestWebAdmin from 'utils/axios';
import { generateAPIWithPaging } from './utils';

const getBrandDetail = (brandId: string) => requestWebAdmin.get<TBrandDetail>(`brands/${brandId}`);

const getStoreOfBrand = (brandId: string, params?: any) => {
  return requestWebAdmin.get<BaseReponse<TStore>>(`brands/${brandId}/stores`, { params });
};

const brandApi = {
  getBrandDetail,
  getStoreOfBrand,
  ...generateAPIWithPaging<TBrand>('brands')
};

export default brandApi;
