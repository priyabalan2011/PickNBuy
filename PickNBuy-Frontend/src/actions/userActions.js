import { loginRequest, loginSuccess, loginFail, clearError, registerRequest, registerSuccess, registerFail, loadUserRequest, loadUserFail, loadUserSuccess, logoutSuccess, logoutFail, updateProfileRequest, updateProfileFail, updateProfileSuccess } from "../slices/authSlice"
import axios from "axios";

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest());
        const { data } = await axios.post(`http://localhost:8080/user/login`, { email, password });

        if (data.error != null) {
            dispatch(loginFail(data));
        }
        else {
            dispatch(loginSuccess(data));
        }

    } catch (error) {
        dispatch(loginFail(error.data));
    }
}

export const clearAuthError = () => dispatch => {

    dispatch(clearError());

}


export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest());

        const config = {
            headers:
            {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`http://localhost:8080/user/register`, userData, config);

        console.log(data)

        if (data.error != null) {
            dispatch(loginFail(data));
        }
        else {
            dispatch(registerSuccess(data));
        }

    } catch (error) {
        dispatch(registerFail(error.data));
    }
}


export const loadUser = async (dispatch) => {

    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get(`http://localhost:8080/user/register`);

        console.log(data)

        if (data.error != null) {
            dispatch(loadUserFail(data));
        }
        else {
            dispatch(loadUserSuccess(data));
        }

    } catch (error) {
        dispatch(loadUserFail(error));
    }
}

export const logout = async (dispatch) => {

    try {
        
         await axios.get(`http://localhost:8080/user/logout`);
         dispatch(logoutSuccess());
        }

     catch (error) {
        dispatch(logoutFail());
    }
}

export const updateprofile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest());

        const config = {
            headers:
            {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`http://localhost:8080/user/update`, userData, config);

        console.log(data)

        if (data.error != null) {
            dispatch(updateProfileFail(data));
        }
        else {
            dispatch(updateProfileSuccess(data));
        }

    } catch (error) {
        dispatch(updateProfileFail(error.data));
    }
}