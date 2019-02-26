import 'babel-polyfill';
import React from "react";
import { Route, Switch } from 'react-router-dom';

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import GuestRoute from "./GuestRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import NotFound from "./NotFound.jsx"
import Dashboard from "./Dashboard.jsx";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}> </Route>
    <GuestRoute exact path="/login" component={Login}/>
    <PrivateRoute path="/dashboard" component={Dashboard} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
