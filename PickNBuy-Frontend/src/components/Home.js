import React, { Fragment, useEffect,useState } from 'react';
import MetaData from './layouts/MetaData';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productsActions';
import Loader from './layouts/Loader';
import Product from './product/Product';
import {toast} from 'react-toastify';
 
function Home() {
  //console.log("Helmet is rendering!");

  const dispatch = useDispatch();
  const {products,loading,error} = useSelector((state) => state.productsState )
 // const [records, setRecords] = useState([]);

  useEffect(() => {
    if(error){
           return toast('Unable to send products!',{
              position: "bottom-center"
            });
    }
    
    document.title = "Buy Best Products - PickNBuy";
   dispatch(getProducts);
  }, [error]);

  return (
   
    <Fragment>
      { loading ? <Loader/> :
      <Fragment>
        <MetaData title={'Buy Best Products'}/>
       
        <h1 id="products_heading">Latest Products</h1>
        <section id="products" className="container mt-5">
          <div className="row">
            { products && products.map((product) => (
              
              <Product product={product}/>     

            ))}

          </div>
         </section>

        </Fragment>
    }
    </Fragment>
    
  )
}

export default Home