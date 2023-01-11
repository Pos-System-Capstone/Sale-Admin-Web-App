import { TBrand, TBrandDetail } from 'types/brand';
import requestWebAdmin from 'utils/axios';
import { generateAPIWithPaging } from './utils';

const getBrandDetail = (brandId: string) => requestWebAdmin.get<TBrandDetail>(`brands/${brandId}`);

const brandApi = {
  getBrandDetail,
  ...generateAPIWithPaging<TBrand>('brands')
};

export default brandApi;
