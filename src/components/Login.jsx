import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../actions/authActions';

/**
 * @param {function} event
 *  @returns {JSX} jsx
 */
export class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  /**
   * @param {function} render
   *  @returns {JSX} jsx
   */
  render() {
    return (

      <div className="container">
        <div className="row">
          <div className="col-5 m-0-auto m-t-15">

            <div className="logo">Vy Superstore</div>
            <div className="form-box">
              <h2 className="text-center">Login </h2>

              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="col-3">
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="col-7">
                    <input className="form-control" type="email" id="email" onChange={this.handleChange} value={this.state.email}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-3">
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="col-7">
                    <input className="form-control" type="password" id="password" onChange={this.handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-3">&nbsp;</div>
                  <div className="col-7">
                    <button
                      type='submit'
                      className="btn btn-primary"
                      disabled={this.props.auth.isLoading}>
                      {this.props.auth.isLoading ? 'Loading...' : 'Login'}
                    </button>
                    <button type="reset" className="btn btn-dark">Reset</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  loginUser: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps,
  { loginUser })(withRouter(Login));
