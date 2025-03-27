import axios from "axios";
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlices";

export const getProducts = async (dispatch) =>{
    try {
         dispatch(productsRequest());
        
         // Ensure we properly await the axios request
         const response = await axios.get("http://localhost:8080/products/k");

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