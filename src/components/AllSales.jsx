import React, { Component } from 'react';
import {connect} from "react-redux";
import { getAllSales} from "../actions/salesActions";
import {Link} from "react-router-dom";

export class AllSales extends Component {
  componentDidMount() {
    this.props.getAllSales();
  }

  render() {
    const {sales} = this.props.sales;
    const {role} = this.props.profile;

    let iteration = 0, grandTotalItems = 0, grandTotalAmount = 0;

    return (
      <div>
        <h1>My Sales</h1>

        <div className="row clearfix">
          <div className="col-10 m-0-auto m-t-5">

            <table className="dataTable table-striped" border="1" cellPadding="5">
              <thead>
              <tr>
                <td>S/N</td>
                <td>Transaction ID</td>
                <td>Item Name</td>
                <td>Item Price</td>
                <td>Item Quantity</td>
                <td>Amount</td>
                <td>Item Page</td>
                {role === 'admin'?<td> Attendant Profile </td>:null}
              </tr>
              </thead>

              <tbody>
              {sales.length > 0 ?
                sales.map(singleSale =>{
                  iteration++;

                  const thisAmountTotal = parseFloat((singleSale.price * singleSale.quantity).toFixed(2));
                  grandTotalItems += parseInt(singleSale.quantity);
                  grandTotalAmount += thisAmountTotal;

                  return(
                    <tr key={singleSale.id}>
                      <td>{iteration}</td>
                      <td><code>{Math.random().toString(36).substring(7).toUpperCase()}</code></td>
                      <td>{singleSale.title}</td>
                      <td>$ {singleSale.price}</td>
                      <td>{singleSale.quantity}</td>
                      <td>$ {thisAmountTotal}</td>
                      <td><Link to={`edit-product/${singleSale.product_id}`} className='btn btn-primary'>View</Link></td>

                      {role === 'admin'?
                        <td><Link to={`profile/${singleSale.profile_id}`} className='btn btn-dark'>View</Link></td>
                        : null
                      }

                    </tr>
                  )
                }) : <tr><td colSpan="7" className='center'>No Sales</td></tr>}
              </tbody>

              <tfoot>
              <tr>
                <td colSpan="4">Grand Total</td>
                <td>{grandTotalItems}</td>
                <td>$ {grandTotalAmount}</td>
                <td> </td>
                {role === 'admin'? <td> </td> : null}
              </tr>

              </tfoot>
            </table>

          </div>
        </div>

      </div>
    )
  }
}


export const mapStateToProps = state => ({
  sales: state.sales,
  profile: state.auth.user.profile
});


export default connect(mapStateToProps, {
  getAllSales
})(AllSales);
