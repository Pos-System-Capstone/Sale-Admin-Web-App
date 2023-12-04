import { TProductCategory } from 'types/promotion/productCategory';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getCategory = (params?: any) =>
  request.get<BaseReponse<TProductCategory>>(`/product-category`, { params });

const productCategory = { getCategory };

export default productCategory;
