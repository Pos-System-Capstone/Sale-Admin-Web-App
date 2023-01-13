export enum BrandStatus {
  ACTIVE = 'Active',
  DEACTIVE = 'Deactive'
}

export type TBrand = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  picUrl: string;
  status: BrandStatus;
  numberOfStores: number;
};

export type TBrandDetail = TBrand;
