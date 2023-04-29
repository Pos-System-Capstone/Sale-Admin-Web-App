// material
import { Box, Card, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
// hooks
import useAuth from '../../hooks/useAuth';
// layouts
// components
import { MHidden } from '../../components/@material-extend';
import Page from '../../components/Page';
import { LoginForm } from '../../components/authentication/login';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  return (
    <Box display="flex">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Xin chào, <br />
            Mừng bạn quay lại
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Đăng nhập
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Điền thông tin để đăng nhập.</Typography>
            </Box>
          </Stack>

          {/* <Alert severity="info" sx={{ mb: 3 }}>
            Test System Admin : <strong>admin</strong> / password :<strong>&nbsp;123456</strong>
          </Alert>
          <Alert severity="info" sx={{ mb: 3 }}>
            Test Brand Manager : <strong>katinatmanager</strong> / password :
            <strong>&nbsp;1234567</strong>
          </Alert>
          <Alert severity="info" sx={{ mb: 3 }}>
            Test Store Manager : <strong>katinatstoremanager</strong> / password :
            <strong>&nbsp;1234567</strong>
          </Alert>
          <Alert severity="info" sx={{ mb: 3 }}>
            Test Brand Admin : <strong>KatinatAdmin</strong> / password :
            <strong>&nbsp;1234567</strong>
          </Alert> */}

          <LoginForm />
        </ContentStyle>
      </Container>
    </Box>
  );
}
