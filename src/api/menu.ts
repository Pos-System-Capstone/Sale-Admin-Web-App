import { Menu } from 'types/menu';
import { generateAPIWithPaging } from './utils';

const menuApi = {
  ...generateAPIWithPaging<Menu>('menus')
};

export default menuApi;
