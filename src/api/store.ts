import {
  SessionReport,
  StoreReport,
  TSession,
  TSessionCreate,
  TSessionDetail,
  TSessionDetailUpdate,
  TStore,
  TStoreDetail,
  TStoreUpdate
} from 'types/store';
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

const createStoreSessions = (storeId: string, data: TSessionCreate[]) =>
  requestWebAdmin.post(`stores/${storeId}/sessions`, data);
const getStoreSessions = (storeId: string, params?: any) =>
  requestWebAdmin.get<BaseReponse<TSession>>(`stores/${storeId}/sessions`, { params });
const getStoreSessionDetail = (storeId: string, sessionId: string) =>
  requestWebAdmin.get<TSessionDetail>(`stores/${storeId}/sessions/${sessionId}`);
const getStoreSessionReport = (sessionId: string) =>
  requestWebAdmin.get<SessionReport>(`report/session-report/${sessionId}`);
const updateStoreSessionDetail = (storeId: string, sessionId: string, data: TSessionDetailUpdate) =>
  requestWebAdmin.put<TSessionDetail>(`stores/${storeId}/sessions/${sessionId}`, data);
const updateStoreStatus = (storeId: string, storeStatus: string) => {
  const payload = {
    op: '/update',
    path: '/status',
    value: `${storeStatus}`
  };
  return requestWebAdmin.patch(`stores/${storeId}`, payload);
};
const getStoreReport = (storeId: string, params: any) =>
  requestWebAdmin.get<StoreReport>(`stores/${storeId}/day-report`, { params: params });
const updateStoreInformation = (storeId: string, data: TStoreUpdate) => {
  return requestWebAdmin.put(`stores/${storeId}`, data);
};

const storeApi = {
  getStoreDetail,
  getStoreEmployees,
  createStoreEmployees,
  createStoreSessions,
  getStoreSessions,
  getStoreSessionDetail,
  updateStoreSessionDetail,
  getStoreSessionReport,
  updateStoreStatus,
  updateStoreInformation,
  getStoreReport,
  ...generateAPIWithPaging<TStore>('stores')
};

export default storeApi;
