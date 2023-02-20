import { ProductTypeEnum } from 'types/product';

export const PRODUCT_MASTER = 6;
export const PRODUCT_EXTRA = 5;
export const PRODUCT_DETAIL = 7;
export const PRODUCT_SINGLE = 0;
export const PRODUCT_COMBO = 1;
export const PRODUCT_COMPLEX = 10;

export const PRODUCT_TYPE_DATA = [
  {
    value: ProductTypeEnum.Single,
    typeCode: 'SINGLE',
    label: 'Sản phẩm đơn'
  },
  {
    value: ProductTypeEnum.Master,
    typeCode: 'MASTER',
    label: 'Sản phẩm cha'
  },
  {
    value: ProductTypeEnum.HAS_EXTRA,
    typeCode: 'HAS_EXTRA',
    label: 'Sản phẩm có extra'
  },
  {
    value: ProductTypeEnum.Extra,
    typeCode: 'EXTRA',
    label: 'SP Extra'
  }
];

export const DAY_OF_WEEK = [
  {
    label: 'Thứ hai',
    value: 1
  },
  {
    label: 'Thứ ba',
    value: 2
  },
  {
    label: 'Thứ tư',
    value: 3
  },
  {
    label: 'Thứ năm',
    value: 4
  },
  {
    label: 'Thứ sáu',
    value: 5
  },
  {
    label: 'Thứ bảy',
    value: 6
  },
  {
    label: 'Chủ nhật',
    value: 0
  }
];

export const STORE_NAME = [
  {
    label: 'HCM.PA.SH.15FNTMK',
    value: 1
  },
  {
    label: 'HCM.PA.SH.53CND',
    value: 2
  },
  {
    label: 'HCM.GF.SH.102HVB',
    value: 3
  },
  {
    label: 'HCM.PA.SH.47TCV',
    value: 4
  },
  {
    label: 'HCM.PA.SH.97LVD',
    value: 5
  },
  {
    label: 'HCM.PA.SH.213NVC',
    value: 6
  },
  {
    label: 'HCM.PA.SH.91ND',
    value: 0
  }
];
