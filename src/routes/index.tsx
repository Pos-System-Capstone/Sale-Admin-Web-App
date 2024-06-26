import BlogNewPost from 'pages/dashboard/BlogNewPost';
// static
import BlogPost from 'pages/dashboard/BlogPost';
// layouts
import BlogPosts from 'pages/dashboard/BlogPost';
import DashBoardReport from 'pages/report/DashBoardReport';
import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// components
import LoadingScreen from '../components/LoadingScreen';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// path
import BrandListPage from 'pages/Brands/BrandList';
import Insights from 'pages/report/Insights';
import useAuth from 'hooks/useAuth';
import { Role } from 'utils/role';
import PromotionDash from 'pages/dashboard/PromotionSystemDashboard';
import ActionPage from 'pages/promotionEngine/Action';
import NewActionPage from 'pages/promotionEngine/Action/create';
import ConditionPage from 'pages/promotionEngine/Condition';
import NewCondition from 'pages/promotionEngine/Condition/createCondition';
import ProfilePage from 'pages/promotionEngine/Configuration/profile';
import SettingPage from 'pages/promotionEngine/Configuration/settings';
import GiftPage from 'pages/promotionEngine/Gift';
import NewGiftPage from 'pages/promotionEngine/Gift/create';
import CreatePromotion from 'pages/promotionEngine/Promotion/CreatePromotion';
import CreateVoucher from 'pages/promotionEngine/Voucher/createVoucher';
import Promotion from 'pages/promotionEngine/Promotion';
import Voucher from 'pages/promotionEngine/Voucher';
import DateReport from 'pages/report/TradingReport/DateReport';
import MonthReport from 'pages/report/TradingReport/MonthReport';
import TimeReport from 'pages/report/TradingReport/TimeReport';
import PromotionReport from 'pages/report/PromotionReport';
import DayReport from 'pages/report/TradingReport';
import UpdateActionPage from 'pages/promotionEngine/Action/update';
import UpdatePromotion from 'pages/promotionEngine/Promotion/PromotionDetail/update';
import UpdateConditionPage from 'pages/promotionEngine/Condition/updateCondition';
import DetailVoucher from 'pages/promotionEngine/Voucher/detailVoucher';
import ProductPromotion from 'pages/promotionEngine/Products';
import ProductCategory from 'pages/promotionEngine/Category';
import UpdateProductCategory from 'pages/promotionEngine/Category/update';
import UpdateProductPromotion from 'pages/promotionEngine/Products/update';
import MemberShipList from 'pages/MemberShip/components';
import CreateMembership from 'pages/MemberShip/CreateMembership/CreateMembership';
import MembershipDetail from 'pages/MemberShip/components/MembershipDetail';
import MemberShipProgramsList from 'pages/MemberShip/MembershipProgram/components';
import MembershipProgramsDetail from 'pages/MemberShip/MembershipProgram/components/MembershipProgramsDetail';
import TransactionList from 'pages/Brands/TransactionList';
import ListVariants from 'pages/Products/Variants';
import CreateVariant from 'pages/Products/Variants/components/CreateVariant';
import DetailVariant from 'pages/Products/Variants/components/DetailVariant';
import CreateProductCategory from 'pages/promotionEngine/Category/create';
import StorePromotionListPage from 'pages/promotionEngine/Store';
import CreateStorePromotion from 'pages/promotionEngine/Store/create';
import UpdateStorePromotion from 'pages/promotionEngine/Store/update';
import ChannelPromotion from 'pages/promotionEngine/Channel';
import CreateChannelPromotion from 'pages/promotionEngine/Channel/create';
import PassioPolicy from 'pages/ComingSoonPassio';

// import ReportGeneralApp from 'pages/report/GeneralReport/GeneralApp';

// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const { user } = useAuth();

  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        // {
        //   path: 'register',
        //   element: (
        //     <GuestGuard>
        //       <Register />
        //     </GuestGuard>
        //   )
        // },
        { path: 'login-unprotected', element: <Login /> }
        // { path: 'register-unprotected', element: <Register /> },
        // { path: 'reset-password', element: <ResetPassword /> },
        // { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={[]}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        {
          path: '',
          element: user?.role.includes(Role.BrandAdmin) ? (
            <Navigate to="/dashboard/app" replace />
          ) : user?.role.includes(Role.SystemAdmin) ? (
            <Navigate to="/dashboard/brands" replace />
          ) : (
            <Navigate to="/dashboard/app" replace />
          )
        },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        {
          path: 'analytics',
          element: <GeneralAnalytics />
        },
        {
          path: 'brands',
          children: [
            { path: '', element: <BrandListPage /> },
            { path: 'orders', element: <OrderListBrandPage /> },
            { path: 'transactions', element: <TransactionList /> },
            { path: ':brandId', element: <BrandDetail /> },
            {
              path: 'detail',
              children: [
                { path: '', element: <BrandDetail /> },
                {
                  path: 'stores',
                  children: [
                    { path: '', element: <StoreOfBrandList /> },
                    { path: 'new', element: <CreateStorePage /> }
                  ]
                }
              ]
            },
            {
              path: 'new',
              element: <CreateNewBrand />
            }
          ]
        },
        {
          path: 'stores',
          children: [
            {
              path: ':storeId',
              children: [
                { path: '', element: <StoreDetail /> },
                { path: 'accounts', element: <StoreEmployeeList /> }
              ]
            }
          ]
        },
        {
          path: 'sessions',
          children: [
            {
              path: 'new',
              element: <CreateAccount />
            },
            { path: '', element: <SessionListPage /> }
          ]
        },
        {
          path: 'accounts',
          children: [
            {
              path: 'new',
              element: <CreateAccount />
            },
            { path: '', element: <AccountListPage /> }
          ]
        },
        {
          path: 'user',
          children: [
            {
              path: ':accountId',
              children: [{ path: '', element: <UserProfile /> }]
            }
          ]
        },
        {
          path: 'orders',
          children: [
            { path: '', element: <OrderListPage /> },
            { path: 'new', element: <CreateProduct /> },
            { path: ':id', element: <UpdateProduct /> },
            { path: 'master', element: <Products /> }
          ]
        },
        {
          path: 'products',
          children: [
            { path: '', element: <Products /> },
            { path: 'new', element: <CreateProduct /> },
            { path: ':id', element: <UpdateProduct /> },
            { path: 'extras', element: <Products /> },
            { path: 'master', element: <Products /> }
          ]
        },
        {
          path: 'variants',
          children: [
            { path: '', element: <ListVariants /> },
            { path: 'new', element: <CreateVariant /> },
            { path: ':id', element: <DetailVariant /> }
          ]
        },
        {
          path: 'combos',
          children: [
            { path: '', element: <ComboListPage /> },
            { path: 'new', element: <CreateComboPage /> },
            { path: ':comboId', element: <UpdateComboPage /> },
            { path: 'master', element: <Products /> }
          ]
        },
        {
          path: 'collections',
          children: [
            { path: '', element: <CollectionListPage /> },
            { path: 'new', element: <CreateCollectionPage /> },
            { path: ':id', element: <UpdateCollectionPage /> }
          ]
        },
        {
          path: 'categories',
          children: [
            { path: 'extra', element: <CategoryListPage isExtra /> },
            { path: '', element: <CategoryListPage /> },
            { path: 'new', element: <CreateCategoryPage /> },
            { path: ':id', element: <UpdateCategoryPage /> }
          ]
        },
        {
          path: 'blog',
          children: [
            { path: '', element: <Navigate to="/dashboard/blog/posts" replace /> },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:id', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> }
          ]
        },
        {
          path: 'menus',
          children: [
            { path: '', element: <MenusPage /> },
            { path: ':id', element: <UpdateMenuPage /> }
          ]
        },
        { path: 'menu-in-store', element: <MenuInStorePage /> },
        {
          path: 'customers',
          children: [
            { path: '', element: <CustomerListPage /> },
            { path: 'new', element: <ComingSoon /> }
          ]
        }
      ]
    },
    // Report system Routes
    {
      path: 'report',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={[]}>
            <DashBoardReport />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="0/home" replace /> },
        {
          path: ':storeId',
          children: [
            // { path: '', element: <Navigate to="dashboard" replace /> },
            {
              path: 'home',
              element: <HomePage />
            },
            {
              path: 'insights',
              element: <Insights />
            },
            // { path: 'dashboard', element: <ReportDashboard /> },
            {
              path: 'overview-date',
              element: <OverviewDate />
            },
            {
              path: 'overview-month',
              element: <OverviewMonth />
            },
            {
              path: 'payment',
              children: [{ path: '', element: <PaymentReport /> }]
            },
            {
              path: 'product-progress',
              children: [{ path: '', element: <ProductProgressReport /> }]
            },
            {
              path: 'product-sale',
              children: [{ path: '', element: <ProductSaleReport /> }]
            },
            {
              path: 'day-report',
              children: [
                { path: '', element: <DayReport /> },
                { path: 'time-report', element: <TimeReport /> },
                { path: 'date-report', element: <DateReport /> },
                { path: 'month-report', element: <MonthReport /> }
              ]
            },
            {
              path: 'promotion',
              children: [{ path: '', element: <PromotionReport /> }]
            },
            {
              path: 'stores',
              children: [{ path: '', element: <StoreReport /> }]
            }
          ]
        }
      ]
    },
    {
      path: 'promotion-system',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={[]}>
            <DashBoardReport />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/promotion-system/app" replace /> },
        { path: 'app', element: <PromotionDash /> },
        {
          path: 'promotion-store',
          children: [
            { path: '', element: <StorePromotionListPage /> },
            { path: 'new', element: <CreateStorePromotion /> },
            { path: ':id', element: <UpdateStorePromotion /> }
          ]
        },
        {
          path: 'promotion-channel',
          children: [
            { path: '', element: <ChannelPromotion /> },
            { path: 'new', element: <CreateChannelPromotion /> }
          ]
        },
        {
          path: 'promotion',
          children: [
            { path: '', element: <Promotion /> },
            { path: 'new', element: <CreatePromotion /> },
            { path: ':id', element: <UpdatePromotion /> }
          ]
        },
        {
          path: 'voucher-groups',
          children: [
            { path: '', element: <Voucher /> },
            { path: 'new', element: <CreateVoucher /> },
            // { path: 'detail', element: <DetailVoucher /> },
            { path: ':id', element: <DetailVoucher /> }
            // { path: ':id', element: <DetailVoucher /> }
          ]
        },
        {
          path: 'condition',
          children: [
            { path: '', element: <ConditionPage /> },
            { path: 'new', element: <NewCondition /> },
            { path: ':id', element: <UpdateConditionPage /> }
          ]
        },
        {
          path: 'action',
          children: [
            { path: '', element: <ActionPage /> },
            { path: 'new', element: <NewActionPage /> },
            { path: ':id', element: <UpdateActionPage /> }
          ]
        },
        {
          path: 'gift',
          children: [
            { path: '', element: <GiftPage /> },
            { path: 'new', element: <NewGiftPage /> }
          ]
        },
        {
          path: 'setting',
          children: [{ path: '', element: <SettingPage /> }]
        },
        {
          path: 'profile',
          children: [{ path: '', element: <ProfilePage /> }]
        },
        {
          path: 'membership',
          children: [
            { path: '', element: <MemberShipList /> },
            { path: 'new', element: <CreateMembership /> },
            { path: ':id', element: <MembershipDetail /> }
          ]
        },
        {
          path: 'membership-programs',
          children: [
            { path: '', element: <MemberShipProgramsList /> },
            { path: 'new', element: <CreateMembership /> },
            { path: ':id', element: <MembershipProgramsDetail /> }
          ]
        },
        {
          path: 'product-promotion',
          children: [
            { path: '', element: <ProductPromotion /> },
            { path: ':id', element: <UpdateProductPromotion /> }
          ]
        },
        {
          path: 'product-category',
          children: [
            { path: '', element: <ProductCategory /> },
            { path: 'new', element: <CreateProductCategory /> },
            { path: ':id', element: <UpdateProductCategory /> }
          ]
        }
      ]
    },
    // FOR STORE ADMIN
    {
      path: 'store-admin',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={['store-admin']}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/store-admin/orders" replace /> },
        { path: 'reportDashboard', element: <></> },

        {
          path: 'orders',
          children: [
            { path: '', element: <OrderListPage /> },
            {
              path: 'new',
              element: <CreateStorePage />
            },
            { path: ':id', element: <UpdateStorePage /> }
          ]
        },
        {
          path: 'blog',
          children: [
            { path: '', element: <Navigate to="/dashboard/blog/posts" replace /> },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> }
          ]
        },
        {
          path: 'menus',
          element: <MenuStoreManagementPage />
        }
      ]
    },

    {
      path: '/',
      element: <Navigate to="/auth/login" replace />
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'policy', element: <ComingSoon /> },
        { path: 'policy-passio', element: <PassioPolicy /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));

const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Components
const Products = Loadable(lazy(() => import('../pages/Products/Products')));
const UpdateProduct = Loadable(lazy(() => import('../pages/Products/UpdateProduct')));
const CreateProduct = Loadable(lazy(() => import('../pages/Products/create')));

const BrandDetail = Loadable(lazy(() => import('../pages/Brands/components/BrandDetail')));
const OrderListBrandPage = Loadable(lazy(() => import('../pages/Brands/OrderList')));
const StoreDetail = Loadable(lazy(() => import('../pages/Stores/components/StoreDetail')));
const CreateNewBrand = Loadable(
  lazy(() => import('../pages/Brands/components/CreateNewBrand/CreateNewBrand'))
);

// Menu
const MenusPage = Loadable(lazy(() => import('../pages/Menus')));
const UpdateMenuPage = Loadable(lazy(() => import('../pages/Menus/update')));
const MenuInStorePage = Loadable(lazy(() => import('../pages/Menus/MenuInStore')));

// Collection
const CollectionListPage = Loadable(lazy(() => import('../pages/collections')));
const UpdateCollectionPage = Loadable(lazy(() => import('../pages/collections/update')));
const CreateCollectionPage = Loadable(lazy(() => import('../pages/collections/create')));

// Store
const StoreOfBrandList = Loadable(lazy(() => import('../pages/Stores/StoresOfBrandList')));
const CreateStorePage = Loadable(
  lazy(() => import('../pages/Stores/components/CreateNewStore/CreateNewStore'))
);
const UpdateStorePage = Loadable(lazy(() => import('../pages/Stores/update')));
const StoreEmployeeList = Loadable(lazy(() => import('../pages/accounts/AccountListPage')));

// Store-Order
const OrderListPage = Loadable(lazy(() => import('../pages/Orders/OrderList')));
const MenuStoreManagementPage = Loadable(lazy(() => import('../pages/Orders/MenuOfStore')));

// Categories
const CategoryListPage = Loadable(lazy(() => import('../pages/Categories')));
const CreateCategoryPage = Loadable(lazy(() => import('../pages/Categories/CreateCategory')));
const UpdateCategoryPage = Loadable(lazy(() => import('../pages/Categories/UpdateCategory')));

// customers
const CustomerListPage = Loadable(lazy(() => import('../pages/Customer/CustomerListPage')));

// combos
const ComboListPage = Loadable(lazy(() => import('../pages/Products/Combos/ComboList')));
const CreateComboPage = Loadable(lazy(() => import('../pages/Products/Combos/CreateCombo')));
const UpdateComboPage = Loadable(lazy(() => import('../pages/Products/Combos/UpdateCombo')));

// accounts
const AccountListPage = Loadable(lazy(() => import('../pages/accounts/AccountListPage')));
const CreateAccount = Loadable(lazy(() => import('../pages/accounts/CreateAccount')));

//log
const LogPage = Loadable(lazy(() => import('../pages/Log')));

// report
const OverviewDate = Loadable(lazy(() => import('../pages/report/Overview/OverviewDate')));
const OverviewMonth = Loadable(lazy(() => import('../pages/report/Overview/OverviewMonth')));
const StoreReport = Loadable(lazy(() => import('../pages/report/StoreReport')));
const ProductSaleReport = Loadable(
  lazy(() => import('../pages/report/ProductReport/ProductSaleReport'))
);
const ProductProgressReport = Loadable(
  lazy(() => import('../pages/report/ProductReport/ProductProgressReport'))
);
const PaymentReport = Loadable(lazy(() => import('../pages/report/PaymentReport')));
const HomePage = Loadable(lazy(() => import('../pages/report/Home')));

// user
const UserProfile = Loadable(lazy(() => import('../components/_dashboard/user/profile/Profile')));

//sessions
const SessionListPage = Loadable(lazy(() => import('../pages/Sessions')));
