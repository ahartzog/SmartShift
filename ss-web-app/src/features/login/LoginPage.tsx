import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { DependencyContext } from 'DependencyContext';

const LoginPage = () => {
  const dependencies = useContext(DependencyContext);

  const { axiosFetch } = dependencies.services.apiService;

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const result = await axiosFetch({
      url: 'auth/login',
      method: 'POST',
      data: values,
    });
    //If successful, set the JWT token into localstorage
    window.localStorage.setItem(
      `${dependencies.config.LOCAL_STORAGE_AUTH_KEY}-jwt-key`,
      result.data.access_token
    );
    console.log('result?', result);
    console.log(
      'topken??',
      window.localStorage.getItem(
        `${dependencies.config.LOCAL_STORAGE_AUTH_KEY}-jwt-key`
      )
    );
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
};
export { LoginPage };
