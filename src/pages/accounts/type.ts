import { CreateProductForm } from 'types/product';
import * as yup from 'yup';

export type UpdateProductForm = CreateProductForm;

export const DEFAULT_VALUES: UpdateProductForm = {
  code: 'TEST',
  product_name: 'Test sp',
  description: 'mo ta',
  // product_type: 6,
  pic_url: '',
  hasVariant: true,
  seo_name: 'seo link',
  seo_key_words: 'seo keys',
  seo_description: 'seo des',
  is_available: true,
  cat_id: 44,
  tags: [],
  variants: [
    { optName: 'size', values: ['M', 'L'] },
    { optName: 'color', values: ['Red', 'Blue'] }
  ],
  child_products: []
};

export const validationSchema = yup.object({
  code: yup.string().required('Vui lòng nhập mã sản phẩm'),
  product_name: yup.string().required('Vui lòng nhập tên sản phẩm'),
  price: yup
    .number()
    .typeError('Vui lòng nhập giá sản phẩm')
    .required('Vui lòng nhập giá sản phẩm'),
  cat_id: yup
    .number()
    .typeError('Vui lòng chọn Danh mục cho sản phẩm')
    .required('Vui lòng chọn Danh mục cho sản phẩm')
});
