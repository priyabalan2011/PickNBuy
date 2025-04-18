import React from 'react'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, DropdownButton, Image } from 'react-bootstrap'
import { logout } from '../../actions/userActions'

//import DropdownItem from 'react-bootstrap/esm/DropdownItem'

function Header() {

  const {user, error,isAuthenticated} = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);

  }

  return (
    <div> <nav className="navbar row">
    <div className="col-12 col-md-3">
      <div className="navbar-brand">
        <Link to="/">
          <img width="150px" alt="PickNBuy Logo" src="/images/logo.png" />
        </Link>
      </div>
    </div>

    <div className="col-12 col-md-6 mt-2 mt-md-0">
     <Search/>
    </div>

    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      { isAuthenticated ? 
      (
          
        <div className="d-inline">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
         <figure className='avatar avatar-nav'>
               <Image width="50px" className="rounded-circle" src={user.avator ? (`http://localhost:8080${user.avator}`) : './images/default_avatar.png'}/>
              </figure>
              <span>{user.name}</span>
        </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                 <li><a className="dropdown-item text-dark" onClick={()=>{navigate('/myprofile')}}>Profile</a></li>
                 <li><a className="dropdown-item text-danger" href="#" onClick={logoutHandler}>Logout</a></li>
                
           </ul></div>
         

      )
      
      :
         <Link to="/login" className="btn" id="login_btn">Login</Link>
      }

      <span id="cart" className="ml-3">Cart</span>
      <span className="ml-1" id="cart_count">2</span>
    </div>
  </nav></div>
  )
}

export default Header
