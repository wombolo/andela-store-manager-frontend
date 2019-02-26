import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './components/Routes.jsx'
import Menu from './components/Menu.jsx'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='row'>
          <div className='col-2 no-margin no-padding'>
            <Menu/>
          </div>

          <div className='col-8'>
            <Routes/>
          </div>
        </div>
      </Router>
    )
  }
}

