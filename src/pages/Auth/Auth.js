import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import AuthLayout from "./AuthLayout";
import Logout from "./Logout";

export default function AuthRouter() {
  return (
    <Switch>
      <AuthLayout>
        <Route path="/auth" exact component={() => <Redirect to="/auth/login" />} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/logout" component={Logout} />
      </AuthLayout>
    </Switch>
  );
}
