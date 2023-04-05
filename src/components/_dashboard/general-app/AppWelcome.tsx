// material
import { Card, CardContent, CardProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SeoIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

interface AppWelcomeProps extends CardProps {
  displayName?: string;
}

export default function AppWelcome({ displayName }: AppWelcomeProps) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800'
        }}
      >
        <Typography gutterBottom variant="h3">
          Chào mừng,
          <br /> {!displayName ? '...' : displayName}
        </Typography>

        <Typography variant="body1" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          Chúc {displayName} một ngày tốt lành! <br />
          Vào việc thôi. Let's go
        </Typography>
        {/* <Button variant="contained" to="#" component={RouterLink}>
          Go Now
        </Button> */}
      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
