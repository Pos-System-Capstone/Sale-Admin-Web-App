import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import Logo from '../Logo';

import illustration from '../../assets/images/illustration_dashboard.png';

const LoadingPage = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    width="100vw"
    height="100vh"
  >
    <Box mb={4} textAlign="center">
      <img src={illustration} alt="Sale Illustration" />
    </Box>

    <CircularProgress />
    <Box marginTop="2rem" mb={1} display="flex" alignItems="center">
      <Logo sx={{ mr: '1rem' }} />
      <Typography variant="h5" color="primary">
        Reso Sales
      </Typography>
    </Box>
    <Typography variant="subtitle1">Giải pháp tối ưu cho bán hàng</Typography>
  </Box>
);
export default LoadingPage;
