import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

export default () => (
  <Switch>
    <Redirect from="/" to="/login" exact />
    <Route path="/login" component={Login} exact />
    <Route path="/dashboard" component={Dashboard} exact />
  </Switch>
);
