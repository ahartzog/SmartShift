import 'antd/dist/antd.css';

import {
  BugTwoTone,
  LaptopOutlined,
  NotificationOutlined,
  StarTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { Switch, Route, Link } from 'react-router-dom';
import { PrivateRoute } from 'layout/PrivateRoute';
import { pageRoutes } from './routes';
import { Button, Layout, Menu, message, Space } from 'antd';
import { EmployeesPage } from 'pages/EmployeesPage';
import { DisplayUsers } from 'features/users/DisplayUsers';
import React from 'react';
import { GlobalModal } from './GlobalModal';
import { LoginPage } from 'features/auth/LoginPage';
import { LogoutPage } from 'features/auth/LogoutPage';
import { CesiumTop } from 'pages/cesium/CesiumTop';
import { MapBox } from 'pages/MapBox/MapBox';
//import { SendEmployeesToOptimizer } from 'features/employees/SendEmployeesToOptimizer';

const MainLayout = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  return (
    <Layout>
      <PrivateRoute path='/'>
        <Header className='header'>
          <div className='logo' />
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
            <Menu.Item key='1'>
              <Link to={pageRoutes.employees}>Employees</Link>
            </Menu.Item>
            <Menu.Item key='1'>
              <Link to={pageRoutes.mapBox}>MapBox</Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link to={pageRoutes.users}>Users</Link>
            </Menu.Item>
            <Menu.Item key='3'>
              <Link to={pageRoutes.logout}>Log Out</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </PrivateRoute>

      <Layout>
        <PrivateRoute path='/'>
          <Sider width={200} className='site-layout-background'>
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key='sub1' icon={<UserOutlined />} title='subnav 1'>
                <Menu.Item key='1'>option1</Menu.Item>
                <Menu.Item key='2'>option2</Menu.Item>
                <Menu.Item key='3'>option3</Menu.Item>
                <Menu.Item key='4'>option4</Menu.Item>
              </SubMenu>
              <SubMenu key='sub2' icon={<LaptopOutlined />} title='subnav 2'>
                <Menu.Item key='5'>option5</Menu.Item>
                <Menu.Item key='6'>option6</Menu.Item>
                <Menu.Item key='7'>option7</Menu.Item>
                <Menu.Item key='8'>option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub3'
                icon={<NotificationOutlined />}
                title='subnav 3'
              >
                <Menu.Item key='9'>option9</Menu.Item>
                <Menu.Item key='10'>option10</Menu.Item>
                <Menu.Item key='11'>option11</Menu.Item>
                <Menu.Item key='12'>option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        </PrivateRoute>
        <Content
          className='site-layout-background'
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path={pageRoutes.login} component={LoginPage} />
            <Route path={pageRoutes.logout} component={LogoutPage} />
            <PrivateRoute path='/' exact component={EmployeesPage} />
            <PrivateRoute
              path={pageRoutes.employees}
              component={EmployeesPage}
            />
            {/* <PrivateRoute path={pageRoutes.cesium} component={CesiumTop} /> */}
            <PrivateRoute path={pageRoutes.mapBox} component={MapBox} />
            <PrivateRoute path={pageRoutes.users} component={DisplayUsers} />
          </Switch>
        </Content>
      </Layout>
      <Footer>
        <Space>
          <Button
            icon
            onClick={() =>
              message.info('Excellent, excellent. Keep up the good work')
            }
            type='primary'
          >
            <StarTwoTone />I like to eat chick'n
          </Button>
          <Button
            icon
            onClick={() => message.warning('You SOB. I WILL END YOU.')}
            type='dashed'
          >
            <BugTwoTone />I like to eat beef
          </Button>
        </Space>
      </Footer>
      <GlobalModal />
    </Layout>
  );
};

export default MainLayout;
