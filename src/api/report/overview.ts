import { TTopStoreRevenueBase } from 'types/report/overview';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const getTopStoreRevenue = (params?: any) =>
  request.get<BaseReponse<TTopStoreRevenueBase>>('/overview-dashboard/top-store-revenue', {
    params
  });

const overviewApi = { getTopStoreRevenue };

export default overviewApi;
