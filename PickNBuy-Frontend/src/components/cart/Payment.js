import { useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateShipping } from './Shipping';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import Stripe from 'stripe';
import Swal from "sweetalert2";
import { orderCompleted } from '../../slices/cartSlice';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const {user} = useSelector (state => state.authState);
  const {items : cartItems,shippingInfo} = useSelector(state => state.cartState);
  const amount = orderInfo ?  Math.round(orderInfo.totalPrice * 100) : 0;

  const paymentData={
    amount : amount,
    shipping : {
      name: user.name,
      phoneNo : shippingInfo.phoneNo,
      address: {
        line1 : shippingInfo.address,
        city : shippingInfo.city,
        postalCode: shippingInfo.postalCode,
        state: shippingInfo.state,
        country : shippingInfo.country
       
      }
      
    }
  }

  const order = {
    orderItems : cartItems,
    shippingInfo 
  }
  if(orderInfo){
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxprice = orderInfo.taxprice;
    order.totalPrice= orderInfo.totalPrice;

  }

  useEffect(()=>{
    validateShipping(shippingInfo,navigate);
    
  },[])

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true;
    try {
      const {data} = await axios.post("http://localhost:8080/payment/process", paymentData);
      console.log(data);
      const clientSecret = data.client_secret;
      const result = stripe.confirmCardPayment(clientSecret,{
         payment_method : {
            card : elements.getElement(CardNumberElement),
            billing_details : {
               name: user.name,
               email : user.email
          }
        }
      })
      if((await result).error){
        Swal.fire({
          icon: "error",
         // title:"Oops...",
          text: (await result).error.message
      });
      document.querySelector('#pay_btn').disabled = false;
      }else{
        if((await result).paymentIntent.status === 'succeeded'){
          Swal.fire({
            icon: "info",
           // title:"Oops...",
            text: "Payment Success!"
        });
        dispatch(orderCompleted());
        navigate('/order/success');
        }else{
          Swal.fire({
            icon: "error",
           // title:"Oops...",
            text: "Please try again!"
        });
        }

      }

    } catch (error) {
      
    }

  }
  return (
    <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg">
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <CardNumberElement  
                    type="text"
                    id="card_num_field"
                    className="form-control"
                   
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                   
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay {` $${orderInfo && orderInfo.totalPrice}`}
                </button>
    
              </form>
			  </div>
        </div>
  )
}

export default Payment;
