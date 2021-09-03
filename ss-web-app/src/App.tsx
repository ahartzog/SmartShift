import './App.css';
import 'antd/dist/antd.css';

import { Button, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { apiService } from 'lib/api/apiService';
import { DemoStore } from 'lib/stores/DemoStore';
import { ErrorBoundary } from 'react-error-boundary';
import Bugsnag from '@bugsnag/js';
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import MainLayout from './layout/MainLayout';
import { BugSnagService } from 'lib/bugSnagService';

interface Dependencies {
  apiService: typeof apiService;
  bugSnagService: BugSnagService;
  stores: {
    demoStore: DemoStore;
  };
}

const BugSnagErrorBoundary =
  //@ts-ignore
  Bugsnag.getPlugin('react').createErrorBoundary(React);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  const { reset } = useQueryErrorResetBoundary();

  const [dependencies, setDependencies] = useState<Dependencies | null>(null);

  //Initialize the API service
  useEffect(() => {
    setDependencies({
      apiService,
      bugSnagService: new BugSnagService(),
      stores: {
        demoStore: new DemoStore(),
      },
    });
  }, []);

  if (dependencies === null) {
    return null;
  }

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
        <BugSnagErrorBoundary>
          <MainLayout />
          <ReactQueryDevtools />
        </BugSnagErrorBoundary>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
