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
          <NavLink to="/" className='links'>Home</NavLink>
          <NavLink to="/login" className='links'>Login</NavLink>
          <i className='links'> </i>
        </React.Fragment>);
    } else {

      const {profile} = user;
      const AdminLinks = [
        { to: '/add-product', name: 'Add New Product'},
      ];

      const AttendantLinks =[
        // { to: '/all-sales', name: 'My Sales'}
      ];

      const thisUserLinks = profile.role === 'admin' ? AdminLinks : AttendantLinks ;

      links = (
        <React.Fragment>
          <NavLink to="/" className='links'>Home</NavLink>
          <NavLink to="/dashboard" className='links'>Dashboard</NavLink>
          <div className='links'>
            <NavLink to="/all-products" className='links'>All Products</NavLink>

            {thisUserLinks.map(link => (
              <NavLink to={link.to} key={link.to} className='links'> {link.name} </NavLink>
            ))}

            <NavLink to={'/all-sales'} className='links'> All Sales </NavLink>

            <NavLink to="/login" className='links' onClick={this.handleLogout}>Logout</NavLink>
          </div>
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
