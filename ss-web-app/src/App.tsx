import './App.css';
import 'antd/dist/antd.css';

import { Button, Layout, Menu } from 'antd';
import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import MainLayout from './layout/MainLayout';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });
  const { reset } = useQueryErrorResetBoundary();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <Button onClick={() => resetErrorBoundary()}>Try again</Button>
          </div>
        )}
      >
        <MainLayout />
        <ReactQueryDevtools />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
