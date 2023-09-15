import { TStoreReport } from 'types/report/store';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const get = (params?: any) => request.get<TStoreReport[]>(`stores`, { params });

const storeReportApi = { get };

export default storeReportApi;
