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
        }
    }

});

const {actions,reducer} =  authSlice; 

export const { loginRequest,loginSuccess,loginFail , clearError} = actions;

export default reducer;