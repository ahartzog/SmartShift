import React from 'react';

import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { DisplayEmployees } from 'features/employees/DisplayEmployees';
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <header>
          <p>I SAY GOOD DAY SIR</p>
        </header>
        <main>
          <DisplayEmployees />
        </main>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
