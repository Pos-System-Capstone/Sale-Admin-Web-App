import { TBrandDetail } from './brand';
import { TStoreDetail } from './store';

/* eslint-disable prettier/prettier */
export type TUser = {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  status: UserStatus;
};
export enum UserRole {
  SystemAdmin = 'SysAdmin',
  BrandManager = 'BrandManager',
  BrandAdmin = 'BrandAdmin',
  StoreManager = 'StoreManager'
}

export enum UserStatus {
  ACTIVE = 'Active',
  DEACTIVE = 'Deactive'
}
export type TUserCreate = {
  brandId: string;
  username: string;
  name: string;
  password: string;
  status: string;
  role: string;
};

export type TUserInfo = TUser & {
  moreDetail: TStoreDetail | TBrandDetail;
};

export const CREATE_USER_ROLE_OPTIONS = [
  {
    value: UserRole.BrandAdmin,
    label: 'BrandAdmin'
  },
  {
    value: UserRole.BrandManager,
    label: 'BrandManager'
  },
  {
    value: UserRole.StoreManager,
    label: 'StoreManager'
  }
];
