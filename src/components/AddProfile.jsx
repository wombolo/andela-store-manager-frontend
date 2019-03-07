import React, { Component } from 'react';
import {addNewProfile} from '../actions/profileActions';
import PropTypes from "prop-types";
import {connect} from "react-redux";

export class AddProfile extends Component {
  state={
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    image: '',
    password: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addNewProfile(this.state);
  };

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  render() {
    return (
      <div>
        <h1>Add New User</h1>

        <div className="row clearfix products-grid">
          <div className="col-10 m-0-auto m-t-5">
            <form onSubmit={this.handleSubmit}>

              <div className="row">

                <div className="col-3">
                  <figure className="image-holder">
                    <img alt={'image'} src={require("../assets/images/profile/team-7.jpg")} />
                    <input type={'file'} id={'image'}
                           onChange={ (e) => this.handleChange({
                             target:{
                               id:'image',
                               value: e.target.files[0],
                             }
                           })
                           }/>

                  </figure>
                </div>


                <div className="col-7">
                  <table border="0" width="100%" className="product-single-table table-striped">
                    <tbody>
                    <tr>
                      <td><label htmlFor="firstname">First Name</label></td>
                      <td><input id="firstname" type="text" required={true} onChange={this.handleChange}/></td>
                    </tr>

                    <tr>
                      <td><label htmlFor="lastname">Last Name</label></td>
                      <td><input id="lastname" type="text" required={true} onChange={this.handleChange}/></td>
                    </tr>

                    <tr>
                      <td><label htmlFor="email">Email</label></td>
                      <td><input id="email" type="email" required={true} onChange={this.handleChange}/></td>
                    </tr>

                    <tr>
                      <td><label>Role</label></td>
                      <td>
                        <select id={'role'} onChange={this.handleChange}>
                          <option>---Choose One---</option>
                          <option value='store_attendant'>Attendant</option>
                          <option value='admin'>Admin</option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td><label htmlFor="password">Password</label></td>
                      <td><input id="password" type="password" onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                      <td><label htmlFor="conf_password">Confirm Password</label></td>
                      <td><input id="conf_password" type="password" onChange={this.handleChange}/></td>
                    </tr>

                    <tr>
                      <td>&nbsp;</td>
                      <td><button type="submit" className="btn btn-primary">Save</button>
                        <button type="reset" className="btn btn-danger">Clear</button></td>
                    </tr>
                    </tbody>

                  </table>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddProfile.propTypes = {
  addNewProfile: PropTypes.func.isRequired
};

export default connect(null, {
  addNewProfile,
})(AddProfile);
