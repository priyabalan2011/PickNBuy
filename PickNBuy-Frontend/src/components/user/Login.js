import { Fragment, useEffect, useState } from "react"
import React from 'react'
import Metadata from '../layouts/MetaData'
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from '../../actions/userActions';
import {toast} from 'react-toastify';
import { Link, useLocation, useNavigate } from "react-router-dom";
const Login = () => {
const [ email, setEmail ] = useState("");
const [password, setPassword] = useState("");

const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();
const {loading , error , isAuthenticated} = useSelector(state => state.authState);
const redirect = location.search?'/'+location.search.split('=')[1]:'/';

const submitHandler =(e) => {
    e.preventDefault();
    dispatch(login(email,password));
}
 

useEffect(() => {
    //alert(window.sessionStorage.getItem("userEmail"));

    if(isAuthenticated){
        sessionStorage.setItem("userEmail",email);
        navigate(redirect);
    }
    if(error){
        alert(error);
        dispatch(clearAuthError());
        // return toast(error, {
        //     position: "bottom-center",
        //     type : 'error'
        //     // onOpen : () => {
        //     //      dispatch(clearAuthError());
        //     // }
        //   });

    }
},[error,isAuthenticated,dispatch,navigate,loading])

  return (
    <Fragment>
        <Metadata title={`Login`}/>
      <div className="row wrapper">
          <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="mb-3">Login</h1>
                  <div className="form-group">
                      <label htmlFor="email_field">Email</label>
                      <input
                          type="email"
                          id="email_field"
                          className="form-control"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                      />
                  </div>

                  <div className="form-group">
                      <label htmlFor="password_field">Password</label>
                      <input
                          type="password"
                          id="password_field"
                          className="form-control"
                          value={password}
                          onChange = { e => setPassword(e.target.value)}
                      />
                  </div>

                  <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                  <button
                      id="login_button"
                      type="submit"
                      className="btn btn-block py-3"
                      disabled={loading}
                  >
                      LOGIN
                  </button>

                  <Link to="/register" className="float-right mt-3">New User?</Link>
              </form>
          </div>
      </div>
    </Fragment>
  )
}

export default Login