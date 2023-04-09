import { MenuStatus, PosMenu, ProductFormatTypeToUpdate, TCreateMenuInformation } from 'types/menu';
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

const updateMenuStatus = (menuId: string, newMenuStatus: MenuStatus) => {
  const payLoad = {
    op: '/update',
    path: '/status',
    value: `${newMenuStatus}`
  };
  return requestWebAdmin.patch(`menus/${menuId}`, payLoad);
};

const menuApi = {
  createNewMenu,
  updateMenuInProduct,
  updateMenuStatus,
  ...generateAPIWithPaging<PosMenu>('menus')
};

export default menuApi;
