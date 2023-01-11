export enum ProductTypeEnum {
  Single = 0,
  Room = 2,
  AdditionFee = 3,
  Extra = 5,
  General = 6,
  Detail = 7,
  CardPayment = 8,
  Combo = 1,
  Sample = 9,
  Complex = 10,
  CHARGES = 11
}

export enum CombinationModeEnum {
  FixedCombo = 0,
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

export type TGroupProduct = {
  id: number;
  base_product_id: number;
  collection_id?: number;
  combination_mode?: CombinationModeEnum;
  default_min_max: string;
  product_id?: number;
  position: number;
  description: string;
  quantity: number;
  product_name: string;
};

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

export type TProductInCollection = TProductBase & {
  position?: number;
};

export type TProductMaster = TProductBase & {
  child_products: TProductBase[];
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
