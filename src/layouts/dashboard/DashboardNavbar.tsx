import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Icon } from '@iconify/react';
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material';
// material
import { alpha, styled } from '@mui/material/styles';
import Label from 'components/Label';
import { useLocation, useNavigate, useParams } from 'react-router';
import { MHidden } from '../../components/@material-extend';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  padding: 0,
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 2)
  }
}));

// ----------------------------------------------------------------------

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};

export const DashboardNavLayout = ({ onOpenSidebar, children, ...props }: any) => {
  const { isCollapse } = useCollapseDrawer();
  return (
    <RootStyle
      position="fixed"
      {...props}
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        ...(isCollapse && {
          width: { lg: `calc(100% - 80px)` }
        }),
        ...(props.sx || {})
      }}
    >
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />

        {children}
      </ToolbarStyle>
    </RootStyle>
  );
};

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const { isCollapse } = useCollapseDrawer();
  const { pathname } = useLocation();

  const navigate = useNavigate();
  // const { translate } = useLocales();
  // const [open, setOpen] = useState(false);
  // const firstElementOfPath = pathname.split('/')[1];
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const envLabelColor = (env: any) => {
    switch (env) {
      case 'development':
        return 'warning';
      case 'qa':
        return 'primary';
      case 'production':
        return 'success';
      default:
        return 'info';
    }
  };

  const { storeId } = useParams();

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - 80px)` }
        })
      }}
    >
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }} size="large">
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* {firstElementOfPath === 'report' && (
            <Label color="success" sx={{ marginRight: '350px', height: '30px', fontSize: '15px' }}>
              {nameStoreReport?.name || 'HỆ THỐNG'}
            </Label>
          )} */}
          {process.env.REACT_APP_ENVIROMENT !== 'production' && (
            <Label color={envLabelColor(process.env.REACT_APP_ENVIROMENT)}>
              {process.env.REACT_APP_ENVIROMENT}
            </Label>
          )}
          {/* <Button
            onClick={() => {
              navigate('/report');
            }}
          >
            Report
          </Button> */}
          {/* <Button
            onClick={() => {
              navigate('/dashboard');
            }}
          >
            Sale
          </Button> */}
          <Button
            onClick={() => {
              navigate('/promotion-system');
            }}
          >
            Promotion
          </Button>

          {/* <LanguagePopover /> */}
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
