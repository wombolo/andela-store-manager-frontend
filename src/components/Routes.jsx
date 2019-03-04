import 'babel-polyfill';
import React from "react";
import { Route, Switch } from 'react-router-dom';

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import GuestRoute from "./GuestRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import NotFound from "./NotFound.jsx"
import Dashboard from "./Dashboard.jsx";
import AllProducts from "./AllProducts.jsx";
import AddProduct from "./AddProduct.jsx";
import ViewModifyProduct from "./ViewModifyProduct.jsx";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}> </Route>
    <GuestRoute exact path="/login" component={Login}/>
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/all-products" component={AllProducts} />
    <PrivateRoute path="/add-product" component={AddProduct} />
    <PrivateRoute exact path="/edit-product/:id" component={ViewModifyProduct} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
