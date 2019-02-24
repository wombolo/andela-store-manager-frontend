import 'babel-polyfill';
import React from "react";
import { Route, Switch } from 'react-router-dom';

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import NotFound from "./NotFound.jsx"
import Dashboard from "./Dashboard.jsx";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}> </Route>
    <Route exact path="/login" component={Login}> </Route>
    <Route path="/dashboard" component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
