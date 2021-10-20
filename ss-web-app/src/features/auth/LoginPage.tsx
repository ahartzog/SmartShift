import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory, useLocation } from 'react-router';
import { observer } from 'mobx-react';
import { DependencyContext } from 'dependencies/DependencyContext';
import axios from 'axios';
const LoginPage = observer(() => {
  const dependencies = useContext(DependencyContext);
  const token = window.localStorage.getItem(
    `${dependencies.config.LOCAL_STORAGE_AUTH_KEY}-jwt-key`
  );
  console.log('log in page token?', token);

  const history = useHistory();
  const location = useLocation();

  const onFinish = async (values: any) => {
    try {
      const result = await axios({
        url: dependencies.config.API_URL + 'auth/login',
        method: 'POST',
        data: values,
      });

      dependencies.services.bugSnagService.leaveBreadcrumb(
        'API call to log in succeeded'
      );
      //If successful, set the JWT token into localstorage
      window.localStorage.setItem(
        `${dependencies.config.LOCAL_STORAGE_AUTH_KEY}-jwt-key`,
        result.data.access_token
      );

      console.log(
        'We set it?',
        window.localStorage.getItem(
          `${dependencies.config.LOCAL_STORAGE_AUTH_KEY}-jwt-key`
        )
      );

      dependencies.stores.authStore.setIsLoggedIn(true);
      const locState = location.state as any;
      console.log('loc state??', locState);
      if (locState.from && locState.from !== '/logout') {
        history.push(locState.from);
      } else {
        history.push('/');
      }
    } catch (e) {
      throw new Error('Error signing in');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='top-login'>
      <h1>Login</h1>
      <Form
        name='login'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 4, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
export { LoginPage };
