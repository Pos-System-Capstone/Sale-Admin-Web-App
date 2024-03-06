import { TVoucherBase, TVoucherCreate } from 'types/promotion/voucher';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getVoucherGroup = (params?: any) =>
  request.get<BaseReponse<TVoucherBase>>(`/voucher-groups`, { params });

const createVoucherGroup = (data?: TVoucherCreate) =>
  request.post<TVoucherBase>(`/voucher-groups`, data);

const getVoucherGroupId = (id?: string) => request.get<TVoucherBase>(`/voucher-groups/${id}`);

const getVouchers = (params?: any) =>
  request.get<BaseReponse<TVoucherBase>>(`/vouchers`, { params });

const voucherApi = { getVoucherGroup, getVoucherGroupId, createVoucherGroup, getVouchers };

export default voucherApi;
