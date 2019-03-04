import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllProducts, addToCart } from '../actions/productActions';
import {Link} from "react-router-dom";

export class AllProducts extends Component {
  componentWillMount() {
    this.props.getAllProducts();
  }

  addToCart = (product) =>{
    // console.log('>>>', product);
    this.props.addToCart(product);
  };

  render() {
    const {products} = this.props.products;

    return (
      <div>
        <h1>All Products</h1>

        <div className="row big-row products-row">
          {
            products.map(product => {

              return (
                <div key={product.id}>
                  <figure className="image-holder">
                    <Link to={`/edit-product/${product.id}`}>
                      <img src={`../assets/images/${product.image}`}/>
                    </Link>
                  </figure>
                  <div className="row">
                    <div className="col-3"><span className="pull-left item-price"> $ {product.price}</span></div>
                    <div className="col-6">

                      <button className="pull-right min-btn btn-primary" onClick={() => this.addToCart(product)}>Add to Cart</button>
                    </div>
                  </div>
                  <h3>
                    <Link to={`/edit-product/${product.id}`}>
                    {product.title}</Link>
                  </h3>
                </div>
              )
            })
          }

        </div>
      </div>
    )
  }
}

AllProducts.propTypes = {
  products: PropTypes.shape({}).isRequired,
  getAllProducts: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  getAllProducts,addToCart
})(AllProducts);

