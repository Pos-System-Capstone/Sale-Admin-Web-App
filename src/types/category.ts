import { ModifierSelectType } from './Modifier';

export type TCategory = {
  id: string;
  code: string;
  name: string;
  categoryType: CategoryType;
  displayOrder: number;
  description: string;
  picUrl: string;
  status: CategoryStatus;
  brandId: string;
};
export interface TCategoryCreate {
  code: string;
  name: string;
  categoryType: CategoryType;
  displayOrder: number;
  description: string;
  picUrl: string;
}
export enum CategoryType {
  NORMAL = 'Normal',
  EXTRA = 'Extra'
}
export enum CategoryStatus {
  ACTIVE = 'Active',
  DEACTIVE = 'Deactive'
}

export type TCategoryExtra = {
  /** Min max co dang 1-2 */
  id: number;
  cate_id: number;
  extra_cate_id: number;
  min_max: string;
  select_type: ModifierSelectType;
  cate: TCategory;
  extra_cate: TCategory;
};

export interface CategoryExtraCate {
  id: number;
  cate_id: number;
  extra_cate_id: number;
  min_max: string;
  cate?: any;
  extra_cate?: any;
}
export const CREATE_CATEGORY_TYPE_OPTIONS = [
  {
    value: CategoryType.NORMAL,
    label: 'Normal'
  },
  {
    value: CategoryType.EXTRA,
    label: 'Extra'
  }
];
