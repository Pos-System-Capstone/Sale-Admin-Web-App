import BlogNewPost from 'pages/dashboard/BlogNewPost';
// static
import BlogPost from 'pages/dashboard/BlogPost';
// layouts
import BlogPosts from 'pages/dashboard/BlogPosts';
import DashBoardReport from 'pages/report/DashBoardReport';
import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
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
          element: user?.role.includes(Role.SystemAdmin) ? (
            // <Navigate to="/dashboard/analytics" replace />
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
          path: 'promotion',
          children: [
            { path: '', element: <Promotion /> },
            { path: 'new', element: <CreatePromotion /> }
          ]
        },
        {
          path: 'voucher',
          children: [
            { path: '', element: <Voucher /> },
            { path: 'new', element: <CreateVoucher /> }
          ]
        },
        {
          path: 'condition',
          children: [
            { path: '', element: <ConditionPage /> },
            { path: 'new', element: <NewCondition /> }
          ]
        },
        {
          path: 'action',
          children: [
            { path: '', element: <ActionPage /> },
            { path: 'new', element: <NewActionPage /> }
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
        { path: 'coming-soon', element: <ComingSoon /> },
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
const HomePage = Loadable(lazy(() => import('../pages/report/Home')));

// user
const UserProfile = Loadable(lazy(() => import('../components/_dashboard/user/profile/Profile')));

//sessions
const SessionListPage = Loadable(lazy(() => import('../pages/Sessions')));
