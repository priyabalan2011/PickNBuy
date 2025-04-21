import React, { useEffect, useState } from 'react';
import { updatepassword as updatePasswordAction,clearAuthError } from '../../actions/userActions';
import { useDispatch,useSelector } from 'react-redux';
import Swal from "sweetalert2";

function UpdatePassword() {
    const { loading , user , error , isUpdated } = useSelector(state => state.authState);
   const [password,setPassword]= useState("");
   const [oldPassword,setOldPassword]= useState("");
   const dispatch =  useDispatch();

   const submitHandler = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('id',user.id);
    formData.append('oldPassword',oldPassword);
    formData.append('password',password);
    dispatch(updatePasswordAction(formData));

   }

   useEffect(()=>{
    if(isUpdated){
        Swal.fire({
            icon: "success",
            text: "Password Updated Successfully"
        });
        setOldPassword("");
        setPassword("");
        return;
    }
    if(error)
    {
        Swal.fire({
            icon: "error",
            text: error
        });
        dispatch(clearAuthError);
            return;
    }
   },[isUpdated,error,dispatch,user])

  return (
    <div className="row wrapper">
    <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg">
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
                <label htmlFor="old_password_field">Old Password</label>
                <input
                    type="password"
                    id="old_password_field"
                    className="form-control"
                    value={oldPassword}
                    onChange={e=> setOldPassword(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="new_password_field">New Password</label>
                <input
                    type="password"
                    id="new_password_field"
                    className="form-control"
                    value={password}
                    onChange={e=> setPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
        </form>
    </div>
</div>
  )
}

export default UpdatePassword