import { generateAPIWithPaging } from 'redux/utils';
import { Menu } from 'types/menu';
import { TStore } from 'types/store';
import request from 'utils/axios';

export const getStores = (params: any) => request.get('/stores', { params });

export const getMenusByStoreId = (storeId: number) => request.get<Menu>(`/stores/${storeId}/menus`);
const storeApi = {
  getMenusByStoreId,
  ...generateAPIWithPaging<TStore>('stores')
};

export default storeApi;
