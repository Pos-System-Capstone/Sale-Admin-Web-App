import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { forwardRef, useEffect, useCallback, ReactNode } from 'react';
// material
import { Box, BoxProps, Container, Stack, Typography } from '@mui/material';
import track from 'utils/analytics';
// utils

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
  content?: ReactNode;
  actions?: ReactNode[];
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = '', content, actions, ...other }, ref) => {
    const { pathname } = useLocation();

    const sendPageViewEvent = useCallback(() => {
      track.pageview({
        page_path: pathname
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      sendPageViewEvent();
    }, [sendPageViewEvent]);

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

export default Page;
