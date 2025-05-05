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
       
       }
        
    }

});

const {actions,reducer} =  orderSlice; 

export const { 
    createOrderRequest,
    createOrderFail,
    createOrderSuccess,
    clearOrderError
} = actions;

export default reducer;