import { TProduct } from 'types/product';
import { generateAPIWithPaging } from './utils';

const productApi = {
  ...generateAPIWithPaging<TProduct>('products')
};

export default productApi;
