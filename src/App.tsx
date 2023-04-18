// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
// import Settings from 'components/settings';
import { useState } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import GoogleAnalytics from './components/GoogleAnalytics';
import { ProgressBarStyle } from './components/LoadingScreen';
import NotistackProvider from './components/NotistackProvider';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import ThemeLocalization from './components/ThemeLocalization';
import ThemePrimaryColor from './components/ThemePrimaryColor';

// ----------------------------------------------------------------------

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2
          }
        },
        queryCache: new QueryCache({
          // onSuccess: (data) => console.log(data)
        })
      })
  );
  // const { isInitialized } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <ThemeConfig>
        <ThemePrimaryColor>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                <GlobalStyles />
                <ProgressBarStyle />
                <BaseOptionChartStyle />
                <ScrollToTop />
                <GoogleAnalytics />
                <Router />
                {/* <Settings /> */}
                {/* {isInitialized ? <Router /> : <LoadingScreen />} */}
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemePrimaryColor>
      </ThemeConfig>
    </QueryClientProvider>
  );
}
