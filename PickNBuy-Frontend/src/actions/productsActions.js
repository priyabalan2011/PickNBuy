import axios from "axios";
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlices";

export const getProducts = async (dispatch) =>{
    try {
        dispatch(productsRequest());
        const {data} = axios.get('/api/products');
        dispatch(productsSuccess(data));

        
    } catch (error) {
        //handle error.
        dispatch(productsFail(error.response.data.message));
    }
}