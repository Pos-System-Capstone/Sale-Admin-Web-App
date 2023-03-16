import { Role } from 'utils/role';
import { TProductInMenuDetail } from './product';

export type Menu = {
  id: string;
  store_id?: number;
  code: string;
  store_name: string;
  day_filters: number[];
  is_brand_mode: boolean;
  start_time?: any;
  end_time?: any;
  time_ranges: string[][];
  priority: number;
  create_at?: any;
  store_names: any[];
};

export enum DateFilter {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday'
}

export enum MenuStatus {
  ACTIVE = 'Active',
  DEACTIVE = 'Deactive'
}

export type PosMenu = {
  id: string;
  code: string;
  priority: number;
  dateFilter: DateFilter[];
  startTime: string;
  endTime: string;
  status: MenuStatus;
  createdBy: Role;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  products: TProductInMenuDetail[];
  stores: [];
};

export type TCreateMenu = {
  menu_name?: any;
  store_name: string;
  day_filters: number[];
  is_brand_mode: boolean;
  start_time?: any;
  end_time?: any;
  time_ranges: string[][];
  priority: number;
  create_at?: any;
  store_names: any[];
};

export type ProductFormatTypeToUpdate = {
  productId: string;
  sellingPrice?: number;
  discountPrice?: number;
};

export type TStoreApplyMenuRequest = {
  menu_in_store_id?: number;
  store_id: number;
  time_range: string[];
  day_filters: number[];
};

export type TCreateMenuInformation = {
  isBaseMenu: boolean;
  code: string;
  priority: number;
  dateFilter: number;
  startTime: number;
  endTime: number;
};

export type TUpdateMenuInformation = {
  priority?: number;
  dateFilter?: number;
  startTime?: number;
  endTime?: number;
}
