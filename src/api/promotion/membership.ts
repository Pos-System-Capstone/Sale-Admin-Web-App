import {
  TMembership,
  TMembershipProgram,
  TTransactionByMemberShipId
} from 'types/promotion/membership';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getMemberships = (params?: any) =>
  request.get<BaseReponse<TMembership>>(`/memberships`, { params });

const getTransactionByMembershipId = (id: string | undefined, params: any) =>
  request.get<BaseReponse<TTransactionByMemberShipId>>(`/memberships/${id}/transactions`, {
    params
  });

const deleteMembership = (params?: any) =>
  request.delete<BaseReponse<TMembership>>(`/memberships`, { params });

const getMembershipById = (id: string | undefined) =>
  request.get<TMembership>(`/memberships/${id}`);

const updateMembership = (id: string | undefined, data?: TMembership) =>
  request.put<TMembership>(`/memberships/${id}`, data);

const getMembershipPrograms = (params?: any) =>
  request.get<BaseReponse<TMembershipProgram>>(`v1/membership-programs`, { params });

const getMembershipProgramsById = (id: string | undefined) =>
  request.get<TMembershipProgram>(`v1/membership-programs/${id}`);

const membershipsApi = {
  getMemberships,
  deleteMembership,
  getMembershipById,
  updateMembership,
  getMembershipPrograms,
  getTransactionByMembershipId,
  getMembershipProgramsById
};

export default membershipsApi;
