import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
// material
import { Box, BoxProps, Container, Stack, Typography } from '@mui/material';
// utils

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
  content?: ReactNode;
  actions?: ReactNode[];
}

const ReportPage = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = '', content, actions, ...other }, ref) => {
    const { pathname } = useLocation();

    return (
      <Box ref={ref} {...other}>
        <Helmet>
          <title>{title} | Sale reso</title>
        </Helmet>
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Box pb={4}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <Typography variant="h3">{title}</Typography>
              <Stack direction="row" spacing={2}>
                {actions && actions.map((item) => item)}
              </Stack>
            </Stack>
            {content}
          </Box>
          {children}
        </Container>
      </Box>
    );
  }
);

export default ReportPage;
