import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '.././layouts/MetaData';
//import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productsActions';
import Loader from '.././layouts/Loader';
import Product from '.././product/Product';
import { toast } from 'react-toastify';
import Pagination from 'react-paginate';
import { useParams } from 'react-router-dom';
//import { current } from '@reduxjs/toolkit';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

function ProductSearch() {
  //console.log("Helmet is rendering!");

  const dispatch = useDispatch();
  const { products, loading, error, resPerPage, productsCount } = useSelector((state) => state.productsState)
  const [currentPage, setCurrentPage] = useState(0);
  const {keyword} = useParams();
  const [price, setPrice] = useState([1,1000]);
  const [priceChanged, setPriceChanged] = useState(price);

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
    dispatch(getProducts(currentPage+1, null, keyword, null, priceChanged, null));
  }, [error, dispatch, currentPage,keyword,priceChanged],price);

  return (

    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title={'Buy Best Products'} />

          <h1 id="products_heading">Search Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className='col-6 col-md-3 mb-5 mt-5'>
                 <div className='px-5' onMouseUp={()=>setPriceChanged(price)}>

                      <Slider
                          range = {true}
                          marks = {
                            {
                              1:"$1",
                              1000:"$1000"
                            }
                          }
                          min = {1}
                          max = {1000}
                          defaultValue={[1,1000]}
                          value={price}
                          onChange={(price)=>{
                            setPrice(price)
                            }}
                          handleRender={
                            renderProps => {
                                return (
                                    <Tooltip  overlay={`$${renderProps.props['aria-valuenow']}`}  >
                                         <div {...renderProps.props}>  </div>
                                    </Tooltip>
                                )
                            }
                        }

                      />
                  </div>
              </div>
              <div className='col-6 col-md-9 '>
                <div className='row'>
                    {Array.isArray(products) && products.map((product) => (

                     <Product col={4} key={product.id} product={product} />

                     ))}
                </div>

              </div>
             

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

export default ProductSearch;