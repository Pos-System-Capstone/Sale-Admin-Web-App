import { TProductBase } from 'types/product';
import { generateAPIWithPaging } from './utils';

const productApi = {
  ...generateAPIWithPaging<TProductBase>('admin/products')
};

export default productApi;
