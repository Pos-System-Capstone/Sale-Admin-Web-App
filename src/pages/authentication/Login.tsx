import { capitalCase } from 'change-case';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Alert, Tooltip, Container, Typography } from '@mui/material';
// routes
// hooks
import useAuth from '../../hooks/useAuth';
// layouts
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
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

            <Tooltip title={capitalCase(method)}>
              <Box
                component="img"
                src={`/static/auth/ic_${method}.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip>
          </Stack>

          <Alert severity="info" sx={{ mb: 3 }}>
            Testaccount : <strong>saleadmin</strong> / password :<strong>&nbsp;zaQ@1234</strong>
          </Alert>

          <LoginForm />
        </ContentStyle>
      </Container>
    </Box>
  );
}
