import axios from "axios";
import { productFail, productRequest, productSuccess } from "../slices/productSlice";

export const getProduct = id => async (dispatch) =>{
    try {
         dispatch(productRequest());
        
         // Ensure we properly await the axios request
         const response = await axios.get(`http://localhost:8080/products/${id}`);

         // Ensure response.data is not undefined
         if (!response || !response.data) {
             throw new Error("No data received from server");
         }
 
         console.log(response.data);
 
         dispatch(productSuccess(response.data));

        
    } catch (error) {
        //handle error.
        dispatch(productFail(error.response.data.message));
    }
}