import 'babel-polyfill';
import React from "react";
import { Route, Switch } from 'react-router-dom';

import Home from "./Home.jsx";
import Login from "./Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import NotFound from "./NotFound.jsx"
import Dashboard from "./Dashboard.jsx";
import AllProducts from "./AllProducts.jsx";
import AddProduct from "./AddProduct.jsx";
import ViewModifyProduct from "./ViewModifyProduct.jsx";
import Cart from "./Cart.jsx";
import AllSales from "./AllSales.jsx";
import ViewModifyProfile from "./ViewModifyProfile.jsx";
import AddProfile from "./AddProfile.jsx";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}> </Route>
    <Route exact path="/login" component={Login}/>
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/all-products" component={AllProducts} />
    <PrivateRoute path="/add-product" component={AddProduct} />
    <PrivateRoute path="/add-profile" component={AddProfile} />
    <PrivateRoute exact path="/edit-product/:id" component={ViewModifyProduct} />
    <PrivateRoute exact path="/cart" component={Cart} />
    <PrivateRoute exact path="/all-sales" component={AllSales} />
    <PrivateRoute exact path="/profile/:id" component={ViewModifyProfile} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
