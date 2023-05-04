import { TBrandDetail } from './brand';
import { TStoreDetail } from './store';

/* eslint-disable prettier/prettier */
export type TUser = {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  brandId?: string;
  storeId?: string;
};
export enum UserRole {
  SystemAdmin = 'SysAdmin',
  BrandManager = 'BrandManager',
  BrandAdmin = 'BrandAdmin',
  StoreManager = 'StoreManager',
  StoreStaff = 'Staff'
}

export enum UserStatus {
  ACTIVE = 'Active',
  DEACTIVATE = 'Deactivate'
}
export type TUserCreate = {
  brandId: string;
  username: string;
  name: string;
  password: string;
  status: string;
  role: string;
};

export type TUpdateUser = {
  name?: string;
  password?: string;
};

export type TUserInfo = TUser & {
  moreDetail: TStoreDetail | TBrandDetail;
};

export const CREATE_USER_ROLE_OPTIONS = [
  {
    value: UserRole.BrandAdmin,
    label: 'Brand Admin'
  },
  {
    value: UserRole.BrandManager,
    label: 'Brand Manager'
  }
];

export const UPDATE_USER_STATUS = [
  {
    value: UserStatus.ACTIVE,
    label: 'Active'
  },
  {
    value: UserStatus.DEACTIVATE,
    label: 'Deactivate'
  }
];
