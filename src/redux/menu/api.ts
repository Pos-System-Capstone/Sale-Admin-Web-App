import { generateAPI } from 'redux/utils';
import { StoreInMenu, TStoreDetail } from 'types/store';
import request from '../../utils/axios';

export interface Menu {
  product_menu_id: number;
  product_menu_name: String;
  brand_id: number;
  active: boolean;
}

export const getMenus = (params: any) =>
  request.get<Menu>(`/menus`, {
    params
  });

export const getMenusOfBrand = (brandId: string, params: any) =>
  request.get<Menu>(`brands/${brandId}/menus`, {
    params
  });

export const getStoreApplyMenus = (menuId: string, params?: any): any =>
  request.get<TStoreDetail>(`/menus/${menuId}/stores`, {
    params
  });

export const addOrRemoveStoresApplyMenu = (menuId: string, data: any): any =>
  request.post(`/menus/${menuId}/stores`, { storeIds: data });

export const updateStoreApplyMenus = (menuId: number, storeId: number, data: any): any =>
  request.put(`/menus/${menuId}/stores/${storeId}`, data);

export const deleteStoreApplyMenus = (menuId: number, storeId: number): any =>
  request.delete(`/menus/${menuId}/stores/${storeId}`);

export const getProductInMenus = (menuId: string, params: any) =>
  request.get(`/menus/${menuId}/products`, {
    params
  });

export const addOrRemoveProductsInMenu = (menuId: string, data: any) =>
  request.post(`/menus/${menuId}/products`, data);

export const updateMenuInfo = (menuId: number, updateInfo: any) =>
  request.put(`/menus/${menuId}`, updateInfo);

export const updateProdInMenuInfo = (menuId: number, productId: number, updateInfo: any) =>
  request.put(`/menus/${menuId}/products/${productId}`, updateInfo);

export const deleteProductInMenu = (menuId: number, prodId: number) =>
  request.delete(`/menus/${menuId}/products/${prodId}`);

export const getCurrentMenuByStoreId = (storeId: number) =>
  request.get<StoreInMenu>(`/stores/${storeId}/current-menu`);

export const menuInStoreApi = generateAPI<StoreInMenu>('menu-in-stores');
