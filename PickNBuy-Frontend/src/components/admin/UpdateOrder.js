import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { orderDetail as orderDetailAction , updateOrder } from '../../actions/orderActions';
import Swal from "sweetalert2";
import { clearOrderUpdated,clearError } from '../../slices/orderSlice';
import { Link } from 'react-router-dom';
import { getProduct } from '../../actions/productAction';
import { useRef } from 'react';


const UpdateOrder = () => {
   

    const {loading, error, orderDetail, isOrderUpdated} = useSelector(state=>state.orderState);
    const {user={}, orderitems=[], totalPrice=0, paymentInfo={}, shippinginfo={}} = orderDetail;
    const isPaid = paymentInfo.status == "succeeded" ? true : false;
    const [ orderStatus, setOrderStatus] = useState('Processing');
    const {id: orderId} = useParams();
    const isInitialLoad = useRef(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
   
    const submitHandler = (e) => {
            e.preventDefault();
            const orderData ={};
            orderData.orderStatus=orderStatus;

            dispatch(updateOrder(orderId,orderData));
    }

   

    useEffect (()=>{
        if (isOrderUpdated){
            Swal.fire({
                icon: "success",
                text: "Order Updated Successfully"
            });
            dispatch(clearOrderUpdated());
            return;
        }
        if(error)
        {
            Swal.fire({
                icon: "error",
                text: error
            });
            dispatch(clearError());
                return;
        }
        if(isInitialLoad.current){
            dispatch(orderDetailAction(orderId));
        
        }  
        

    },[dispatch,loading,error, isOrderUpdated])

    useEffect (() =>{
        if(orderDetail.id ){
            
            setOrderStatus(orderDetail.orderStatus);
            isInitialLoad.current = false;
        }

    },[orderDetail])

    return (

        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />
            </div>
            <div className='col-12 col-md-10'>
               
                <Fragment>

                <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-8 mt-5 order-details">

                <h1 className="my-5">Order # {orderDetail.id}</h1>
               

                <h4 className="mb-4">Shipping Info</h4>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Phone:</b> {shippinginfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b>{shippinginfo.address}, {shippinginfo.city},  {shippinginfo.state} - {shippinginfo.postalCode},{shippinginfo.country}</p>
                <p><b>Amount:</b> ${totalPrice}</p>

                <hr />
               {/* <h4 className="my-4">Order Date : </h4> {orderDetail.createdAt.split("T")[0]} */}
                <h4 className="my-4">Payment</h4>
                <p className={isPaid ? 'greenColor' : 'redColor'} ><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>


                <h4 className="my-4">Order Status:</h4>
                <p className={orderStatus && orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'} ><b>{orderStatus}</b></p>


                <h4 className="my-4">Order Items:</h4>

                <hr />
                <div className="cart-item my-1">
                    {orderitems && orderitems.map(item =>(

                   
                    <div className="row my-5">
                        <div className="col-4 col-lg-2">
                            <img src={item.image} alt={item.name} height="45" width="65" />
                        </div>

                        <div className="col-5 col-lg-5">
                            <Link to={`/product/${item.product.id}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Piece(s)</p>
                        </div>
                    </div>
 )) }
                </div>
                <hr />
            </div>
            <div  className="col-12 col-lg-3 mt-5 ">
                    <h4 className='my-4'>Order Status</h4>
                    <div className="form-group">
                                <select 
                                className="form-control"
                                onChange={e => setOrderStatus(e.target.value)}
                                value={orderStatus}
                                name="status"
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                              
                            </div>
                            <button
                                disabled={loading}
                                onClick={submitHandler}
                                className="btn btn-primary btn-block"
                                >
                                    Update Status
                            </button>
            </div>
        </div>
                </Fragment></div>
        </div>
    )
}

export default UpdateOrder