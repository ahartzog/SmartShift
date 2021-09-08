import { DependencyContext } from "DependencyContext";
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { observer } from "mobx-react";
type Props = {
  children?: React.ReactChild;
  path: string;
  exact?: boolean;
  component?: () => React.ReactElement;
};

const PrivateRoute = observer(({ children, exact = false, ...rest }: Props) => {
  const dependencies = useContext(DependencyContext);

  const { authStore } = dependencies.stores;
  const { isLoggedIn } = authStore;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isLoggedIn) {
          return children;
        } else if (location.pathname === "/login") {
          return null;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
});

export { PrivateRoute };
