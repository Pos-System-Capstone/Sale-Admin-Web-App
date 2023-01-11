import { Icon, IconifyIcon } from '@iconify/react';

// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Button, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
type ButtonWidgetProps = {
  title: string;
  icon: IconifyIcon;
  href: string;
};

export default function ButtonWidget({ title, icon, href }: ButtonWidgetProps) {
  const [isHover, setIsHover] = useState(false);

  const RootStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    //position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
    backgroundColor: isHover ? theme.palette.primary.main : theme.palette.common.white,
    minWidth: '20vw',
    minHeight: '15vh',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main
  }));

  const IconStyle = styled(Icon)(({ theme }) => ({
    width: 40,
    height: 40,
    opacity: 0.7,
    // position: 'absolute',
    right: theme.spacing(0),
    color: isHover ? theme.palette.common.white : theme.palette.primary.main
  }));

  return (
    <Link
      underline="none"
      component={RouterLink}
      to={href}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Button>
        <RootStyle>
          <Box display="flex" alignItems={'center'} flexDirection={'column'}>
            <IconStyle icon={icon} />

            <Typography sx={{ color: isHover ? 'common.white' : 'common.dark' }} variant="h4">
              {' '}
              {title}
            </Typography>
          </Box>
        </RootStyle>
      </Button>
    </Link>
  );
}
