import { TCategorySaleReportBase } from 'types/report/category';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const get = (params?: any) =>
  request.get<BaseReponse<TCategorySaleReportBase>>('/category-report', { params });

const categorySaleApi = { get };

export default categorySaleApi;
