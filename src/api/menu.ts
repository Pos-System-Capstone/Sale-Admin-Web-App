import { PosMenu, ProductFormatTypeToUpdate, TCreateMenuInformation } from 'types/menu';
import { generateAPIWithPaging } from './utils';
import requestWebAdmin from 'utils/axios';

const createNewMenu = (newMenuInformationToCreate: TCreateMenuInformation) => {
  return requestWebAdmin.post('menus', newMenuInformationToCreate);
};

const updateMenuInProduct = (
  menuId: string,
  newMenuInformationToCreate: ProductFormatTypeToUpdate[]
) => {
  return requestWebAdmin.post(`menus/${menuId}/products`, { products: newMenuInformationToCreate });
};

const menuApi = {
  createNewMenu,
  updateMenuInProduct,
  ...generateAPIWithPaging<PosMenu>('menus')
};

export default menuApi;
