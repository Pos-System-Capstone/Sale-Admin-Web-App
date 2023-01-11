export enum BrandStatus {
  ACTIVE = 'Active',
  DEACTIVE = 'Deactivate'
}

export type TBrand = {
  id: string,
  name: string,
  email: string,
  address: string,
  phone: string,
  picUrl: string,
  status: BrandStatus
}

export type TBrandDetail = TBrand