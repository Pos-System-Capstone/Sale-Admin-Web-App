import { BaseReponse } from 'types/response';
import { TUpdateUser, TUser } from 'types/user';
import requestWebAdmin from 'utils/axios';
import { generateAPI } from './utils';

const updateUserStatus = (userId: string, status: string) =>
  requestWebAdmin.patch<BaseReponse<TUser>>(`accounts/${userId}`, {
    op: '/update',
    path: '/status',
    value: status
  });

const updateUserInformation = (
  userId: string,
  data: TUpdateUser,
  storeId?: string,
  brandId?: string
) => {
  if (storeId) {
    return requestWebAdmin.put(`stores/${storeId}/users/${userId}`, data);
  } else if (brandId) {
  }
};

const userApi = {
  updateUserInformation,
  updateUserStatus,
  ...generateAPI<TUser>('accounts')
};

export default userApi;
