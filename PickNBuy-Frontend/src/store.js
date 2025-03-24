import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { configure } from "@testing-library/dom";
import { thunk } from "redux-thunk";
import productReducer from "./slices/productsSlices";

const reducer=combineReducers({
    productsState : productReducer

})
const store = configureStore({
    reducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;