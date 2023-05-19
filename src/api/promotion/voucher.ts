import { TVoucherBase } from 'types/promotion/voucher';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.webAdmin;

const getVoucher = (params?: any) =>
  request.get<BaseReponse<TVoucherBase>>(`/voucher-groups`, { params });

const voucherApi = { getVoucher };

export default voucherApi;
