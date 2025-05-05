import React from 'react'
import { createOrderFail, createOrderRequest, createOrderSuccess } from '../slices/orderSlice'
import axios from 'axios';

export const createOrder = order => async(dispatch) => {

    try {
        
        dispatch(createOrderRequest);
        const {data} = await axios.post("http://localhost:8080/order/new",order);
        console.log("createorder" + data);
        dispatch(createOrderSuccess(data));


    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }

 
}
