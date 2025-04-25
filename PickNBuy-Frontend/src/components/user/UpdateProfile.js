import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from "sweetalert2";
import {register,clearAuthError, updateprofile} from '../../actions/userActions';
import { clearUpdateProfile } from '../../slices/authSlice';

function UpdateProfile() {
const { loading , user , error , isUpdated } = useSelector(state => state.authState);
const [ name, setName] = useState("");
const [ email, setEmail] = useState("");
const [ avator, setAvator] = useState("");
const [ avatorpreview, setAvatorPreview] = useState("/images/default_avatar.png");
const dispatch = useDispatch();

const onChangeAvator = (e) => {
    const reader = new FileReader();
            reader.onload =()=>{
                if(reader.readyState===2)
                {
                    setAvatorPreview(reader.result);
                    setAvator(e.target.files[0]);
                }
            }

            reader.readAsDataURL(e.target.files[0]);

}

const submitHandler = (e) => {
        e.preventDefault();
        if(name === "")
        {
            //alert("please Enter Name");
            Swal.fire({
                icon: "info",
               // title:"Oops...",
                text: "Please Enter Name"
            });
            return;
        }
        if(email === "")
        {
           // alert("please Enter Email");
            Swal.fire({
                icon: "info",
               // title:"Oops...",
                text: "Please Enter Email"
            });
            return;
        }

        const formData = new FormData();
        formData.append('id',user.id);
        formData.append('name',name);
        formData.append('email',email);
        formData.append('avatar',avator);
        dispatch(updateprofile(formData));
}
useEffect (() => {
    if(user)
    {
        setName(user.name);
        setEmail(user.email);
        if(user.avator)
        {
            
            setAvatorPreview(`http://localhost:8080${user.avator}`);
        }
    }
    if(isUpdated){
        Swal.fire({
            icon: "success",
            text: "Updated Successfully"
        });
        dispatch(clearUpdateProfile());
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
},[user, dispatch,error,isUpdated])

  return (
    <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form  onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatorpreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onChangeAvator}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
            </div>
  )
}

export default UpdateProfile