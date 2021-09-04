import 'antd/dist/antd.css';

import {
  BugTwoTone,
  LaptopOutlined,
  NotificationOutlined,
  StarTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, message, Space } from 'antd';
import { EmployeesPage } from 'pages/EmployeesPage';
import React from 'react';
import Config from 'lib/config';
//import { SendEmployeesToOptimizer } from 'features/employees/SendEmployeesToOptimizer';

const MainLayout = () => {
  console.log('config??', Config);
  console.log('prcess', process.env);
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  return (
    <Layout>
      <Header className='header'>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
          <Menu.Item key='1'>Nav 1</Menu.Item>
          <Menu.Item key='2'>Nav 2</Menu.Item>
          <Menu.Item key='3'>Nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
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
        <Content
          className='site-layout-background'
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
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
          <EmployeesPage />
        </Content>
      </Layout>
      <Footer>Feet?</Footer>
    </Layout>
  );
};

export default MainLayout;
