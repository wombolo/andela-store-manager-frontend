import React, { Component } from 'react';

const NotFound = ({ location }) => (
  <div>
    <h3>Specified route <code>{location.pathname}</code> does not exist</h3>
  </div>
);

export default NotFound;
