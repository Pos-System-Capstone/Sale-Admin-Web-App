import { Icon } from '@iconify/react';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box, Link } from '@mui/material';
// utils
// import { fNumber } from '../../../utils/formatNumber';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------
type FeatureProp = {
  Features: {
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
  padding: theme.spacing(3),
  height: 140
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white
}));

// ----------------------------------------------------------------------

export default function MenuWidgets({ Features }: FeatureProp) {
  const theme = useTheme();
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <Link underline="none" component={RouterLink} to={Features.path}>
        <RootStyle
          sx={{
            backgroundColor: `${Features.color}`,
            cursor: 'pointer',
            '&:hover': { backgroundColor: `${Features.hoverColor}`, padding: '60px' }
          }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <Box sx={{ ml: 3, color: 'common.white', cursor: 'pointer' }}>
            <Typography variant="h3" sx={{ marginLeft: '-20px' }}>
              {Features.title}
            </Typography>
            {isShown && (
              <Typography variant="subtitle1" sx={{ opacity: 0.72, marginLeft: '-20px' }}>
                Doanh thu cao nhất
              </Typography>
            )}
          </Box>
          <IconStyle icon={Features.icon} />
        </RootStyle>
      </Link>
    </>
  );
}
