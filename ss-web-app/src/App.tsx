import './App.css';
import 'antd/dist/antd.css';

import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Dependencies } from 'Dependencies';
import MainLayout from './layout/MainLayout';
import { DependencyContext } from 'DependencyContext';
// const BugSnagErrorBoundary =
//   Bugsnag.getPlugin('react').createErrorBoundary(React);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  const { reset } = useQueryErrorResetBoundary();

  const [dependencies] = useState<Dependencies>(new Dependencies());

  useEffect(() => {
    const setupDeps = async () => {
      await dependencies.extraSetup();
    };
    if (!dependencies.didFinishSetup) {
      setupDeps();
    }
  }, [dependencies]);

  return (
    <QueryClientProvider client={queryClient}>
      <DependencyContext.Provider value={dependencies}>
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              There was an error!
              <Button onClick={() => resetErrorBoundary()}>Try again</Button>
            </div>
          )}
        >
          {/* <BugSnagErrorBoundary> */}
          <MainLayout />
          <ReactQueryDevtools />
          {/* </BugSnagErrorBoundary> */}
        </ErrorBoundary>
      </DependencyContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
