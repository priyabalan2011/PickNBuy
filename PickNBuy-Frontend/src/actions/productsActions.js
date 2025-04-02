import axios from "axios";
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlices";

export const getProducts = (currentPage, size, keyword ,  minPrice, maxPrice,category ) => async (dispatch) =>{
    try {
         dispatch(productsRequest());

         let link = `http://localhost:8080/products?page=${currentPage}`;
         if(keyword) {
            link += `&keyword=${keyword}`
        }
        if(minPrice) {
            link += `&price[gte]=${minPrice}&price[lte]=${maxPrice}`
        }
        if(category) {
            link += `&category=${category}`
        }
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