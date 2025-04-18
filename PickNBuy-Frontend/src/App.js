
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


function App() {

  useEffect(()=>{

    store.dispatch(loadUser);

  })
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
            {/* <Route path='/ProductSlide' element={<ProductSlide />}></Route> */}
          </Routes>
        </div>
        <Footer />

      </div></Router>
  );
}

export default App;
