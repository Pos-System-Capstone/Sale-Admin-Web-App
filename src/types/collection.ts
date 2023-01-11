export type TCollection = {
  id: number;
  name: string;
  name_eng: string;
  description: string;
  description_eng: string;
  seo: string;
  seodescription: string;
  seokeyword: string;
  link: string;
  banner_url: string;
  brand_id: number;
  type: CollectionTypeEnum;
  position: number;
};

export enum CollectionTypeEnum {
  MenuCollection = 0,
  GroupCollection = 1
}
