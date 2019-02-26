import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const GuestRoute = ({component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={props => (!auth.isAuthenticated ? (<Component {...props} />) : (
          <Redirect to={{
            pathname: '/dashboard',
            state: { from: props.location },
          }}/>
          ))}
    />
);

GuestRoute.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(GuestRoute);
