import React from 'react';

import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { DisplayEmployees } from 'features/employees/DisplayEmployees';
import { Layout, Button } from 'antd';
import 'antd/dist/antd.css';
function App() {
  const { Header, Content, Footer, Sider } = Layout;
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Header>
          <p>I SAY GOOD DAY SIR</p>
        </Header>
        <Layout>
          <Sider>left sidebar</Sider>
          <Content>
            <DisplayEmployees />
            <Button type='primary'></Button>
          </Content>
        </Layout>
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
