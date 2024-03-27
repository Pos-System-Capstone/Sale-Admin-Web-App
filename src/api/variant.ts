import { TVariant } from 'types/report/variant';
import { BaseReponse } from 'types/response';
import requestWebAdmin from 'utils/axios';

const getVariants = (params?: any) =>
  requestWebAdmin.get<BaseReponse<TVariant>>('/variants', { params });

const getVariantById = (id: string | undefined) => requestWebAdmin.get<TVariant>(`/variants/${id}`);

const createVariant = (data?: any) => requestWebAdmin.post<TVariant>(`/variants`, data);

const updateVariant = (id: string | undefined, data?: any) =>
  requestWebAdmin.patch<TVariant>(`/variants/${id}`, data);

const variantApi = { getVariants, getVariantById, createVariant, updateVariant };

export default variantApi;
