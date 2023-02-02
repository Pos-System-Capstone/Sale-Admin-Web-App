import { TUser, TUserInfo } from 'types/user';
import request from 'utils/axios';
import { generateAPI } from './utils';

const getUserInfo = (userId: string) => request.get<TUserInfo>(`accounts/${userId}`);

const userApi = {
  ...generateAPI<TUser>('accounts')
};

export default userApi;
