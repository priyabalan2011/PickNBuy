import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name : 'products',
    initialState : {
        loading : false
    },
    reducers :{
        productsRequest(state,action){
            return {
                loading: true
            }

        },
        productsSuccess(state,action){
            return {
                loading: false,
                products : action.payload.products,
                resPerPage: action.payload.resPerPage,
                productsCount : action.payload.count
            }
        },
        productsFail(state,action){
            return{
                loading: false,
                error: action.payload
            }
        },
        adminProductsRequest(state,action){
            return {
                loading: true
            }

        },
        adminProductsSuccess(state,action){
            return {
                loading: false,
                products : action.payload,
               
            }
        },
        adminProductsFail(state,action){
            return{
                loading: false,
                error: action.payload
            }
        },
        clearError(state,action){
            return{
                ...state,
                error: null
            }
        }
    }

});

const {actions,reducer} =  productsSlice; 

export const { productsRequest,productsSuccess,productsFail,adminProductsFail, adminProductsRequest, adminProductsSuccess, clearError } = actions;

export default reducer;