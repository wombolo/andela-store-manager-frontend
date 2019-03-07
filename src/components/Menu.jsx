import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Menu extends Component {
  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  headerLinks = ({isAuthenticated, user}) => {
    let links;

    if (!isAuthenticated) {
      links = (
        <React.Fragment>
          <ul>
            <li><NavLink to="/" className='links'>Home</NavLink></li>
            <li><NavLink to="/login" className='links'>Login</NavLink></li>
          </ul>
        </React.Fragment>);
    } else {

      const {profile} = user;
      const AdminLinks = [
        { to: '/add-product', name: 'Add New Product'},
        { to: '/add-profile', name: 'Add New User'},
      ];

      const AttendantLinks =[
        // { to: '/all-sales', name: 'My Sales'}
      ];

      const thisUserLinks = profile.role === 'admin' ? AdminLinks : AttendantLinks;

      links = (
        <React.Fragment>
          <ul>
            <li><NavLink to="/" className='links'>Home</NavLink></li>
            <li><NavLink to="/dashboard" className='links'>Dashboard</NavLink></li>
          </ul>

          <ul className='links'>
            <li><NavLink to="/all-products" className='links'>All Products</NavLink></li>
            {thisUserLinks.map(link => (
              <li key={link.to}><NavLink to={link.to} className='links'> {link.name} </NavLink></li>
            ))}

            <li><NavLink to={'/all-sales'} className='links'> All Sales </NavLink></li>
            <li><NavLink to="/login" className='links' onClick={this.handleLogout}>Logout</NavLink></li>
          </ul>
        </React.Fragment>);
    }
    return links;
  };

  render() {
    return (
      <div className='sidebar-menu'>
        {this.headerLinks(this.props.auth)}
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
