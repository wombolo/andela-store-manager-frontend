import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAllCartItems, handleCheckout, removeFromStoreCart} from "../actions/productActions";

export class Cart extends Component {
  state = {};

  componentWillMount() {
    const {cart} = this.props;
    this.setState({cart});
  }

  handleQuantityChange = (event) =>{
    const itemId = parseInt(event.currentTarget.dataset.itemid);
    const itemValue = event.target.value;

    const cart = this.state.cart.splice(0);
    const position =  cart.findIndex((elem) => (elem.id === itemId ));
    cart[position].cartQty = itemValue;
    this.setState({cart})
  };

  handleRemoveFromCart = (id) =>{
    const cart = this.state.cart.splice(0);
    const position =  cart.findIndex((elem) => (elem.id === id ));
    cart.splice(position, 1);

    this.setState({cart: cart});
    this.props.removeFromStoreCart(cart);

  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleCheckout(this.state.cart);
  };

  render() {
    const {cart} = this.state;
    let iteration = 0, grandTotalItems = 0, grandTotalAmount = 0;

    return (
      <div>
        <h1>Checkout</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="row clearfix">
            <div className="col-10 m-0-auto m-t-5">
              <h3>Cart </h3>

              <table className="dataTable table-striped" border="1" cellPadding="5">
                <thead>
                <tr>
                  <td>S/N</td>
                  <td>Transaction ID</td>
                  <td>Item Image</td>
                  <td>Item Name</td>
                  <td>Item Price</td>
                  <td>Item Quantity</td>
                  <td>Amount</td>
                  <td>Action</td>
                </tr>
                </thead>

                <tbody>
                {cart.length > 0 ?
                  cart.map(item =>{
                  const thisAmountTotal = parseFloat((item.price * item.cartQty).toFixed(2));

                  iteration++;
                  grandTotalItems += parseInt(item.cartQty);
                  grandTotalAmount += thisAmountTotal;

                  return(
                    <tr key={iteration}>
                    <td>{iteration}</td>
                    <td><code>{Math.random().toString(36).substring(7).toUpperCase()}</code></td>
                    <td><img src={require(`../assets/images/${item.image}`)} /></td>
                    <td>{item.title}</td>
                    <td>$ {item.price}</td>
                    <td><input type={'number'}
                               data-itemid={item.id}
                               defaultValue={item.cartQty}
                               max={item.cartQty + item.quantity}
                               onChange={this.handleQuantityChange} /></td>
                    <td>$ {thisAmountTotal}</td>
                    <td><button type='reset' id={`remove-${item.id}`} className='text-danger' onClick={()=> (this.handleRemoveFromCart(item.id))}>Remove</button></td>
                  </tr>
                  )
                })
                  : <tr><td colSpan="8" className='center'>No Items in Cart</td></tr>}
                </tbody>

                <tfoot>
                <tr>
                  <td colSpan="5">Grand Total</td>
                  <td>{grandTotalItems}</td>
                  <td>$ {grandTotalAmount}</td>
                  <td> </td>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {cart.length > 0 ?
            <div className="row clearfix">
              <div className="col-8"></div>
              <div className="col-2 pull-right">
                <button className="btn btn-success">Checkout</button>
              </div>
            </div>
            : ''
          }
        </form>
      </div>
    )
  }
}

Cart.propTypes = {
  getAllCartItems: PropTypes.func.isRequired,
  handleCheckout: PropTypes.func.isRequired,
  removeFromStoreCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  profile: PropTypes.shape({}).isRequired,
};

export const mapStateToProps = state => ({
  cart: state.products.cart,
  profile: state.auth.user.profile
});

export default connect(mapStateToProps,{
  getAllCartItems, handleCheckout, removeFromStoreCart
})
(Cart);
