import moment from 'moment';
import { TOrder, TOrderDetail, TOrderUpdate } from 'types/order';
import request from 'utils/axios';
import { generateAPIWithPaging } from './utils';

const getOrderDetail = (orderId: string) => request.get<TOrderDetail>(`orders/${orderId}`);

const getOrderList = (storeId: string, params: any) => {
  const { size, page, orderDate } = params;
  // if (startDate != undefined && endDate != undefined) {
  //   return request.get<TOrder>(
  //     `stores/${storeId}/orders?page=${page}&size=${size}&startDate=${moment(
  //       startDate,
  //       'YYYY-MM-DD'
  //     ).format('YYYY-MM-DD')}&endDate=${moment(endDate, 'YYYY-MM-DD').format('YYYY-MM-DD')}`,
  //     { params }
  //   );
  // }
  if (orderDate !== undefined) {
    return request.get<TOrder>(
      `stores/${storeId}/orders?page=${page}&size=${size}&startDate=${moment(
        orderDate,
        'YYYY-MM-DD'
      ).format('YYYY-MM-DD')}`,
      {
        params
      }
    );
  }
  // if (endDate !== undefined) {
  //   return request.get<TOrder>(
  //     `stores/${storeId}/orders?page=${page}&size=${size}&endDate=${moment(
  //       endDate,
  //       'YYYY-MM-DD'
  //     ).format('YYYY-MM-DD')}`,
  //     {
  //       params
  //     }
  //   );
  // }
  else return request.get<TOrder>(`stores/${storeId}/orders`, { params });
};

const getOrderListInBrand = (brandId: string, params: any) => {
  const { size, page, orderDate } = params;
  // if (orderDate !== undefined) {
  //   return request.get<TOrder>(
  //     `brands/${brandId}/orders?page=${page}&size=${size}&startDate=${moment(
  //       orderDate,
  //       'YYYY-MM-DD'
  //     ).format('YYYY-MM-DD')}&endDate=${moment(orderDate, 'YYYY-MM-DD').format('YYYY-MM-DD')}`,
  //     { params }
  //   );
  // }
  if (orderDate !== undefined) {
    return request.get<TOrder>(
      `brands/${brandId}/orders?page=${page}&size=${size}&startDate=${moment(
        orderDate,
        'YYYY-MM-DD'
      ).format('YYYY-MM-DD')}`,
      {
        params
      }
    );
  }
  // if (endDate !== undefined) {
  //   return request.get<TOrder>(
  //     `brands/${brandId}/orders?page=${page}&size=${size}&endDate=${moment(
  //       endDate,
  //       'YYYY-MM-DD'
  //     ).format('YYYY-MM-DD')}`,
  //     {
  //       params
  //     }
  //   );
  // }
  else return request.get<TOrder>(`brands/${brandId}/orders`, { params });
};
const getListOrder = (storeId: string, params: any) => {
  return request.get<TOrder>(`stores/${storeId}/orders`, { params });
};

const updateOrder = (orderId: string, orderUpdate: TOrderUpdate) =>
  request.patch<TOrderDetail>(`orders/${orderId}`, orderUpdate);
const orderApi = {
  getOrderDetail,
  getOrderList,
  getListOrder,
  getOrderListInBrand,
  updateOrder,
  ...generateAPIWithPaging<TOrder>('orders')
};

export default orderApi;
