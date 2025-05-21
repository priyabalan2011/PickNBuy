import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../../actions/productsActions';
import Swal from "sweetalert2";
import { clearProductUpdated, productRequest } from '../../slices/productSlice';
import { clearError } from '../../slices/productsSlices';
import { getProduct } from '../../actions/productAction';
import { useRef } from 'react';
import { getUser, updateUser } from '../../actions/userActions';
import { clearUserUpdated } from '../../slices/usersSlice';


const UpdateUser = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState(0);
    const [ role, setRole ] = useState("");
   
    const {id : userId }= useParams();
   // alert(userId)
    const isInitialLoad = useRef(true);

    const {loading, error, user, isUserUpdated} = useSelector(state=>state.userState);
    
    const {user : authUser} = useSelector(state=>state.authState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    
    const submitHandler = (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('name' , name);
            formData.append('email' , email);
            formData.append('role' , role);
            
            dispatch(updateUser(userId,formData));
    }

   

    useEffect (()=>{
        if (isUserUpdated){
            Swal.fire({
                icon: "success",
                text: "User Updated Successfully"
            });
            dispatch(clearUserUpdated());
           
            return;
        }
        if(error)
        {
            Swal.fire({
                icon: "error",
                text: error
            });
            dispatch(clearError());
                return;
        }
        if(isInitialLoad.current){
            dispatch(getUser(userId));
            isInitialLoad.current = false;
        
        }  
        

    },[dispatch,loading,error, isUserUpdated, userId])

    useEffect (() =>{
       
        if(user){
           // alert(user.user.name)
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            
        }

    },[user])

    return (

        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />
            </div>
            <div className='col-12 col-md-10'>
                {/* <h1 className="my-4">Product List</h1> */}
                <Fragment>

                    <div className="wrapper my-5">
                        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                            <h1 className="mb-4">Update User</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Email</label>
                                <input
                                    type="double"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            
                            <div className="form-group">
                                <label htmlFor="category_field">Role</label>
                                <select disabled={user.id === authUser.id} value={role} className="form-control" id="category_field" onChange={e => setRole(e.target.value)}>
                                  
                                   <option value="admin">Admin</option>
                                   <option value="user">User</option>
                                </select>
                            </div>
                            

                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled = {isInitialLoad.current}
                            >
                                UPDATE
                            </button>

                        </form>
                    </div>
                </Fragment></div>
        </div>
    )
}

export default UpdateUser