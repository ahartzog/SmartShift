import { Button } from 'antd';
import { DependencyContext } from 'DependencyContext';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useMount } from 'ahooks';
const LogoutPage = () => {
  const dependencies = useContext(DependencyContext);
  const history = useHistory();

  useMount(() => {
    dependencies.stores.authStore.setIsLoggedIn(false);
    window.localStorage.removeItem(
      `${dependencies.config.LOCAL_STORAGE_AUTH_KEY}-jwt-key`
    );
  });

  return (
    <div>
      <h1>You are now logged out</h1>
      <Button onClick={() => history.push('/login')} type='primary'>
        Go to Login
      </Button>
    </div>
  );
};
export { LogoutPage };