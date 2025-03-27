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
                  // <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                  //       <div className="card p-3 rounded">
                  //         <img
                  //           className="card-img-top mx-auto"
                  //           src={product.productImages[0].images}
                  //         />
                  //         <div className="card-body d-flex flex-column">
                  //           <h5 className="card-title">
                  //             <a href="">{product.productname}</a>
                  //           </h5>
                  //           <div className="ratings mt-auto">
                  //             <div className="rating-outer">
                  //               <div className="rating-inner" style={{width: `${product.ratings/5*100}%`}}></div>
                  //             </div>
                  //             <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                  //           </div>
                  //           <p className="card-text">${product.price}</p>
                  //           <a href="#" id="view_btn" className="btn btn-block">View Details</a>
                  //         </div>
                  //       </div>
                  // </div>               

            ))}

          </div>
         </section>

        </Fragment>
    }
    </Fragment>
    
  )
}

export default Home