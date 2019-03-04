import React, { Component } from 'react';
import {getSingleProducts, editProduct, deleteProduct} from '../actions/productActions';
import PropTypes from "prop-types";
import {connect} from "react-redux";

export class ViewModifyProduct extends Component {
  state= {};

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSingleProducts(id);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.editProduct(this.state);
  };

  handleDeleteProduct = (id) => {
    if (confirm('Are you sure to delete')){
      this.props.deleteProduct(id);
    }
  };

  handleChange = (event) => {
    if (event.target.id === 'image_file') {
      const img = document.getElementById('image_file').files[0];
      this.setState({image_file: img});
    }
    else {
      this.setState({[event.target.id]: event.target.value});
    }
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.product) {
      const {product} = nextProps;
      this.setState(product);
    }
  }

  render() {
    const { profile } = this.props;
    if (profile.role === 'admin'){
      return (
         <div className="row clearfix products-grid">
            <div className="col-10 m-0-auto m-t-5">
              <h3>{this.state.title}</h3>
              <form onSubmit={this.handleSubmit}>

                <div className="row">

                  <div className="col-3">
                    <figure className="image-holder">
                      <img alt={'image'} src={`../assets/images/${this.state.image}`} />
                      <input type={'file'} id={'image_file'} onChange={this.handleChange}/>
                    </figure>
                  </div>


                  <div className="col-7">
                    <table border="0" width="100%" className="product-single-table table-striped">
                      <tbody>
                      <tr>
                        <td><label htmlFor="title">Name</label></td>
                        <td><input id="title" type="text" required={true} defaultValue={this.state.title} onChange={this.handleChange}/></td>
                      </tr>
                      <tr>
                        <td><label htmlFor="description">Description</label></td>
                        <td><textarea rows={15} id="description" required={true} onChange={this.handleChange}
                                      value={this.state.description}/></td>
                      </tr>

                      <tr>
                        <td><label htmlFor="price">Price</label></td>
                        <td><input id="price" type="number" step={'.01'}
                                   defaultValue={this.state.price}
                                   required={true} onChange={this.handleChange}/></td>
                      </tr>

                      <tr>
                        <td><label htmlFor="quantity">Quantity Available</label></td>
                        <td><input id="quantity" type={'number'}
                                   defaultValue={this.state.quantity}
                                   required={true} onChange={this.handleChange}/></td>
                      </tr>

                      <tr>
                        <td><label>Product Category</label></td>
                        <td><select>
                          <option>Fiction/ Sci-Fi</option>
                          <option>Comedy</option>
                          <option>Romance</option>
                          <option>Adventure</option>
                          <option>Thriller</option>
                          <option>Drama</option>
                        </select></td>
                      </tr>


                      <tr>
                        <td><label htmlFor="price">Creation Date</label></td>
                        <td>{ new Date(this.state.cdate).toDateString()}</td>
                      </tr>

                      <tr>
                        <td>&nbsp;</td>
                        <td><button type="submit" className="btn btn-primary">Update</button>
                          <button type='reset' onClick={() => (this.handleDeleteProduct(this.state.id))} className="btn btn-danger">Delete Product</button></td>
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
    else {
      return (
        <div className="row clearfix products-grid">
          <div className="col-10 m-0-auto m-t-5">
            <h3>{this.state.title}</h3>

              <div className="row">
                <div className="col-3">
                  <figure className="image-holder">
                    <img alt={'image'} src={`../assets/images/${this.state.image}`} />
                  </figure>
                </div>

                <div className="col-7">
                  <table border="0" width="100%" className="product-single-table table-striped">
                    <tbody>
                    <tr>
                      <td><label htmlFor="title">Name</label></td>
                      <td>{this.state.title}</td>
                    </tr>
                    <tr>
                      <td><label htmlFor="description">Description</label></td>
                      <td>{this.state.description}</td>
                    </tr>

                    <tr>
                      <td><label htmlFor="price">Price</label></td>
                      <td>{this.state.price}</td>
                    </tr>

                    <tr>
                      <td><label htmlFor="quantity">Quantity Available</label></td>
                      <td>{this.state.quantity}</td>
                    </tr>

                    <tr>
                      <td><label>Product Category</label></td>
                      <td>Thriller</td>
                    </tr>

                    <tr>
                      <td><label htmlFor="price">Creation Date</label></td>
                      <td>{ new Date(this.state.cdate).toDateString()}</td>
                    </tr>

                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        <button className="pull-right min-btn btn-primary" onClick={() => this.addToCart(this.state)}>Add to Cart</button>
                        </td>
                    </tr>

                    </tbody>

                  </table>
                </div>
              </div>
          </div>
        </div>
      )
    }

  }
}

ViewModifyProduct.propTypes = {
  getSingleProducts: PropTypes.func.isRequired
};


export const mapStateToProps = state => ({
  product: state.products.singleProduct,
  profile: state.auth.user.profile
});

export default connect(mapStateToProps, {
  getSingleProducts, editProduct, deleteProduct,
})(ViewModifyProduct);
