import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './assets/main.scss';
import store from './store'

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
);
