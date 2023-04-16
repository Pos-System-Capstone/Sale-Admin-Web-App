import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
// material
import { Box, BoxProps, Container, Stack, Typography } from '@mui/material';
// utils

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
  content?: ReactNode;
  actions?: () => ReactNode[];
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = '', content, actions, ...other }, ref) => {
    return (
      <Box ref={ref} {...other}>
        <Helmet>
          <title>{title} | Reso Sale Management</title>
        </Helmet>
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Box pb={4}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <Typography variant="h3">{title}</Typography>
              <Stack direction="row" spacing={2}>
                {actions && actions()}
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

export default Page;
