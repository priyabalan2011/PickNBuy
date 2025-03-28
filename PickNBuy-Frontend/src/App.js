
import './App.css';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import ProductDetail from './components/product/ProductDetail';

function App() {
  return (
    <Router>
      <div className="App">

        <Header />
        <div className='container container-fluid'>
          <ToastContainer theme='dark' />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/product/:id' element={<ProductDetail />}></Route>
          </Routes>
        </div>
        <Footer />

      </div></Router>
  );
}

export default App;
