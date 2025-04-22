import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, forgotpassword } from '../../actions/userActions';
import Swal from "sweetalert2";


function ForgotPassword() {

    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const {loading, error, user, message} = useSelector(state=> state.authState);

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotpassword(formData))
    }

    useEffect (()=>{
        if(message){
            Swal.fire({
                icon: "success",
                text: message
            });
            setEmail("");
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
    },[loading, error, user, message, dispatch])
    return (
    <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
  )
}

export default ForgotPassword