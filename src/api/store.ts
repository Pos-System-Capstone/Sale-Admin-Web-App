import { TStore, TStoreDetail } from 'types/store';
import { generateAPIWithPaging } from './utils';
import requestWebAdmin from 'utils/axios';
import { BaseReponse } from 'types/response';
import { TEmployee, TEmployeeCreate } from 'types/employee';
import { TUserCreate } from 'types/user';

const getStoreDetail = (storeId: string) => requestWebAdmin.get<TStoreDetail>(`stores/${storeId}`);
const getStoreEmployees = (storeId: string, params?: any) =>
  requestWebAdmin.get<BaseReponse<TEmployee>>(`stores/${storeId}/users`, { params });
const createStoreEmployees = (storeId: string, data: TEmployeeCreate) =>
  requestWebAdmin.post<BaseReponse<TUserCreate>>(`stores/${storeId}/users`, data);

const storeApi = {
  getStoreDetail,
  getStoreEmployees,
  createStoreEmployees,
  ...generateAPIWithPaging<TStore>('stores')
};

export default storeApi;
