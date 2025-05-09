
import './App.css';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import ProductDetail from './components/product/ProductDetail';
//import ProductSlide from './components/product/ProductSlide';
import "bootstrap/dist/css/bootstrap.min.css";
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import axios from "axios";
import { OrderSuccess } from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';


function App() {
  const [stripeApiKey,setStripeApiKey]=useState("");
  useEffect(()=>{

    store.dispatch(loadUser);
    async function getStripeApiKey(){
      const {data}= await axios.get("http://localhost:8080/payment/stripe-api-key");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();

  },[])
  return (
    <Router>
      <div className="App">

        <Header />
        <div className='container container-fluid'>
          <ToastContainer theme='dark' />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/search/:keyword' element={<ProductSearch />}></Route>
            <Route path='/product/:id' element={<ProductDetail />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
            <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}></Route>
            <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>}></Route>
            <Route path='/password/forgot' element={<ForgotPassword />}></Route>
            <Route path='/password/reset/:token' element={<ResetPassword   />}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>}></Route>
            <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>}></Route>
            { stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></ProtectedRoute>}></Route>
}
           {/* <Route path='/ProductSlide' element={<ProductSlide />}></Route> */}

           <Route path='/order/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>}></Route>
           <Route path='/orders' element={<ProtectedRoute><UserOrders /></ProtectedRoute>}></Route>
           <Route path='/order/:id' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>}></Route>
          </Routes>
        </div>
        <Footer />

      </div></Router>
  );
}

export default App;
