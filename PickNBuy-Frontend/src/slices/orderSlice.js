import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name : 'order',
    initialState : {
       orderDetail : {},
       userOrders :[],
       loading : false,
       error: null
    },
    reducers :{
       createOrderRequest(state, action){
        return{
            ...state,
            loading : true
        }

       },

       createOrderSuccess(state, action){
        return{
            ...state,
            loading : false,
            orderDetail : action.payload
        }

       },
       createOrderFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload.error
        }

       },
       clearOrderError(state,action){
        return{
            ...state,
            error : null
        }
       
       },
       userOrdersRequest(state, action){
        return{
            ...state,
            loading : true
        }

       },

       userOrdersSuccess(state, action){
        return{
            ...state,
            loading : false,
            userOrders : action.payload.orders
        }

       },
       userOrdersFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload.error
        }

        
       },
       orderDetailRequest(state, action){
        return{
            ...state,
            loading : true
        }

       },

       orderDetailSuccess(state, action){
        return{
            ...state,
            loading : false,
            orderDetail : action.payload.order
        }

       },
       orderDetailFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload.error
        }

       },
        
    }

});

const {actions,reducer} =  orderSlice; 

export const { 
    createOrderRequest,
    createOrderFail,
    createOrderSuccess,
    clearOrderError,
    userOrdersFail,
    userOrdersRequest,
    userOrdersSuccess,
    orderDetailFail,
    orderDetailRequest,
    orderDetailSuccess
} = actions;

export default reducer;