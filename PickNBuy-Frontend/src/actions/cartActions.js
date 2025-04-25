import {addCartItemRequest, addCartItemSuccess} from '../slices/cartSlice';
import axios from 'axios';

export const addCartItem = (id,quantity) => async(dispatch) => {
    try{
            dispatch(addCartItemRequest());
            const response = await axios.get(`http://localhost:8080/products/${id}`);
           // alert(response.data.name);
            dispatch(addCartItemSuccess({
                    product : response.data.id,
                    name: response.data.productname,
                    price: response.data.price,
                    image: response.data.productImages[0].images,
                    stock: response.data.stock,
                    quantity
            }));


    }
    catch(error){

    }
}