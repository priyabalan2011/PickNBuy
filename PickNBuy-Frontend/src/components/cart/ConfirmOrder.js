import React, { Fragment } from 'react'
import Metadata from '../layouts/MetaData'

function ConfirmOrder() {
  return (
    <Fragment>
        <Metadata title={'Confirm Order'}/>
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> JV Logesh</p>
                <p><b>Phone:</b> 9999 9999 99</p>
                <p className="mb-4"><b>Address:</b> 1234, Mount road, Chennai 600068, Tamilnadu, India </p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>

                <hr />
                <div className="cart-item my-1">
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src="./images/products/1.jpg" alt="Laptop" height="45" width="65"/>
                        </div>

                        <div className="col-5 col-lg-6">
                            <a href="#">OPPO F21s Pro 5G (Dawnlight Gold, 8GB RAM, 128 Storage) with No Cost EMI/Additional Exchange Offers</a>
                        </div>


                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                            <p>1 x $245.67 = <b>$245.67</b></p>
                        </div>

                    </div>
                </div>
                <hr />

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">$245.67</span></p>
                        <p>Shipping: <span className="order-summary-values">$10</span></p>
                        <p>Tax:  <span className="order-summary-values">$0</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">$255.67</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
                </div>
			
			
        </div>
        </Fragment>
  )
}

export default ConfirmOrder