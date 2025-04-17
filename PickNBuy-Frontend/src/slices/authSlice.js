import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name : 'auth',
    initialState : {
        loading : false,
        isAuthenticated: false,
        error: null
    
    },
    reducers :{
        loginRequest(state,action){
            return {
                ...state,
                loading: true    
            }

        },
        loginSuccess(state,action){
            return {
                loading: false,
                isAuthenticated: true,
                user : action.payload.user,
                error : null
            }
        },
        loginFail(state,action){
            return{
                ...state,//it will maintain the previous state value.
                loading: false,
                error: action.payload.error
              // error: "Error"
            }
        },
        clearError(state,action){
            return{
                ...state,//it will maintain the previous state value.
                error: null
            }
        },
        registerRequest(state,action){
            return {
                ...state,
                loading: true    
            }

        },
        registerSuccess(state,action){
            return {
                loading: false,
                isAuthenticated: true,
                user : action.payload.user,
                error : null
            }
        },
        registerFail(state,action){
            return{
                ...state,//it will maintain the previous state value.
                loading: false,
                error: action.payload.error
              // error: "Error"
            }
        },
        loadUserRequest(state,action){
            return {
                ...state,
                isAuthenticated:false,
                loading: true    
            }

        },
        loadUserSuccess(state,action){
            return {
                loading: false,
                isAuthenticated: true,
                user : action.payload.user,
                error : null
            }
        },
        loadUserFail(state,action){
            return{
                ...state,//it will maintain the previous state value.
                loading: false,
                error: action.payload.error
              // error: "Error"
            }
        }
    }

});

const {actions,reducer} =  authSlice; 

export const { 
    loginRequest,
    loginSuccess,
    loginFail , 
    clearError,
    registerRequest,
    registerSuccess,
    registerFail, 
    loadUserRequest,
    loadUserSuccess,
    loadUserFail
} = actions;

export default reducer;