export const PRODUCT_MASTER = 6;
export const PRODUCT_EXTRA = 5;
export const PRODUCT_DETAIL = 7;
export const PRODUCT_SINGLE = 0;
export const PRODUCT_COMBO = 1;
export const PRODUCT_COMPLEX = 10;

export const PRODUCT_TYPE_DATA = [
  {
    value: PRODUCT_MASTER,
    typeCode: 'master',
    label: 'Dòng sản phẩm'
  },
  {
    value: PRODUCT_COMPLEX,
    typeCode: 'complex',
    label: 'SP Kết hợp'
  },
  {
    value: PRODUCT_COMBO,
    typeCode: 'combo',
    label: 'SP Combo'
  },
  {
    value: `${PRODUCT_SINGLE}`,
    typeCode: 'single',
    label: 'SP Đơn'
  },
  {
    value: PRODUCT_DETAIL,
    typeCode: 'child',
    label: 'SP Con'
  },
  {
    value: PRODUCT_EXTRA,
    typeCode: 'extra',
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
