import moment from 'moment';
import { TOrder, TOrderDetail } from 'types/order';
import request from 'utils/axios';
import { generateAPIWithPaging } from './utils';

const getOrderDetail = (storeId: string, orderId: string) =>
  request.get<TOrderDetail>(`stores/${storeId}/orders/${orderId}`);

const getOrderList = (storeId: string, params: any) => {
  const { size, page, startDate, endDate } = params;
  if (startDate != undefined && endDate != undefined) {
    return request.get<TOrder>(
      `stores/${storeId}/orders?page=${page}&size=${size}&startDate=${moment(
        startDate,
        'YYYY-MM-DD'
      ).format('YYYY-MM-DD')}&endDate=${moment(endDate, 'YYYY-MM-DD').format('YYYY-MM-DD')}`,
      { params }
    );
  }
  if (startDate !== undefined) {
    return request.get<TOrder>(
      `stores/${storeId}/orders?page=${page}&size=${size}&startDate=${moment(
        startDate,
        'YYYY-MM-DD'
      ).format('YYYY-MM-DD')}`,
      {
        params
      }
    );
  }
  if (endDate !== undefined) {
    return request.get<TOrder>(
      `stores/${storeId}/orders?page=${page}&size=${size}&endDate=${moment(
        endDate,
        'YYYY-MM-DD'
      ).format('YYYY-MM-DD')}`,
      {
        params
      }
    );
  } else return request.get<TOrder>(`stores/${storeId}/orders`, { params });
};

const getListOrder = (storeId: string, params: any) => {
  return request.get<TOrder>(`stores/${storeId}/orders`, { params });
};

const orderApi = {
  getOrderDetail,
  getOrderList,
  getListOrder,
  ...generateAPIWithPaging<TOrder>('orders')
};

export default orderApi;
