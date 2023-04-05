import { Box, CardActionArea, Drawer, Link, Stack, Tooltip, Typography } from '@mui/material';
// material
import { alpha, styled } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import { MHidden } from '../../components/@material-extend';
// components
import Logo from '../../components/Logo';
import MyAvatar from '../../components/MyAvatar';
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
// hooks
import useAuth from '../../hooks/useAuth';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// routes
import { ROOTS_DASHBOARD as ROOTS_DASHBOARD_PROMOTION } from '../../routes/promotionAppPaths';
import { ROOTS_DASHBOARD as ROOTS_DASHBOARD_REPORT } from '../../routes/reportAppPaths';
import { PATH_DASHBOARD } from '../../routes/paths';

//
import {
  promotionAppSidebarConfig,
  reportAppSidebarConfig,
  storeAppSidebarConfig,
  brandManagerSidebarConfig,
  systemAdminSidebarConfig,
  brandAdminSidebarConfig,
  storeManagerSidebarConfig
} from './SidebarConfig';
import { Role } from 'utils/role';

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

const DocStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.primary.main, 0.08)
      : theme.palette.primary.lighter
}));

// ----------------------------------------------------------------------

type IconCollapseProps = {
  onToggleCollapse: VoidFunction;
  collapseClick: boolean;
};

function IconCollapse({ onToggleCollapse, collapseClick }: IconCollapseProps) {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          width: 18,
          height: 18,
          display: 'flex',
          cursor: 'pointer',
          borderRadius: '50%',
          alignItems: 'center',
          color: 'text.primary',
          justifyContent: 'center',
          border: 'solid 1px currentColor',
          ...(collapseClick && {
            borderWidth: 2
          })
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'currentColor',
            transition: (theme) => theme.transitions.create('all'),
            ...(collapseClick && {
              width: 0,
              height: 0
            })
          }}
        />
      </CardActionArea>
    </Tooltip>
  );
}

type DashboardSidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { storeId } = useParams();
  // const system = useSelector((state: RootState) => state.system);
  // const systems = localStorage.getItem('system');
  const sidebarConfig = useMemo(() => {
    const firstElementOfPath = pathname.split('/')[1];
    if (user?.role.includes(Role.SystemAdmin)) {
      console.log('Sysadmin');
      return systemAdminSidebarConfig;
    }
    if (user?.role.includes(Role.BrandManager)) {
      console.log('BrandManager');
      return brandManagerSidebarConfig;
    }
    if (user?.role.includes(Role.BrandAdmin)) {
      console.log('BrandAdmin');
      return brandAdminSidebarConfig;
    }
    if (user?.role.includes(Role.StoreManager)) {
      return storeManagerSidebarConfig;
    }
    // if (firstElementOfPath === ROOTS_DASHBOARD_SALE.split('/')[1]) return adminSidebarConfig;
    if (firstElementOfPath === ROOTS_DASHBOARD_REPORT.split('/')[1]) {
      const reportSideBarConfig = reportAppSidebarConfig();
      return reportSideBarConfig;
    }
    if (firstElementOfPath === ROOTS_DASHBOARD_PROMOTION.split('/')[1])
      return promotionAppSidebarConfig;

    // if (system === '') {
    //   if (firstElementOfPath === 'dashboard') return adminSidebarConfig;
    // } else {
    //   if (system === 'reso-sale') return adminSidebarConfig;
    // }

    // if (user?.role?.includes('admin')) {
    //   return adminSidebarConfig;
    // }
    if (user?.role?.includes('store-admin')) {
      return storeAppSidebarConfig;
    }
    if (user?.role?.includes('report-admin')) {
      const reportSideBarConfig = reportAppSidebarConfig();
      return reportSideBarConfig;
    }
    if (user?.role?.includes('promotion-admin')) {
      return promotionAppSidebarConfig;
    }
    return systemAdminSidebarConfig;
  }, [pathname, user?.role]);

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: 'center'
          })
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo />
          </Box>

          <MHidden width="lgDown">
            {!isCollapse && (
              <IconCollapse onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
            )}
          </MHidden>
        </Stack>

        {isCollapse ? (
          <MyAvatar sx={{ mx: 'auto', mb: 2 }} />
        ) : (
          <Link
            underline="none"
            component={RouterLink}
            to={PATH_DASHBOARD.user.profileById(user?.id)}
          >
            <AccountStyle>
              <MyAvatar />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary', fontSize: '11px' }}>
                  {user?.displayName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '10px' }}>
                  {user?.role.includes(Role.SystemAdmin) && 'Admin'}
                  {user?.role.includes(Role.BrandManager) && 'Quản lí nhãn hàng'}
                  {user?.role.includes(Role.BrandAdmin) && 'Admin nhãn hàng'}
                  {user?.role.includes(Role.StoreManager) && 'Quản lí cửa hàng'}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        )}
      </Stack>

      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        })
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
              })
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
