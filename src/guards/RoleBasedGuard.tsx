import { ReactNode } from 'react';
import { Container, Alert, AlertTitle, Button, Stack } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  accessibleRoles: String[];
  children: ReactNode | string;
};

const useCurrentRole = (): String[] => {
  const { user } = useAuth();
  // Logic here to get current user role
  const role = user?.roles ?? [];
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }: RoleBasedGuardProp) {
  const currentRole = useCurrentRole();
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (
    accessibleRoles?.length !== 0 &&
    !accessibleRoles.some((r) => currentRole.some((ur) => ur === r))
  ) {
    return (
      <Container sx={{ height: '100vh' }}>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
        <Stack direction="row" justifyContent="center">
          <Button onClick={() => navigate('/')}>Back to home</Button>
          <Button onClick={logout} variant="outlined" color="inherit">
            Logout
          </Button>
        </Stack>
      </Container>
    );
  }

  return <>{children}</>;
}
