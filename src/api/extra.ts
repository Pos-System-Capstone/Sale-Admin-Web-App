import { TCategoryExtra } from 'types/category';
import { generateAPIWithPaging } from './utils';

const extraApi = {
  ...generateAPIWithPaging<TCategoryExtra>('extras')
};

export default extraApi;
