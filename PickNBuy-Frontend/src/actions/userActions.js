import { loginRequest,loginSuccess,loginFail, clearError,registerRequest,registerSuccess,registerFail } from "../slices/authSlice"
import axios from "axios";

export const login = (email,password) => async(dispatch) => {
   
    try {
        dispatch(loginRequest());
        const {data} = await axios.post(`http://localhost:8080/user/login`,{email,password});
        
        if(data.error != null)
        {
            dispatch(loginFail(data));
        }
        else{
        dispatch(loginSuccess(data));
        }

    } catch (error) {
        dispatch(loginFail(error.data));
    }
}

export const clearAuthError = () => dispatch => {

    dispatch(clearError());

}

//export const register = (name,email,password,avatar) => async(dispatch) => {
    export const register = (userData) => async(dispatch) => {
   // console.log(userData)
   
    try {
        dispatch(registerRequest());
        // const response = await fetch('http://localhost:8080/user/register', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, email, password,avatar }),
        //   });
    
        //   const data = await response.json();
        //   console.log('Response Body:', data);
        //         if(data.error != null)
        //             {
        //                 dispatch(loginFail(data));
        //             }
        //             else{
        //             dispatch(registerSuccess(data));
        //             }



        const config={
            headers : 
            {
                'Content-Type' : 'multipart/form-data'
            }
        }
        //alert("data")
        const {data} = await axios.post(`http://localhost:8080/user/register`,userData,config);
        //alert("axios")
       console.log(data)
      //  alert(data.error)
        if(data.error != null)
        {
            dispatch(loginFail(data));
        }
        else{
        dispatch(registerSuccess(data));
        }

    } catch (error) {
        dispatch(registerFail(error.data));
    }
}
