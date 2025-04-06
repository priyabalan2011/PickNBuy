import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'

function Header() {
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
      <Link to='/login' className="btn" id="login_btn">Login</Link>

      <span id="cart" className="ml-3">Cart</span>
      <span className="ml-1" id="cart_count">2</span>
    </div>
  </nav></div>
  )
}

export default Header
