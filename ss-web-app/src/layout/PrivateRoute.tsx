import { DependencyContext } from 'DependencyContext';
import React, { createContext, useContext, useState } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

type Props = {
  children?: React.ReactChild;
  path: string;
  exact?: boolean;
  component?: () => React.ReactElement;
};

const PrivateRoute = ({ children, exact = false, ...rest }: Props) => {
  const dependencies = useContext(DependencyContext);

  const location = useLocation();
  console.log('location??', location);
  const { authStore } = dependencies.stores;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (authStore.isLoggedIn) {
          return children;
        } else if (location.pathname === '/login') {
          return null;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};

export { PrivateRoute };
