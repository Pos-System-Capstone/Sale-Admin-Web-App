/* eslint-disable prettier/prettier */
export type TPaymentMapping = {
    brandId: string;
    brandName: string;
    brandPhoneNumber: string;
    createStoreRequests: CreateStoreRequest[];
    vietQrConfigRequest: VietQrConfigRequest;
    zaloPayConfigRequest: ZaloPayConfigRequest;
    vnPayConfigRequest: VnPayConfigRequest;
};

export type CreateStoreRequest = {
    storeId: string;
    storeName: string;
    storeAddress: string;
    storePhoneNumber: string;
    storeEmail: string;
};

export type VietQrConfigRequest = {
    bankCode: string;
    accountNumber: string;
    accountName: string;
};

export type ZaloPayConfigRequest = {
    appId: string;
    key1: string;
    key2: string;
};

export type VnPayConfigRequest = {
    tmnCode: string;
    secureHash: string;
};
