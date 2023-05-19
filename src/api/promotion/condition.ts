import { TConditionBase } from 'types/promotion/condition';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.webAdmin;

const getConditionRules = (params?: any) =>
  request.get<BaseReponse<TConditionBase>>(`/condition-rules`, { params });

const conditionApi = { getConditionRules };

export default conditionApi;
