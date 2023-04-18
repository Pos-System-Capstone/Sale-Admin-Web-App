// export type TCollection = {
//   id: number;
//   name: string;
//   name_eng: string;
//   description: string;
//   description_eng: string;
//   seo: string;
//   seodescription: string;
//   seokeyword: string;
//   link: string;
//   banner_url: string;
//   brand_id: number;
//   type: CollectionTypeEnum;
//   position: number;
// };

import { TProductInCollection } from './product';

export type TCollection = {
  id: string;
  name: string;
  code: string;
  status: CollectionStatus;
  picUrl: string;
  description: string;
  products: TProductInCollection[];
};
export enum CollectionStatus {
  ACTIVE = 'Active',
  DEACTIVATE = 'Deactivate'
}

export enum CollectionTypeEnum {
  MenuCollection = 0,
  GroupCollection = 1
}
