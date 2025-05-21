import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name : 'order',
    initialState : {
       orderDetail : {},
       userOrders :[],
       loading : false,
       error: null,
       adminOrders : [],
       isOrderDeleted: false,
       isOrderUpdated : false
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
       adminOrdersRequest(state, action){
        return{
            ...state,
            loading : true
        }

       },

       adminOrdersSuccess(state, action){
        return{
            ...state,
            loading : false,
            adminOrders : action.payload.orders
        }

       },
       adminOrdersFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload.error
        }
 
       },
       deleteOrderRequest(state, action){
        return{
            ...state,
            loading : true
        }

       },

       deleteOrderSuccess(state, action){
        return{
            ...state,
            loading : false,
            isOrderDeleted : true
        }

       },
       deleteOrderFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload.error
        }

        
       },
       updateOrderRequest(state, action){
        return{
            ...state,
            loading : true
        }

       },

       updateOrderSuccess(state, action){
        return{
            ...state,
            loading : false,
            isOrderUpdated : true
        }

       },
       updateOrderFail(state, action){
        return{
            ...state,
            loading : false,
            error : action.payload.error
        }

        
       },
       clearOrderDeleted(state,action){
        return{
            ...state,
            isOrderDeleted: false
        }
       },
       clearOrderUpdated(state,action){
        return{
            ...state,
            isOrderUpdated: false
        }
       },
       clearError(state, action) {
        return {
            ...state,
            error: null
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
    orderDetailSuccess,
    adminOrdersFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    deleteOrderFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    clearOrderDeleted,
    clearOrderUpdated,
    updateOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    clearError
} = actions;

export default reducer;