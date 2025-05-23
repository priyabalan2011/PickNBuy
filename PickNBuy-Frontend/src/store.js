import { combineReducers,configureStore } from "@reduxjs/toolkit";
//import { configure } from "@testing-library/dom";
import { thunk } from "redux-thunk";
import productsReducer from "./slices/productsSlices";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/usersSlice";

const reducer=combineReducers({
    productsState : productsReducer,
    productState : productReducer,
    authState : authReducer,
    cartState : cartReducer,
    orderState : orderReducer,
    userState : userReducer,
})
const store = configureStore({
    reducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;