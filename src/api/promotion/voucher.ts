import {
  TApplyVoucher,
  TVoucher,
  TVoucherBase,
  TVoucherCreate,
  TVoucherGroupMoreCreate
} from 'types/promotion/voucher';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getVoucherGroup = (params?: any) =>
  request.get<BaseReponse<TVoucherBase>>(`/voucher-groups`, { params });

const createVoucherGroup = (data?: TVoucherCreate) =>
  request.post<TVoucherBase>(`/voucher-groups`, data);

const createApplyVoucher = (data?: TApplyVoucher) =>
  request.post<TApplyVoucher>(`/vouchers/applyVoucher`, data);

const getVoucherGroupId = (id?: string) => request.get<TVoucherBase>(`/voucher-groups/${id}`);

const getVouchers = (params?: any) => request.get<BaseReponse<TVoucher>>(`/vouchers`, { params });

const createVoucherGroupMore = (params?: TVoucherGroupMoreCreate) =>
  request.post<TVoucherGroupMoreCreate>(`/voucher-groups/add-more`, null, { params });

const voucherApi = {
  getVoucherGroup,
  getVoucherGroupId,
  createVoucherGroup,
  createApplyVoucher,
  getVouchers,
  createVoucherGroupMore
};

export default voucherApi;
