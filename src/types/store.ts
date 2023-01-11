import { Menu } from './menu';

export type TStore = {
  id: number;
  name: string;
  short_name: string;
  is_available: boolean;
  create_date: Date;
  type: number;
  open_time: Date;
  close_time: Date;
  store_code?: string;
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
