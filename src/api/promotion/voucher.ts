import { TVoucherBase, TVoucherCreate } from 'types/promotion/voucher';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getVoucher = (params?: any) =>
  request.get<BaseReponse<TVoucherBase>>(`/voucher-groups`, { params });

const createVoucher = (data?: TVoucherCreate) =>
  request.post<TVoucherBase>(`/voucher-groups`, data);

const getVoucherId = (id?: string) => request.get<TVoucherBase>(`/voucher-groups/${id}`);

const voucherApi = { getVoucher, getVoucherId, createVoucher };

export default voucherApi;
