import './App.css';
import 'antd/dist/antd.css';

import { ErrorBoundary } from 'components/ErrorBoundary';
import { WebhookTest } from 'components/WebSocketTest';
import { Dependencies } from 'dependencies/Dependencies';
import { DependencyContext } from 'dependencies/DependencyContext';
import Config from 'lib/config';
import { configure } from 'mobx';
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import MainLayout from './layout/MainLayout';

// const BugSnagErrorBoundary =
//   Bugsnag.getPlugin('react').createErrorBoundary(React);

if (Config.ENV !== 'production') {
  configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true,
  });
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: false,
      },
    },
  });

  const [dependencies] = useState<Dependencies>(new Dependencies());

  useEffect(() => {
    const setupDeps = async () => {
      await dependencies.extraSetup();
    };
    if (!dependencies.didFinishSetup) {
      setupDeps();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <DependencyContext.Provider value={dependencies}>
        <ErrorBoundary errorText='Top level error! Oh no!'>
          <RecoilRoot>
            <Router>
              <MainLayout />
            </Router>
            <WebhookTest />
            <ReactQueryDevtools />
          </RecoilRoot>
        </ErrorBoundary>
      </DependencyContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
