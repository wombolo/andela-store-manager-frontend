import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Menu extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><NavLink to="/" >Home</NavLink></li>
          <li><NavLink to="/login" >Login</NavLink></li>
        </ul>
      </div>
    )
  }
}
