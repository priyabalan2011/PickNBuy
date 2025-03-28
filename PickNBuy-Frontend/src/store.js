import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { configure } from "@testing-library/dom";
import { thunk } from "redux-thunk";
import productsReducer from "./slices/productsSlices";
import productReducer from "./slices/productSlice";

const reducer=combineReducers({
    productsState : productsReducer,
    productState : productReducer

})
const store = configureStore({
    reducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;