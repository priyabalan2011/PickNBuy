import React from 'react'
import { createOrderFail, createOrderRequest, createOrderSuccess, userOrdersSuccess, userOrdersRequest, userOrdersFail, orderDetailRequest, orderDetailSuccess, orderDetailFail } from '../slices/orderSlice'
import axios from 'axios';

export const createOrder = (order) => async(dispatch) => {

    try {
        
        dispatch(createOrderRequest());
        console.log("neworder" + order);
        const config = {
            headers:
            {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post(`http://localhost:8080/order/new`,order,config);
        console.log("createorder" + data);
        dispatch(createOrderSuccess(data));


    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }

 
}

export const userOrders = id => async(dispatch) => {

    try {
        

        dispatch(userOrdersRequest()); 
        const response = await axios.get(`http://localhost:8080/order/myorders/${id}`);
        dispatch(userOrdersSuccess(response.data));


    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message));
    }

 
}

export const orderDetail = id => async(dispatch) => {

    try {
        

        dispatch(orderDetailRequest()); 
        const response = await axios.get(`http://localhost:8080/order/${id}`);
        dispatch(orderDetailSuccess(response.data));


    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message));
    }

 
}
