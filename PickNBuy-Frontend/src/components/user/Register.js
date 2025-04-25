import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {register,clearAuthError} from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function Register() {

    const [userData,setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const[avatar,setAvatar]= useState("");
    const[avatarPreview,setAvatarPreview]= useState("/images/default_avatar.png")
    const dispatch = useDispatch();
    const {loading, error,isAuthenticated} = useSelector(state => state.authState);
    const navigate = useNavigate();

    const onChange = (e) => {
       if( e.target.name === 'avatar' ){
            const reader = new FileReader();
            reader.onload =()=>{
                if(reader.readyState===2)
                {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
       }else{
        setUserData({...userData, [e.target.name] : e.target.value })
       }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if(userData.name === "")
        {
            //alert("please Enter Name");
            Swal.fire({
                icon: "info",
               // title:"Oops...",
                text: "Please Enter Name"
            });
            return;
        }
        if(userData.email === "")
        {
           // alert("please Enter Email");
            Swal.fire({
                icon: "info",
               // title:"Oops...",
                text: "Please Enter Email"
            });
            return;
        }
        if(userData.password === "")
        {
           // alert("please Enter Password");
           Swal.fire({
            icon: "info",
           // title:"Oops...",
            text: "Please Enter password"
        });
            return;
        }

        const formData = new FormData();
        formData.append('name',userData.name);
        formData.append('email',userData.email);
        formData.append('password',userData.password);
        formData.append('avatar',avatar);
       // alert(avatar);
        //dispatch(register(userData.name,userData.email,userData.password,avatar));
        dispatch(register(formData));
    }

     useEffect(()=>{
        //alert(loading);
        if(isAuthenticated){
            Swal.fire({
                icon: "success",
               // title:"Oops...",
                text: "Registered Successfully"
            });
                navigate('/');
                return;
        }
        if(error)
        {
            //alert(error);
            Swal.fire({
                icon: "error",
               // title:"Oops...",
                text: error
            });
            dispatch(clearAuthError);
            return;
        }

    },[error,loading,dispatch,isAuthenticated,navigate])

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                    <h1 className="mb-3">Register</h1>

                    <div className="form-group">
                        <label htmlFor="email_field">Name</label>
                        <input name='name' onChange={onChange} type="name" id="name_field" className="form-control" value={userData.name} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                        name='email' onChange={onChange}
                            type="email"
                            id="email_field"
                            className="form-control"
                           value={userData.email}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                        name='password' onChange={onChange}
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={userData.password}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rtl'>
                                    <img
                                        src={avatarPreview}
                                        className='rounded-circle'
                                        alt='Avatar'
                                    />
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='avatar'
                                    onChange={onChange}
                                    className='custom-file-input'
                                    id='customFile'
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled = {loading}
                    >
                        REGISTER
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register