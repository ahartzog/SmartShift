import { DependencyContext } from 'DependencyContext';
import React, { createContext, useContext, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

type Props = {
  children?: React.ReactChild;
  path: string;
  exact?: boolean;
  component?: () => React.ReactElement;
};

const PrivateRoute = ({ children, exact = false, ...rest }: Props) => {
  const dependencies = useContext(DependencyContext);

  const { authStore } = dependencies.stores;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authStore.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export { PrivateRoute };
