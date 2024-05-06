import { TConditionBase, TConditionCreate, TConditionUpdate } from 'types/promotion/condition';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getConditionRules = (params?: any) =>
  request.get<BaseReponse<TConditionBase>>(`/condition-rules`, { params });

const createCondition = (data?: TConditionCreate) =>
  request.post<TConditionBase>(`/condition-rules`, data);

const updateCondition = (data?: TConditionUpdate, id?: string) =>
  request.patch<TConditionBase>(`/condition-rules/${id}`, data);

const getConditionRuleId = (id?: string) => request.get<TConditionBase>(`/condition-rules/${id}`);

const conditionApi = { getConditionRules, createCondition, getConditionRuleId };

export default conditionApi;
