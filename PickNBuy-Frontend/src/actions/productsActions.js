import axios from "axios";
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess } from "../slices/productsSlices";
import { createReviewFail, createReviewRequest, createReviewSuccess, deleteProductFail, deleteProductRequest, deleteProductSuccess, newProductFail, newProductRequest, newProductSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from "../slices/productSlice";

export const getProducts = (currentPage, size, keyword ,  minPrice, maxPrice,category ,rating) => async (dispatch) =>{
    try {
         dispatch(productsRequest());

         let link = `http://localhost:8080/products?page=${currentPage}`;
         if(keyword) {
            link += `&keyword=${keyword}`
        }
        if(maxPrice) {
            link += `&minPrice=${maxPrice[0]}&maxPrice=${maxPrice[1]}`
        }
        if(category) {
            link += `&category=${category}`
        }
        if(rating) {
            link += `&ratings=${rating}`
        }
        //alert(link)
       // alert(category);
        // if(rating) {
        //     link += `&ratings=${rating}`
        // }
        
        const response  =  await axios.get(link);
       
        
         // Ensure we properly await the axios request
        // const response = await axios.get("http://localhost:8080/products/");

         // Ensure response.data is not undefined
         if (!response || !response.data) {
             throw new Error("No data received from server");
         }
 
         console.log(response.data);
 
         dispatch(productsSuccess(response.data));

        
    } catch (error) {
        //handle error.
        dispatch(productsFail(error.response.data.message));
    }
}

export const createReview = reviewData => async (dispatch) =>{
    try {
         dispatch(createReviewRequest());
        
         const config = {
            headers: {
                'content' : 'application/json'
            }
         };
         // Ensure we properly await the axios request
         const response = await axios.post(`http://localhost:8080/review/new`,reviewData,config);

         // Ensure response.data is not undefined
         if (!response || !response.data) {
             throw new Error("No data received from server");
         }
 
         console.log(response.data);
 
         dispatch(createReviewSuccess(response.data));

        
    } catch (error) {
        //handle error.
        dispatch(createReviewFail(error.response.data.message));
    }
}

export const getAdminProducts = () => async (dispatch) =>{
    try {
         dispatch(adminProductsRequest());

         let link = `http://localhost:8080/products/all`;
         
         const response  =  await axios.get(link);
         if (!response || !response.data) {
             throw new Error("No data received from server");
         }
 
         console.log(response.data);
 
         dispatch(adminProductsSuccess(response.data));

        
    } catch (error) {
        //handle error.
        dispatch(adminProductsFail(error.response.data.message));
    }
}

export const createNewProducts = productData => async (dispatch) =>{
    try {
         dispatch(newProductRequest());

         let link = `http://localhost:8080/products/new`;
         
         const response  =  await axios.post(link,productData);
         if (!response || !response.data) {
             throw new Error("No data received from server");
         }
 
         console.log(response.data);
 
         dispatch(newProductSuccess(response.data));

        
    } catch (error) {
        //handle error.
        dispatch(newProductFail(error.response.data.message));
    }
}

export const deleteProduct = id => async (dispatch) =>{
    try {
         dispatch(deleteProductRequest());

         let link = `http://localhost:8080/products/${id}`;
         
         const response  =  await axios.delete(link);
         if (!response || !response.data) {
             throw new Error("No data received from server");
         }
 
         console.log(response.data);
 
         dispatch(deleteProductSuccess(response.data));

        
    } catch (error) {
        //handle error.
        dispatch(deleteProductFail(error.response.data.message));
    }
}

export const updateProduct = (id,productData) => async (dispatch) =>{
    try {
         dispatch(updateProductRequest());

         let link = `http://localhost:8080/products/${id}`;
         
         const response  =  await axios.put(link,productData);
         if (!response || !response.data) {
             throw new Error("No data received from server");
         }
 
         console.log(response.data);
 
         dispatch(updateProductSuccess(response.data));

        
    } catch (error) {
        //handle error.
        dispatch(updateProductFail(error.response.data.message));
    }
}
