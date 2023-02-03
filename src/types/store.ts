import { Menu } from './menu';

export enum StoreStatus {
  ACTIVE = 'Active',
  DEACTIVE = 'Deactive'
}

export type TStore = {
  id: string;
  brandId: string;
  name: string;
  shortName: string;
  email: string;
  address: string;
  status: StoreStatus;
};

export type TStoreDetail = {
  id: string;
  brandId: string;
  name: string;
  shortName: string;
  email: string;
  address: string;
  status: StoreStatus;
  phone: string;
  code: string;
};

export type StoreInMenu = {
  menu_in_store_id: number;
  menu_id?: number;
  menu_name?: string | null;
  time_ranges: string[][];
  day_filters: number[];
  store?: {
    id: number;
    store_name: string;
  };
  allDay?: boolean;
  start_time?: any;
  end_time?: any;
  priority: number;
  create_at?: any;
};

export type MenuInStoreAdmin = {
  id: number;
  store_id?: any;
  name: string;
  menus: Menu[];
};
