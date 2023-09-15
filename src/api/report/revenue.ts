import { TPaymentOverviewBase, TRevenueOverviewBase } from 'types/report/revenueOverview';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const getRevenueOverview = (params?: any) =>
  request.get<TRevenueOverviewBase>('/overview-dashboard/revenue', { params });

const getPaymentOverview = (params?: any) =>
  request.get<TPaymentOverviewBase>('/overview-dashboard/payment', { params });

const revenueApi = { getRevenueOverview, getPaymentOverview };

export default revenueApi;
