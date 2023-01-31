/* eslint-disable prettier/prettier */
export type TUser = {
    id: string;
    username: string;
    name: string;
    role: Role;
    status: UserStatus;
}
export enum Role {
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
}
export const CREATE_USER_ROLE_OPTIONS = [


    {
        value: Role.BrandAdmin,
        label: "BrandAdmin"
    },
    {
        value: Role.BrandManager,
        label: "BrandManager"
    },
    {
        value: Role.StoreManager,
        label: "StoreManager"
    },
];