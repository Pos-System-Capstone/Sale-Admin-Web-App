// routes
import { useParams } from 'react-router';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { PATH_REPORT_APP } from 'routes/reportAppPaths';
import { PATH_STORE_APP } from 'routes/storeAppPaths';
import SvgIconStyle from '../../components/SvgIconStyle';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  kanban: getIcon('ic_kanban'),
  tag: getIcon('tag'),
  menu: getIcon('menu'),
  store: getIcon('ic_store'),
  order: getIcon('ic_order'),
  category: getIcon('ic_category'),
  extraCategory: getIcon('ic_extra_category'),
  storeApply: getIcon('ic_store_apply'),
  combo: getIcon('ic_combo'),
  product: getIcon('ic_product'),
  collection: getIcon('ic_collection')
};

// SYSTEM ADMIN SIDEBAR CONFIG
export const systemAdminSidebarConfig = [
  // {
  //   subheader: 'Tổng quan',
  //   items: [
  //     {
  //       title: 'Báo cáo',
  //       path: PATH_DASHBOARD.general.analytics,
  //       icon: ICONS.dashboard
  //     }
  //   ]
  // },
  {
    subheader: 'Quản lý hệ thống',
    items: [
      {
        title: 'Danh sách thương hiệu',
        path: PATH_DASHBOARD.brand.root,
        icon: ICONS.store
      }
    ]
  }
];

//BRAND MANAGER SIDEBAR CONFIG
export const brandManagerSidebarConfig = [
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Chi tiết thương hiệu',
        path: PATH_DASHBOARD.brand.brandDetail,
        icon: ICONS.tag
      }
    ]
  },
  {
    subheader: 'Quản lý thương hiệu',
    items: [
      {
        title: 'Danh sách cửa hàng',
        path: PATH_DASHBOARD.brand.storesInBrand,
        icon: ICONS.store
      },
      {
        title: 'Danh sách tài khoản',
        path: PATH_DASHBOARD.accounts.root,
        icon: ICONS.user
      }
    ]
  }
  // {
  //   subheader: 'product-subheader',
  //   items: [
  //     // MANAGEMENT : PRODUCT
  //     {
  //       title: 'master',
  //       path: PATH_DASHBOARD.products.list,
  //       icon: ICONS.product
  //     },
  //     {
  //       title: 'combo-list',
  //       path: PATH_DASHBOARD.combos.list,
  //       icon: ICONS.combo
  //     }
  //   ]
  // },
  // {
  //   subheader: 'group-subheader',
  //   path: PATH_DASHBOARD.group.root,
  //   items: [
  //     {
  //       title: 'category',
  //       path: PATH_DASHBOARD.categories.list,
  //       icon: ICONS.category
  //     },
  //     {
  //       title: 'extra-category',
  //       path: PATH_DASHBOARD.categories.extra,
  //       icon: ICONS.extraCategory
  //     },
  //     {
  //       title: 'collection',
  //       path: PATH_DASHBOARD.collections.list,
  //       icon: ICONS.collection
  //     }
  //   ]
  // },
];

// BRAND ADMIN SIDEBAR CONFIG
export const brandAdminSidebarConfig = [
  {
    subheader: 'Quản lý thực đơn',
    items: [
      {
        title: 'Thực đơn',
        path: PATH_DASHBOARD.menus.root,
        icon: ICONS.menu
      }
      // {
      //   title: 'Cửa hàng áp dụng thực đơn',
      //   path: PATH_DASHBOARD.menus.storeMenu,
      //   icon: ICONS.storeApply
      // }
    ]
  },
  {
    subheader: 'Quản lý sản phẩm',
    items: [
      // MANAGEMENT : PRODUCT
      {
        title: 'Sản phẩm',
        path: PATH_DASHBOARD.products.list,
        icon: ICONS.product
      }
    ]
  },
  {
    subheader: 'Danh mục sản phẩm',
    path: PATH_DASHBOARD.group.root,
    items: [
      {
        title: 'Danh mục thường',
        path: PATH_DASHBOARD.categories.list,
        icon: ICONS.category
      },
      {
        title: 'Danh mục extra',
        path: PATH_DASHBOARD.categories.extra,
        icon: ICONS.extraCategory
      },
      {
        title: 'Bộ sưu tập sản phẩm',
        path: PATH_DASHBOARD.collections.list,
        icon: ICONS.collection
      }
    ]
  },
  {
    subheader: 'promotion.general',
    items: [
      {
        title: 'promotion.dashboard',
        path: PATH_PROMOTION_APP.general.app,
        icon: ICONS.dashboard
      }
    ]
  },
  {
    subheader: 'promotion.campaign',
    items: [
      {
        title: 'promotion.promotion',
        path: PATH_PROMOTION_APP.promotion.root,
        icon: ICONS.category
      },
      {
        title: 'promotion.voucher',
        path: PATH_PROMOTION_APP.voucher.root,
        icon: ICONS.tag
      },
      {
        title: 'promotion.condition',
        path: PATH_PROMOTION_APP.condition.root,
        icon: ICONS.extraCategory
      },
      {
        title: 'promotion.action',
        path: PATH_PROMOTION_APP.action.root,
        icon: ICONS.storeApply
      },
      {
        title: 'promotion.gift',
        path: PATH_PROMOTION_APP.gift.root,
        icon: ICONS.ecommerce
      }
    ]
  }
];

// STORE MANAGER SIDEBAR CONFIG
export const storeManagerSidebarConfig = [
  {
    subheader: 'Tổng quan',
    items: [
      {
        title: 'Báo cáo',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      // {
      //   title: 'Báo cáo',
      //   path: PATH_DASHBOARD.general.analytics,
      //   icon: ICONS.dashboard
      // },
      // {
      //   title: 'Báo cáo ca',
      //   path: PATH_DASHBOARD.general.ecommerce,
      //   icon: ICONS.dashboard
      // },
      {
        title: 'Chi tiết cửa hàng',
        path: PATH_DASHBOARD.stores.storeDetail,
        icon: ICONS.store
      }
    ]
  },
  {
    subheader: 'Quản lý hệ thống',
    items: [
      {
        title: 'Nhân viên',
        path: PATH_DASHBOARD.stores.accountInStore,
        icon: ICONS.user
      },
      {
        title: 'Đơn hàng ',
        path: PATH_DASHBOARD.orders.root,
        icon: ICONS.order
      },
      {
        title: 'Ca làm việc ',
        path: PATH_DASHBOARD.sessions.root,
        icon: ICONS.calendar
      }
    ]
  }
];

export const storeAppSidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     {
  //       title: 'reportDashboard',
  //       path: PATH_DASHBOARD.app,
  //       icon: ICONS.dashboard
  //     }
  //   ]
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : PRODUCT

      {
        title: 'order',
        path: PATH_STORE_APP.orders.list,
        icon: ICONS.order
      }
    ]
  }
];

export const promotionAppSidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'promotion.general',
    items: [
      {
        title: 'promotion.dashboard',
        path: PATH_PROMOTION_APP.general.app,
        icon: ICONS.dashboard
      }
    ]
  },
  {
    subheader: 'promotion.campaign',
    items: [
      {
        title: 'promotion.promotion',
        path: PATH_PROMOTION_APP.promotion.root,
        icon: ICONS.category
      },
      {
        title: 'promotion.voucher',
        path: PATH_PROMOTION_APP.voucher.root,
        icon: ICONS.tag
      },
      {
        title: 'promotion.condition',
        path: PATH_PROMOTION_APP.condition.root,
        icon: ICONS.extraCategory
      },
      {
        title: 'promotion.action',
        path: PATH_PROMOTION_APP.action.root,
        icon: ICONS.storeApply
      },
      {
        title: 'promotion.gift',
        path: PATH_PROMOTION_APP.gift.root,
        icon: ICONS.ecommerce
      }
    ]
  },
  {
    subheader: 'promotion.configuration',
    items: [
      {
        title: 'promotion.setting',
        path: PATH_PROMOTION_APP.setting.root,
        icon: ICONS.menu
      },
      {
        title: 'promotion.profile',
        path: PATH_PROMOTION_APP.profile.root,
        icon: ICONS.user
      }
    ]
  }
];

export const reportAppSidebarConfig = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { storeId } = useParams();
  const PATH_REPORT = PATH_REPORT_APP(storeId ?? '0');
  return [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      subheader: 'general',
      items: [
        // {
        //   title: 'report.dashboard',
        //   path: PATH_REPORT.general.reportDashboard,
        //   icon: ICONS.dashboard
        // },
        {
          title: 'report.home',
          path: PATH_REPORT.home,
          icon: ICONS.dashboard
        },
        {
          title: 'report.insights',
          path: PATH_REPORT.insights,
          icon: ICONS.analytics
        },
        {
          title: 'report.overviewDate',
          path: PATH_REPORT.overviewDate,
          icon: ICONS.calendar
        },
        {
          title: 'report.overviewMonth',
          path: PATH_REPORT.overviewMonth,
          icon: ICONS.calendar
        }
      ]
    },
    {
      subheader: 'report.report',
      items: [
        {
          title: 'report.productSale',
          path: PATH_REPORT.productSale,
          icon: ICONS.product
        },
        {
          title: 'report.payment',
          path: PATH_REPORT.payment,
          icon: ICONS.ecommerce
        },
        {
          title: 'report.trading',
          path: PATH_REPORT.dayReport,
          icon: ICONS.menu
        }
        // {
        //   title: 'report.stores',
        //   path: PATH_REPORT.stores,
        //   icon: ICONS.store
        // }
      ]
    }
  ];
};
