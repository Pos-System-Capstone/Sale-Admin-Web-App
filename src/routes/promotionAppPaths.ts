// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
export const ROOTS_DASHBOARD = '/promotion-system';

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

export const PATH_PROMOTION_APP = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app')
  },
  promotion: {
    root: path(ROOTS_DASHBOARD, '/promotion'),
    new: path(ROOTS_DASHBOARD, '/promotion/new'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/promotion/${id}`)
  },
  voucher: {
    root: path(ROOTS_DASHBOARD, '/voucher-groups'),
    new: path(ROOTS_DASHBOARD, '/voucher-groups/new'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/voucher-groups/${id}`)
  },
  membership: {
    root: path(ROOTS_DASHBOARD, '/membership'),
    new: path(ROOTS_DASHBOARD, '/membership/new'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/membership/${id}`)
  },
  membershipProgram: {
    root: path(ROOTS_DASHBOARD, '/membership-programs'),
    new: path(ROOTS_DASHBOARD, '/membership-programs/new'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/membership-programs/${id}`)
  },
  condition: {
    root: path(ROOTS_DASHBOARD, '/condition'),
    new: path(ROOTS_DASHBOARD, '/condition/new'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/condition/${id}`)
  },
  action: {
    root: path(ROOTS_DASHBOARD, '/action'),
    new: path(ROOTS_DASHBOARD, '/action/new'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/action/${id}`)
  },
  gift: {
    root: path(ROOTS_DASHBOARD, '/gift'),
    new: path(ROOTS_DASHBOARD, '/gift/new')
  },
  store: {
    root: path(ROOTS_DASHBOARD, '/store'),
    new: path(ROOTS_DASHBOARD, '/store/new'),
    list: path(ROOTS_DASHBOARD, '/store/list')
  },
  setting: {
    root: path(ROOTS_DASHBOARD, '/setting')
  },
  profile: {
    root: path(ROOTS_DASHBOARD, '/profile')
  },
  product: {
    root: path(ROOTS_DASHBOARD, '/product-promotion'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/product-promotion/${id}`)
  },
  category: {
    root: path(ROOTS_DASHBOARD, '/product-category'),
    new: path(ROOTS_DASHBOARD, '/product-category/new'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/product-category/${id}`)
  }
};
