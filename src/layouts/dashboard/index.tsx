import useDashboard, { withDashboard } from 'hooks/useDashboard';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

// material
import { styled, useTheme } from '@mui/material/styles';
import LoadingPage from 'components/LoadingPage';
// import { fetchGlobalState } from 'redux/admin/thunk';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
//
import useAuth from 'hooks/useAuth';
import { Role } from 'utils/role';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_DESKTOP + 12,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 12,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

function DashboardLayout() {
  const theme = useTheme();
  const { collapseClick } = useCollapseDrawer();
  const { open, setNavOpen: setOpen } = useDashboard();
  const { user } = useAuth();

  const [isLoadingState, setIsLoadingState] = useState(false);

  if (isLoadingState) {
    return <LoadingPage />;
  }

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      {!user?.role.includes(Role.SystemAdmin) && (
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      )}
      <MainStyle
        sx={{
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.complex
          }),
          ...(collapseClick && {
            ml: '102px'
          })
        }}
      >
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}

export default withDashboard(DashboardLayout);
