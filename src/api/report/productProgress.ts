import { ProductProgressBase } from 'types/report/productProgress';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const getProductProgress = (params?: any) =>
  request.get<BaseReponse<ProductProgressBase>>('/product-report/product-line', { params });

const productProgressApi = { getProductProgress };

export default productProgressApi;
