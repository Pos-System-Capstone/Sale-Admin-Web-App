import { TTradingBase } from 'types/report/trading';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const getTrading = (params?: any) =>
  request.get<BaseReponse<TTradingBase>>('/system-report', { params });

const tradingApi = { getTrading };

export default tradingApi;
