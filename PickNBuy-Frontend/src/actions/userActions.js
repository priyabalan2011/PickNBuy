import { loginRequest,loginSuccess,loginFail, clearError } from "../slices/authSlice"
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