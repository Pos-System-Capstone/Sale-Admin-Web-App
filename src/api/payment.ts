/* eslint-disable prettier/prettier */
import { TPaymentMapping } from "types/payment/payment";
import { axiosInstances } from "utils/axios";



export const paymentProviderMapping = (id: string, create: any) => {
    return axiosInstances.paymentService.post(`brands/${id}/brandpaymentprovider`, create);
};


export const getPaymentProviderMapping = (id: string) => {
    return axiosInstances.paymentService.get<TPaymentMapping>(`brands/${id}/brandpaymentprovider`);
};



