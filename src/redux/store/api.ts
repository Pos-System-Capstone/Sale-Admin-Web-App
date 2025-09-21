import { generateAPIWithPaging } from 'redux/utils';
import { Menu } from 'types/menu';
import request from 'utils/axios';

export const getMenusByStoreId = (storeId: number) => request.get<Menu>(`/stores/${storeId}/menus`);
const storeApi = {
  getMenusByStoreId,
  ...generateAPIWithPaging<any>('stores')
};

export default storeApi;
