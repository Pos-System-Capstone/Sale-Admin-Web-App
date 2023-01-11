import request from 'utils/axios';

export const getCustomers = (params: any) => request.get('/stores', { params });
