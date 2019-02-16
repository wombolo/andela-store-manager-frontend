import React from "react";
import { Route, Switch } from 'react-router-dom';

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import NotFound from "./NotFound.jsx"

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
