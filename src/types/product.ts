export type TProduct = {
  data: any;
  id: string;
  code: string;
  name: string;
  sellingPrice?: number;
  picUrl?: string;
  status: ProductStatusEnum;
  historicalPrice?: number;
  discountPrice?: number;
  description?: string;
  displayOrder: number;
  size: ProductSizeEnum;
  type: ProductTypeEnum;
  parentProductId?: string;
  brandId?: string;
  categoryId?: string;
};

export type TProductCreate = {
  name: string;
  code: string;
  sellingPrice: number;
  picUrl: string;
  categoryId: string;
  historicalPrice: number;
  discountPrice: number;
  description: string;
  displayOrder: number;
  size: ProductSizeEnum;
  type: ProductTypeEnum;
  parentProductId: string;
};

export type TProductInCollection = {
  id: string;
  productName: string;
  description: string;
  productCode: string;
  picUrl: string;
  sellingPrice: number;
};

export enum ProductTypeEnum {
  SINGLE = 'SINGLE',
  PARENT = 'PARENT',
  CHILD = 'CHILD',
  EXTRA = 'EXTRA',
  COMBO = 'COMBO'
}
export enum ProductSizeEnum {
  Small = 'S',
  Medium = 'M',
  Large = 'L'
}
export enum ProductStatusEnum {
  Active = 'Active',
  Deactive = 'Deactive'
}

export type TExtraProductInOrderDetail = {
  productInMenuId: string;
  sellingPrice: number;
  quantity: number;
  totalAmount: number;
  finalAmount: number;
  discount: number;
  name: string;
};

export type TProductInOrderDetail = {
  productInMenuId: string;
  orderDetailId: string;
  sellingPrice: number;
  quantity: number;
  name: string;
  totalAmount: number;
  finalAmount: number;
  discount: number;
  note: number;
  extras: TExtraProductInOrderDetail[];
};

export enum CombinationModeEnum {
  FixedCombo = 'FIXED',
  ChoiceCombo = 1
}

export type TProductInGroup = {
  product_id: number;
  product_name: string;
  is_and: boolean;
  group_id: number;
  quantity: number;
  default: number;
  min: number;
  max: number;
  default_min_max: string;
};

// export type TGroupProduct = {
//   id: number;
//   base_product_id: number;
//   collection_id?: number;
//   combination_mode?: CombinationModeEnum;
//   default_min_max: string;
//   product_id?: number;
//   position: number;
//   description: string;
//   quantity: number;
//   product_name: string;
// };

export type TProductBase = {
  product_id?: number;
  product_type?: ProductTypeEnum;
  is_available: boolean;
  is_default_child?: boolean;
  code?: string;
  cate_name?: string;
  product_name?: string;
  pic_url?: string;
  cat_id?: number;
  description?: string;
  seo_name?: string;
  seo_key_words?: string;
  seo_description?: string;
  tags?: string[];
  atts?: string[];
  product_in_menu?: TProductInMenu[];
  has_extra?: boolean;
  storeName?: string;
  totalOrderAtStore?: number;

  /** Giá của sản phẩm sẽ được sử dụng khi sản phẩm này không được cấu hình giá ở bảng `ProductInMenu` */
  price?: number;
};
export type TProductMaster = TProductBase & {
  child_products: TProductBase[];
};

export type TProductInMenuDetail = {
  id: string;
  sellingPrice: number;
  discountPrice: number;
  historicalPrice: number;
  type: TProductType;
  categoryName: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type TProductCombo = TProductBase & {
  groups: {
    id: number;
    combination_mode: number;
    products: {
      position: number;
      combination_mode?: any;
      product_id: number;
      default: number;
      min: number;
      max: number;
      product_name?: any;
      price: number;
    }[];
  }[];
};

export type TProductStatus = {
  ACTIVE: 'ACTIVE';
  DEACTIVE: 'DEATIVE';
};

export type TProductType = {
  SINGLE: 'SINGLE';
  MASTER: 'MASTER';
  EXTRA: 'EXTRA';
  HAS_EXTRA: 'HAS_EXTRA';
};

export enum ProductInGroupStatusEnum {
  ACTIVE = 'Active',
  DEACTIVE = 'Deactivate'
}
// product for creating menu
export type TProductOfCreateMenu = {
  id: string;
  sellingPrice: number;
  discountPrice: number;
};

export type TProductInMenu = {
  product_id: number;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
  price6: number;
  price7: number;
  price8: number;
  price9: number;
  price10: number;
  is_fixed_price: boolean;
};

export type CreateProductForm = Partial<CreateProductRequest> & {
  hasVariant?: boolean;
  defaultChildProduct?: string | number;
  variants: {
    optName: string;
    values: string[];
  }[];
};

export interface ProductImage {
  image_url: string;
  title: string;
  description: string;
  position: number;
}

/** Create `product master` or `single product` */
export interface CreateProductRequest extends TProductBase {
  child_products: TProductBase[];
  product_image: Partial<ProductImage>[];
}

export type CreateComboRequest = TProductBase & {
  product_image: Partial<ProductImage>[];
  groups: Partial<TGroupProduct>[];
};

export type CreateComboForm = TProductBase & {
  product_image: Partial<ProductImage>[];
  groups: {
    // collection id
    id?: number;
    base_product_id?: number;
    collection_id?: number;
    default?: number;
    min?: number;
    max?: number;
    position?: number;
    combination_mode: CombinationModeEnum;
    products: ComboProductType[];
  }[];
  fixedProducts?: ComboProductType[];
};

export type ComboProductType = {
  id?: number;
  base_product_id?: number;
  product_id: number;
  default?: number;
  min: number;
  max: number;
};

export type CreateGroupProductForm = {
  comboProductId: string;
  name: string;
  combinationMode: string;
  priority: number;
  quantity: number;
  productIds: string[];
};

export type TGroupProduct = {
  id: string;
  comboProductId: string;
  name: string;
  combinationMode: string;
  priority: number;
  quantity: number;
  status: string;
  productsInGroups: ProductsInGroup[];
};

export type ProductsInGroup = {
  id: string;
  groupProductId: string;
  productId: string;
  priority: number;
  additionalPrice: number;
  min: number;
  max: number;
  quantity: number;
  status: string;
};

export const PRODUCT_TYPE_OPTIONS = [
  {
    value: ProductTypeEnum.SINGLE,
    label: 'Sản phẩm đơn'
  },
  {
    value: ProductTypeEnum.PARENT,
    label: 'Sản phẩm cha'
  },
  {
    value: ProductTypeEnum.EXTRA,
    label: 'Sản phẩm extra'
  },
  {
    value: ProductTypeEnum.CHILD,
    label: 'Sản phẩm con'
  },
  {
    value: ProductTypeEnum.COMBO,
    label: 'Sản phẩm combo'
  }
];
export const PRODUCT_SIZE_OPTIONS = [
  {
    value: ProductSizeEnum.Small,
    label: 'Size S'
  },
  {
    value: ProductSizeEnum.Medium,
    label: 'Size M'
  },
  {
    value: ProductSizeEnum.Large,
    label: 'Size L'
  }
];
