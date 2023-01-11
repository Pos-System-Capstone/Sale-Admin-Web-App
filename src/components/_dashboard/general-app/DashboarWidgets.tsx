import { Icon } from '@iconify/react';

// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------
type DashboarWidgetsProp = {
  Widget: {
    title: string;
    icon: any;
    color: any;
    hoverColor: any;
    path: any;
  };
};

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3)
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  marginRight: 20,
  width: 120,
  height: 120,
  opacity: 0.2,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white
}));

// ----------------------------------------------------------------------

export default function DashboarWidgets({ Widget }: DashboarWidgetsProp) {
  const theme = useTheme();

  return (
    <>
      <Link underline="none" component={RouterLink} to={Widget.path}>
        <RootStyle
          sx={{
            backgroundColor: `${Widget.color}`,
            cursor: 'pointer',
            '&:hover': { backgroundColor: `${Widget.hoverColor}` },
            padding: '48px'
          }}
        >
          <Box sx={{ ml: 3, color: 'common.white', cursor: 'pointer' }}>
            <Typography variant="h4" sx={{ marginLeft: '-48px' }}>
              {Widget.title}
            </Typography>
            {/* <Typography variant="body2" sx={{ opacity: 0.72, marginLeft: '-110px' }}>
      Tổng quan
    </Typography> */}
          </Box>
          <IconStyle icon={Widget.icon} />
        </RootStyle>
      </Link>
    </>
  );
}
