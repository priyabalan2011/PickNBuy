import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import Loader from '../layouts/Loader';
//import { Carousel } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import MetaData from '../layouts/MetaData';


function ProductDetail() {

    const { product, loading, error } = useSelector((state) => state.productState)
    const dispatch = useDispatch();
    const { id } = useParams()
    //alert(id)
    useEffect(() => {

        dispatch(getProduct(id));

    }, [dispatch,id]);
    if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

    return (
        <Fragment>
            {loading?<Loader/>: 
            <Fragment>
                <MetaData title={product.productname}/>
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                 
                        <Swiper loop={true} navigation modules={[Navigation]} className="mySwiper">
                        {product.productImages && product.productImages.map(productImage => 
                                <SwiperSlide key={productImage.id}>
                                <img src={productImage.images} alt={product.productname} width="500" height="500" />
                                </SwiperSlide>
                        )}
                        </Swiper>
                      
                        
                    </div>

                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product.productname}</h3>
                        <p id="product_id">Product # {product.id}</p>

                        <hr />

                        <div className="rating-outer">
                            <div className="rating-inner" style={{width: `${product.ratings/5*100}%`}}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                        <hr />

                        <p id="product_price">${product.price   }</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus">-</span>

                            <input type="number" className="form-control count d-inline" value="1" readOnly />

                            <span className="btn btn-primary plus">+</span>
                        </div>
                        <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                        <hr />

                        <p>Status: <span className={product.stock>0 ? 'greenColor':'redColor'} id="stock_status">{product.stock>0 ? 'In Stock':'Out of Stock'}</span></p>

                        <hr />

                        <h4 className="mt-2">Description:</h4>
                        <p>{product.description}</p>
                        <hr />
                        <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                        <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                        </button>

                        <div className="row mt-2 mb-5">
                            <div className="rating w-50">

                                <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">

                                                <ul className="stars" >
                                                    <li className="star"><i className="fa fa-star"></i></li>
                                                    <li className="star"><i className="fa fa-star"></i></li>
                                                    <li className="star"><i className="fa fa-star"></i></li>
                                                    <li className="star"><i className="fa fa-star"></i></li>
                                                    <li className="star"><i className="fa fa-star"></i></li>
                                                </ul>

                                                <textarea name="review" id="review" className="form-control mt-3">

                                                </textarea>

                                                <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div></Fragment>}
        </Fragment>
    )
}

export default ProductDetail