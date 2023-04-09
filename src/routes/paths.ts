// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
export const ROOTS_DASHBOARD = '/dashboard';

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

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, ''),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  brand: {
    root: path(ROOTS_DASHBOARD, '/brands'),
    list: path(ROOTS_DASHBOARD, '/brands/'),
    brandDetail: path(ROOTS_DASHBOARD, `/brands/detail`),
    storesInBrand: path(ROOTS_DASHBOARD, `/brands/detail/stores`),
    newStore: path(ROOTS_DASHBOARD, `/brands/detail/stores/new`)
    // all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profileById: (id: string) => path(ROOTS_DASHBOARD, `/user/${id}`),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, '/user/ada-lindgren/edit'),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  products: {
    root: path(ROOTS_DASHBOARD, '/products'),
    list: path(ROOTS_DASHBOARD, '/products'),
    extraList: path(ROOTS_DASHBOARD, '/products/extras'),
    editById: (id: number) => path(ROOTS_DASHBOARD, `/products/${id}`),
    master: path(ROOTS_DASHBOARD, '/products/master'),
    newProduct: path(ROOTS_DASHBOARD, '/products/new')
  },
  collections: {
    root: path(ROOTS_DASHBOARD, '/collections'),
    list: path(ROOTS_DASHBOARD, '/collections'),
    editById: path(ROOTS_DASHBOARD, '/collections/:id'),
    new: path(ROOTS_DASHBOARD, '/collections/new')
  },
  menus: {
    root: path(ROOTS_DASHBOARD, '/menus'),
    list: path(ROOTS_DASHBOARD, '/menus'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/menus/${id}`),
    new: path(ROOTS_DASHBOARD, '/menus/new'),
    storeMenu: path(ROOTS_DASHBOARD, '/menu-in-store')
  },
  tradingReport: {
    root: path(ROOTS_DASHBOARD, '/trading-report'),
    list: path(ROOTS_DASHBOARD, '/trading-report'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/trading-report/${id}`),
    new: path(ROOTS_DASHBOARD, '/trading-report/new'),
    storeMenu: path(ROOTS_DASHBOARD, '/menu-in-store')
  },
  promotion: {
    root: path(ROOTS_DASHBOARD, '/promotion-report'),
    list: path(ROOTS_DASHBOARD, '/promotion-report'),
    editById: path(ROOTS_DASHBOARD, '/promotion-report/:id'),
    new: path(ROOTS_DASHBOARD, '/promotion-report/new')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/portfolio-review-is-this-portfolio-too-creative'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  customers: {
    root: path(ROOTS_DASHBOARD, '/customers'),
    list: path(ROOTS_DASHBOARD, '/customers'),
    new: path(ROOTS_DASHBOARD, '/customers/new')
  },
  categories: {
    root: path(ROOTS_DASHBOARD, '/categories'),
    list: path(ROOTS_DASHBOARD, '/categories'),
    extra: path(ROOTS_DASHBOARD, '/categories/extra'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/categories/${id}`),
    new: path(ROOTS_DASHBOARD, '/categories/new')
  },
  combos: {
    root: path(ROOTS_DASHBOARD, '/combos'),
    list: path(ROOTS_DASHBOARD, '/combos'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/combos/${id}`),
    new: path(ROOTS_DASHBOARD, '/combos/new')
  },
  group: {
    root: path(ROOTS_DASHBOARD, '/orders'),
    list: path(ROOTS_DASHBOARD, '/groups'),
    category: path(ROOTS_DASHBOARD, '/groups/category'),
    'extra-category': path(ROOTS_DASHBOARD, '/groups/extra-category'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/combos/${id}`),
    new: path(ROOTS_DASHBOARD, '/combos/new')
  },
  orders: {
    root: path(ROOTS_DASHBOARD, '/orders'),
    list: path(ROOTS_DASHBOARD, '/orders'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/orders/${id}`)
  },
  stores: {
    root: path(ROOTS_DASHBOARD, '/stores'),
    new: path(ROOTS_DASHBOARD, '/stores/new'),
    storeDetail: path(ROOTS_DASHBOARD, `/stores/detail`),
    accountInStore: path(ROOTS_DASHBOARD, `/stores/detail/accounts`),
    storeById: (storeId: string) => path(ROOTS_DASHBOARD, `/stores/${storeId}`)
  },
  sessions: {
    root: path(ROOTS_DASHBOARD, '/sessions'),
    new: path(ROOTS_DASHBOARD, '/sessions/new'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/sessions/${id}`)
  },
  accounts: {
    root: path(ROOTS_DASHBOARD, '/accounts'),
    new: path(ROOTS_DASHBOARD, '/accounts/new'),
    editById: (id: any) => path(ROOTS_DASHBOARD, `/accounts/${id}`)
  },
  log: {
    root: path(ROOTS_DASHBOARD, '/log')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
