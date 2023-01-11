import { TStore } from 'types/store';
import { generateAPIWithPaging } from './utils';

const storeApi = {
  ...generateAPIWithPaging<TStore>('stores')
};

export default storeApi;
