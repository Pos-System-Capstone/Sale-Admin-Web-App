import { ProductTypeEnum } from 'types/product';

export const PRODUCT_MASTER = 6;
export const PRODUCT_EXTRA = 5;
export const PRODUCT_DETAIL = 7;
export const PRODUCT_SINGLE = 0;
export const PRODUCT_COMBO = 1;
export const PRODUCT_COMPLEX = 10;

export const PRODUCT_TYPE_DATA = [
  {
    value: ProductTypeEnum.SINGLE,
    typeCode: 'SINGLE',
    label: 'Sản phẩm đơn'
  },
  {
    value: ProductTypeEnum.PARENT,
    typeCode: 'PARENT',
    label: 'Sản phẩm cha'
  },
  {
    value: ProductTypeEnum.CHILD,
    typeCode: 'CHILD',
    label: 'Sản phẩm con'
  },
  {
    value: ProductTypeEnum.EXTRA,
    typeCode: 'EXTRA',
    label: 'Sản phẩm  Extra'
  },
  {
    value: ProductTypeEnum.COMBO,
    typeCode: 'COMBO',
    label: 'Sản phẩm  Combo'
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

export const DAY_OF_WEEK_CONFIG_VALUE_BY_BIT = [
  {
    label: 'Thứ hai',
    value: 2
  },
  {
    label: 'Thứ ba',
    value: 4
  },
  {
    label: 'Thứ tư',
    value: 8
  },
  {
    label: 'Thứ năm',
    value: 16
  },
  {
    label: 'Thứ sáu',
    value: 32
  },
  {
    label: 'Thứ bảy',
    value: 64
  },
  {
    label: 'Chủ nhật',
    value: 1
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
