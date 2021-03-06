import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export class TopBar extends Component {
  render() {
    const {profile} = this.props.auth.user;
    const { cartLength }= this.props;

    if (!profile){
      return'';
    }
    return (
      <div className='row'>
        <div className='col-7'>
          <h4>User Account - <span className='text-primary'>{profile.role.toUpperCase()}</span></h4>
        </div>
        <div className='col-3'>

          <div className='row'>

            <div className='col-3'>
              <Link to={'/cart'}>
                <h6>Cart <i className='cart-count'>{cartLength} </i></h6>
              </Link>
            </div>

            <Link to={`/profile/${profile.id}`} style={{display: 'contents'}}>

              <div className='col-4'>
                <h5>{profile.firstname} {profile.lastname}</h5>
              </div>

              <div className='col-3'>
                <img src={require(`../assets/images/profile/${profile.image}`)} className='top-bar-logo'/>
              </div>
            </Link>

          </div>
        </div>
      </div>
    )
  }
}


TopBar.propTypes = {
  auth: PropTypes.shape({}).isRequired,
};

export const mapStateToProps = state => ({
  auth: state.auth,
  cartLength: state.products.cart.length
});

export default connect(mapStateToProps)(TopBar);
