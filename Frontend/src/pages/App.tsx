import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from 'style/global';

import { ErrorBoundary } from '../components/common/Error';
import { LoaderWrapper } from 'components/common/loader';

import { store } from 'services/redux/store';

import { setupAxios } from '../utils/functions';
import Routes from './routes';

setupAxios(store);

const queryClient = new QueryClient();

const AppContainer = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <Toaster /> {/* Global Toast */}
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <LoaderWrapper>
              <h6 style={{ textAlign: 'center' }}>Loading</h6>
            </LoaderWrapper>
          }
        >
          <BrowserRouter>
            <GlobalStyle />
            <Routes />
          </BrowserRouter>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </Provider>
  </ErrorBoundary>
);

export default AppContainer;
