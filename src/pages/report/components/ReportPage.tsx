import { forwardRef, ReactNode, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { Box, BoxProps, Container, Stack, Typography } from '@mui/material';
import track from 'utils/analytics';

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
  content?: ReactNode;
  actions?: ReactNode[];
}

const ReportPage = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = '', content, actions, ...other }, ref) => {
    const { pathname } = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const sendPageViewEvent = useCallback(() => {
      track.pageview({
        page_path: pathname
      });
    }, [pathname]);

    useEffect(() => {
      sendPageViewEvent();
    }, [sendPageViewEvent]);

    return (
      <Box ref={ref} {...other}>
        <Helmet>
          <title>{title} | Sale reso</title>
        </Helmet>
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Box
            pb={4}
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: isMobile ? 'flex-start' : 'space-between'
            }}
          >
            <Typography variant="h3" sx={{ pb: '1rem' }}>
              {title}
            </Typography>
            <Stack direction="row" spacing={2}>
              {actions && actions.map((item) => item)}
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
