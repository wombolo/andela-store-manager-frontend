import React, { Component } from 'react';
import {
  getSingleProfile, editProfile
} from '../actions/profileActions';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Notify from "../utils/Notify";

export class ViewModifyProfile extends Component {
  state= {
    id: 1, firstname: '', lastname: '',
    email: '', role: 'admin', image: 'team-7.jpg',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSingleProfile(id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.profile) {
      const {profile} = nextProps;
      this.setState(profile);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password === this.state.conf_password){
      this.props.editProfile(this.state);
    }
    else {
      Notify.notifyError('Passwords Mismatch.');
    }
  };

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };


  render() {
    const { profile, authProfile } = this.props;

    // const imageFile = require(`../assets/images/profile/${this.state.image}`);

    return (
      <div className="row clearfix products-grid">
        <div className="col-10 m-0-auto m-t-5">
          <h3>{profile.firstname} {profile.lastname}'s Profile</h3>

          <form onSubmit={this.handleSubmit}>

            <div className="row">

              <div className="col-3">
                <figure className="image-holder">
                  <img alt={'image'} src={require(`../assets/images/profile/${this.state.image}`)} />
                  <input type={'file'} id={'image_file'}
                         onChange={ (e) => this.handleChange({
                           target:{
                             id:'image_file',
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
                    <td><label htmlFor="title">First Name</label></td>
                    <td><input id="firstname" type="text" required={true} defaultValue={this.state.firstname} onChange={this.handleChange}/></td>
                  </tr>

                  <tr>
                    <td><label htmlFor="title">Last Name</label></td>
                    <td><input id="lastname" type="text" required={true} defaultValue={this.state.lastname} onChange={this.handleChange}/></td>
                  </tr>

                  <tr>
                    <td><label htmlFor="title">Email</label></td>
                    <td>{this.state.email}</td>
                  </tr>

                  {authProfile.role === 'admin' ?
                    <tr>
                      <td><label htmlFor="title">Role</label></td>
                      <td>
                        <select id={'role'} defaultValue={this.state.role} onChange={this.handleChange}>
                          <option value='admin'>Admin</option>
                          <option value='store_attendant'>Attendant</option>
                        </select>
                      </td>
                    </tr> :
                    <tr>
                      <td><label htmlFor="title">Role</label></td>
                      <td>{this.state.role}</td>
                    </tr>
                  }

                  {authProfile.id === this.state.id ?
                    <React.Fragment>
                      <tr>
                        <td><label htmlFor="title">Password</label></td>
                        <td><input id="password" type="password" onChange={this.handleChange}/></td>
                      </tr>
                      <tr>
                        <td><label htmlFor="title">Confirm Password</label></td>
                        <td><input id="conf_password" type="password" onChange={this.handleChange}/></td>
                      </tr>
                    </React.Fragment>
                    : null
                  }
                  <tr>
                    <td>Total number of sale records created</td>
                    <td><span className="item-price">67</span></td>
                  </tr>


                  <tr>
                    <td>Total number of products sold</td>
                    <td><span>125</span></td>
                  </tr>

                  <tr>
                    <td>Total worth of goods sold</td>
                    <td><span>$9535</span></td>
                  </tr>

                  <tr>
                    <td>&nbsp;</td>
                    <td><button type="submit" className="btn btn-primary">Update</button></td>
                  </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

ViewModifyProfile.propTypes = {
  getSingleProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
};


export const mapStateToProps = state => ({
  profile: state.profile.profile,
  authProfile: state.auth.user.profile,
});

export default connect(mapStateToProps, {
  getSingleProfile, editProfile
})(ViewModifyProfile);
