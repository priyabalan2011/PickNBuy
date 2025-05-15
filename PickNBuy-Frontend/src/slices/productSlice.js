import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name : 'product',
    initialState : {
        loading : false,
        product:{},
        error: null,
        isReviewSubmitted: false,
        isProductCreated : false
    
    },
    reducers :{
        productRequest(state,action){
            return {
                ...state,
                loading: true
            }

        },
        productSuccess(state,action){
            return {
                ...state,
                loading: false,
                product : action.payload
            }
        },
        productFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        },
       createReviewRequest(state,action){
            return {
                ...state,
                loading: true
            }

        },
        createReviewSuccess(state,action){
            return {
                ...state,
                loading: false,
                isReviewSubmitted : true,
               
            }
        },
        createReviewFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearReviewSubmitted(state,action){
            return{
                ...state,
                isReviewSubmitted: false
            }
        },
        clearError(state,action){
            return{
                ...state,
               error : null
            }
        },
        clearPrduct(state,action){
            return{
                ...state,
               product : {}
            }
        },
        newProductRequest(state,action){
            return {
                ...state,
                loading: true
            }

        },
        newProductSuccess(state,action){
            return {
                ...state,
                loading: false,
                product : action.payload.product,
                isProductCreated : true
            }
        },
        newProductFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload,
                isProductCreated : false
            }
        },
        clearProductCreated(state,acton){
            return{
                ...state,
                isProductCreated : false
            }
        }
    }

});

const {actions,reducer} =  productSlice; 

export const { 
    productRequest,
    productSuccess,
    productFail,
    createReviewFail,
    createReviewRequest,
    createReviewSuccess,
    clearError,
    clearReviewSubmitted, 
    clearPrduct ,
    newProductFail,
    newProductRequest,
    newProductSuccess,
    clearProductCreated
} = actions;

export default reducer;