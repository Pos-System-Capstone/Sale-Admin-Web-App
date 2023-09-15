import { TBusinessInsights, TSummaryReportBase } from 'types/report/home';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const getSummary = (params?: any) => request.get<TSummaryReportBase>('/home/summary', { params });

const getBusinessInsights = (params?: any) =>
  request.get<TBusinessInsights[]>('/home/business-insights', { params });

const homeApi = { getSummary, getBusinessInsights };

export default homeApi;
