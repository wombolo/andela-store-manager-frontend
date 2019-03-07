import React, { Component } from 'react';
import {addNewProduct} from '../actions/productActions';
import PropTypes from "prop-types";
import {connect} from "react-redux";

export class AddProduct extends Component {
  state={
    image_file:'',
    title:'',
    price:'',
    quantity:'',
    description:'',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addNewProduct(this.state);
  };

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  render() {
    return (
      <div>
        <h1>Add New Product</h1>

        <div className="row clearfix products-grid">
          <div className="col-10 m-0-auto m-t-5">
            <h3>Single Product Page</h3>
            <form onSubmit={this.handleSubmit}>

              <div className="row">

                <div className="col-3">
                  <figure className="image-holder">
                    <img alt={'image'} src="../assets/images/products/product-1.png" />
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
                      <td><label htmlFor="title">Name</label></td>
                      <td><input id="title" type="text" required={true} onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                      <td><label htmlFor="description">Description</label></td>
                      <td><textarea rows={15} id="description" required={true} onChange={this.handleChange}/></td>
                    </tr>

                    <tr>
                      <td><label htmlFor="price">Price</label></td>
                      <td><input id="price" type="number" step={'.01'} required={true} onChange={this.handleChange}/></td>
                    </tr>

                    <tr>
                      <td><label htmlFor="quantity">Quantity Available</label></td>
                      <td><input id="quantity" type={'number'} required={true} onChange={this.handleChange}/></td>
                    </tr>

                    <tr>
                      <td><label>Product Category</label></td>
                      <td><select>
                        <option>Choose One</option>
                        <option>Fiction/ Sci-Fi</option>
                        <option>Comedy</option>
                        <option>Romance</option>
                        <option>Adventure</option>
                        <option>Thriller</option>
                        <option>Drama</option>
                      </select></td>
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

AddProduct.propTypes = {
  addNewProduct: PropTypes.func.isRequired
};

export default connect(null, {
  addNewProduct,
})(AddProduct);
