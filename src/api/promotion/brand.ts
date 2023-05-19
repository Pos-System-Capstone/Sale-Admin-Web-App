import { TBrandBase } from 'types/promotion/brand';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.webAdmin;

const getAll = (params?: any) => request.get<BaseReponse<TBrandBase>>(`/brands`, { params });

const brandApi = { getAll };

export default brandApi;
