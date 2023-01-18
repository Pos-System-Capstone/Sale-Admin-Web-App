import { TStore, TStoreDetail } from 'types/store';
import { generateAPIWithPaging } from './utils';
import requestWebAdmin from 'utils/axios';
import { BaseReponse } from 'types/response';
import { TEmployee } from 'types/employee';

const getStoreDetail = (storeId: string) => requestWebAdmin.get<TStoreDetail>(`stores/${storeId}`);
const getStoreEmployees = (storeId: string, params?: any) =>
  requestWebAdmin.get<BaseReponse<TEmployee>>(`stores/${storeId}/employees`, { params });

const storeApi = {
  getStoreDetail,
  getStoreEmployees,
  ...generateAPIWithPaging<TStore>('stores')
};

export default storeApi;
