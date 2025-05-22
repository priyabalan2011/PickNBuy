import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name : 'product',
    initialState : {
        loading : false,
        product:{},
        error: null,
        isReviewSubmitted: false,
        isProductCreated : false,
        isProductDeleted : false,
        isProductUpdated : false,
        isReviewDeleted : false,
        reviews : []
    
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
        },
        deleteProductRequest(state,action){
            return {
                ...state,
                loading: true
            }

        },
        deleteProductSuccess(state,action){
            return {
                ...state,
                loading: false,
                isProductDeleted : true
            }
        },
        deleteProductFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload,
                isProductDeleted : false
            }
        },
        clearProductDeleted(state,acton){
            return{
                ...state,
                isProductDeleted : false
            }
        },
        updateProductRequest(state,action){
            return {
                ...state,
                loading: true
            }

        },
        updateProductSuccess(state,action){
            return {
                ...state,
                loading: false,
                product : action.payload,
                isProductUpdated : true
            }
        },
        updateProductFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload,
                isProductUpdated : false
            }
        },
        clearProductUpdated(state,acton){
            return{
                ...state,
                isProductUpdated : false
            }
        },
         reviewsRequest(state,action){
            return {
                ...state,
                loading: true
            }

        },
        reviewsSuccess(state,action){
            return {
                ...state,
                loading: false,
                reviews : action.payload.reviews
            }
        },
        reviewsFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteReviewRequest(state,action){
            return {
                ...state,
                loading: true
            }

        },
        deleteReviewSuccess(state,action){
            return {
                ...state,
                loading: false,
                isReviewDeleted : true
            }
        },
        deleteReviewFail(state,action){
            return{
                ...state,
                loading: false,
                error: action.payload
                
            }
        },
        clearReviewDeleted(state,acton){
            return{
                ...state,
                isReviewDeleted : false
            }
        },
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
    clearProductCreated,
    deleteProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    clearProductDeleted,
    updateProductFail,
    updateProductRequest,
    updateProductSuccess,
    clearProductUpdated,
    reviewsFail,
    reviewsRequest,
    reviewsSuccess,
    deleteReviewFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    clearReviewDeleted

} = actions;

export default reducer;