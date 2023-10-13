import { TSummaryReportBase } from 'types/report/home';
import { Insights } from 'types/report/insights';
import { axiosInstances } from 'utils/axios';
const request = axiosInstances.report;
const getSummary = (params?: any) => request.get<TSummaryReportBase>('/home/summary', { params });
const getInsights = (params?: any) => request.get<Insights>('/insights', { params });
const homeApi = { getSummary, getInsights };
export default homeApi;
