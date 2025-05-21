import { loginRequest, loginSuccess, loginFail, clearError, registerRequest, registerSuccess, registerFail, loadUserRequest, loadUserFail, loadUserSuccess, logoutSuccess, logoutFail, updateProfileRequest, updateProfileFail, updateProfileSuccess, updatePasswordRequest, updatePasswordFail, updatePasswordSuccess, forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail, resetPasswordRequest, resetPasswordSuccess, resetPasswordFail } from "../slices/authSlice"
import axios from "axios";
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, userSuccess, usersFail, usersRequest, usersSuccess } from "../slices/usersSlice";

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

    const email = window.sessionStorage.getItem("userEmail");

    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get(`http://localhost:8080/user/myprofile?email=${email}`);

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


export const updatepassword = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest());
    
        const { data } = await axios.put(
          'http://localhost:8080/user/change-password',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
    
        dispatch(updatePasswordSuccess(data));
      } catch (error) {
        dispatch(updatePasswordFail(error.response?.data || 'Something went wrong'));
      }
}

export const forgotpassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest());
    
        const { data } = await axios.post(
          'http://localhost:8080/auth/forgot-password',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
    
        dispatch(forgotPasswordSuccess(data));
      } catch (error) {
        dispatch(forgotPasswordFail(error.response?.data || 'Something went wrong'));
      }
}

export const resetpassword = (newPassword,token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest());
    
        const { data } = await axios.post(`http://localhost:8080/auth/reset-password?token=${token}&newPassword=${newPassword}`);
    
        dispatch(resetPasswordSuccess(data));
      } catch (error) {
        dispatch(resetPasswordFail(error.response?.data || 'Something went wrong'));
      }
}


export const getUsers = () => async (dispatch) => {

   

    try {
        dispatch(usersRequest());
        const response  = await axios.get(`http://localhost:8080/user/Allusers`);

        if (response.data != null) {
            dispatch(usersSuccess(response.data));
        }
        else {
            dispatch(usersFail(response.data));
        }

    } catch (error) {
        dispatch(usersFail(error.response.data.message));
    }
}

export const getUser = ( id ) => async (dispatch) => {

    try {
        dispatch(userRequest());
        const response = await axios.get(`http://localhost:8080/user/${id}`);

        console.log(response.data)

        if (response.data != null) {
            dispatch(userSuccess(response.data));
        }
       

    } catch (error) {
        dispatch(userFail(error.response.data.message));
    }
}

export const deleteUser = ( id ) => async (dispatch) => {

    try {
        dispatch(deleteUserRequest());
        await axios.delete(`http://localhost:8080/user/${id}`);
        dispatch(deleteUserSuccess());

    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message));
    }
}

export const updateUser = (id, formData) => async (dispatch) => {

    try {
        dispatch(updateUserRequest());
    
        const response = await axios.put(
          `http://localhost:8080/user/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        dispatch(updateUserSuccess(response.data));
      } catch (error) {
        dispatch(updateUserFail(error.response?.data || 'Something went wrong'));
      }
}
