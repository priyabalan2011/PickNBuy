import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './layouts/MetaData';
//import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productsActions';
import Loader from './layouts/Loader';
import Product from './product/Product';
import { toast } from 'react-toastify';
import Pagination from 'react-paginate';
//import { current } from '@reduxjs/toolkit';

function Home() {
  //console.log("Helmet is rendering!");

  const dispatch = useDispatch();
  const { products, loading, error, resPerPage, productsCount } = useSelector((state) => state.productsState)
  const [currentPage, setCurrentPage] = useState(0);

  console.log(currentPage)
  const setCurrentPageNo = ({ selected }) => {
    setCurrentPage(selected)
    // alert(selected)
  }

  useEffect(() => {
    if (error) {
      return toast('Unable to send products!', {
        position: "bottom-center"
      });
    }

    document.title = "Buy Best Products - PickNBuy";
    dispatch(getProducts(currentPage+1, null, null, null, null, null, null));
  }, [error, dispatch, currentPage]);

  return (

    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title={'Buy Best Products'} />

          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {Array.isArray(products) && products.map((product) => (

                <Product col={3} key={product.id} product={product} />

              ))}

            </div>
          </section>
          {/* <h2>Total Products: {products ? productsCount : 0}</h2> */}
          {(products && productsCount > 0 && productsCount > resPerPage) ?
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                previousLabel={" ← Previous"}
                nextLabel={"Next → "}
                // breakLabel={" ... "}
                initialPage={currentPage}
                onPageChange={setCurrentPageNo}
                pageCount={products ? Math.ceil(productsCount / 3) : 0}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName='page-item'
                pageLinkClassName='page-link'

              />

            </div>
            : null}

        </Fragment>
      }
    </Fragment>

  )
}

export default Home