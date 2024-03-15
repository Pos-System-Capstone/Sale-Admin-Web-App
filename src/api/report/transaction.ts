import { TTransaction } from 'types/report/transaction';
import { BaseReponse } from 'types/response';
import requestWebAdmin from 'utils/axios';

const getTransactionOfBrand = (brandId: string, params?: any) => {
  return requestWebAdmin.get<BaseReponse<TTransaction>>(`brands/${brandId}/transactions`, {
    params
  });
};

const transactionApi = { getTransactionOfBrand };

export default transactionApi;
