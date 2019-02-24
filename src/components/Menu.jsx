import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Menu extends Component {

  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  headerLinks = (isAuthenticated) => {
    let links;
    if (!isAuthenticated) {
      links = (
        <React.Fragment>
          <NavLink to="/" className='links'>Home</NavLink>
          <NavLink to="/login" className='links'>Login</NavLink>
          <i className='links'> </i>
        </React.Fragment>);
    } else {
      links = (
        <React.Fragment>
          <NavLink to="/" className='links'>Home</NavLink>
          <NavLink to="/dashboard" className='links'>Dashboard</NavLink>
          <NavLink to="/login" className='links' onClick={this.handleLogout}>Logout</NavLink>
        </React.Fragment>);
    }
    return links;
  }

  render() {
    return (
      <div className='sidebar-menu'>
        {this.headerLinks(this.props.auth.isAuthenticated)}
      </div>
    )
  }
}


Menu.propTypes = {
  auth: PropTypes.shape({}).isRequired,
};

export const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Menu);
