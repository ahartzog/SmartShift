import { Button } from "antd";
import { DependencyContext } from "DependencyContext";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { useMount } from "ahooks";
const LogoutPage = () => {
  const dependencies = useContext(DependencyContext);
  const history = useHistory();

  useMount(() => {
    console.log("Mount logout page....");
    dependencies.stores.authStore.setIsLoggedIn(false);
  });

  return (
    <div>
      <h1>You are now logged out</h1>
      <Button onClick={() => history.push("/login")} type="primary">
        Go to Login
      </Button>
    </div>
  );
};
export { LogoutPage };
