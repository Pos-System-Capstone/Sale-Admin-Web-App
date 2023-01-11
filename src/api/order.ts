import { TOrder, TOrderDetail } from 'types/order';
import request from 'utils/axios';
import { generateAPIWithPaging } from './utils';

const getOrderDetail = (orderId: number) => request.get<TOrderDetail>(`admin/orders/${orderId}`);

const orderApi = {
  getOrderDetail,
  ...generateAPIWithPaging<TOrder>('admin/orders')
};

export default orderApi;
