import { TActionBase } from 'types/promotion/action';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.webAdmin;

const get = (params?: any) => request.get<BaseReponse<TActionBase>>(`/actions`, { params });

const actionApi = { get };

export default actionApi;
