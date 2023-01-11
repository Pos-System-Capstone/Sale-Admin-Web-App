// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/store-admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_STORE_APP = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  products: {
    root: path(ROOTS_DASHBOARD, '/products'),
    list: path(ROOTS_DASHBOARD, '/products'),
    editById: path(ROOTS_DASHBOARD, '/products/:id'),
    master: path(ROOTS_DASHBOARD, '/products/master'),
    newProduct: path(ROOTS_DASHBOARD, '/products/new')
  },
  menus: {
    root: path(ROOTS_DASHBOARD, '/menus'),
    list: path(ROOTS_DASHBOARD, '/menus'),
    editById: path(ROOTS_DASHBOARD, '/menus/:id'),
    newProduct: path(ROOTS_DASHBOARD, '/menus/new'),
    storeMenu: path(ROOTS_DASHBOARD, '/menus/stores')
  },
  orders: {
    root: path(ROOTS_DASHBOARD, '/orders'),
    list: path(ROOTS_DASHBOARD, '/orders'),
    editById: path(ROOTS_DASHBOARD, '/orders/:id'),
    new: path(ROOTS_DASHBOARD, '/orders/new')
  }
};
