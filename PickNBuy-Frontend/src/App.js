
import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

function App() {
  return (
    <Router>
    <div className="App">
      
          <Header/>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
            </Routes>
          <Footer/>
      
    </div></Router>
  );
}

export default App;
