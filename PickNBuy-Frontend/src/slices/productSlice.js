import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name : 'product',
    initialState : {
        loading : false,
        product:{},
        error: null,
        isReviewSubmitted: false
    
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
        }
    }

});

const {actions,reducer} =  productSlice; 

export const { productRequest,productSuccess,productFail,createReviewFail,createReviewRequest,createReviewSuccess,clearError,clearReviewSubmitted, clearPrduct } = actions;

export default reducer;