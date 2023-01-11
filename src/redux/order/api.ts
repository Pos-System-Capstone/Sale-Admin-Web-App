import { TOrderDetail } from 'types/order';
import request from 'utils/axios';

export const getOrderDetail = (orderId: number) => request.get<TOrderDetail>(`/orders/${orderId}`);
