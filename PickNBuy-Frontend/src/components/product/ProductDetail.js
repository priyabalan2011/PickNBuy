import React, { Fragment, useEffect, useState } from 'react'
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
import { addCartItem } from '../../actions/cartActions';
//import { Modal, Button } from 'react-bootstrap';
import Modal from 'react-modal';
import {createReview} from '../../actions/productsActions';
import {clearReviewSubmitted,clearError, clearPrduct} from '../../slices/productSlice';
import Swal from "sweetalert2";
import ProductReview from './ProductReview';


function ProductDetail() {
    console.log('Modal:', Modal);
    const { product={}, loading, error , isReviewSubmitted } = useSelector((state) => state.productState)
    const {user} = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [rating,setRating] = useState(1);
    const [comment,setComment] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const increaseQty = () => {
        const count = document.querySelector('.count');

        if (product.stock == 0 || count.valueAsNumber >= product.stock) {
            return;
        }
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count');

        if (count.valueAsNumber == 1) {
            return;
        }
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const reviewHandler=() =>{
       const formData = new FormData();
       formData.append("rating", rating);
       formData.append("comment",comment);
       formData.append("productId",id);
       formData.append("userId",user.id);
       dispatch(createReview(formData));

    }

    //alert(id)
    useEffect(() => {

        if(isReviewSubmitted){
            handleClose();
            Swal.fire({
                icon: "info",
                text: "Review Submitted Successfully"
            });
            dispatch(clearReviewSubmitted());
           
        }
        if(error)
        {
            Swal.fire({
                icon: "error",
                text: error
            });
            dispatch(clearError());
                return;
        }
        if(!product.id || isReviewSubmitted ){
            dispatch(getProduct(id));
        }
        return () =>{
            dispatch (clearPrduct());
        }

    }, [dispatch, id,isReviewSubmitted,error]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.productname} />
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
                                <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button"
                                id="cart_btn"
                                disabled={(product.stock == 0) ? true : false}
                                onClick={() => dispatch(addCartItem(product.id, quantity))}
                                className="btn btn-primary d-inline ml-4">Add to Cart</button>

                            <hr />

                            <p>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                            {user ?
                            <button onClick={() => setShow(true)} id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Submit Your Review
                            </button> :
                            <div className='alert alert-danger mt-5'> Login to Post Review </div>
                            }

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
                                                        {
                                                            [1,2,3,4,5].map(star => (
                                                                <li 
                                                                value= {star}
                                                                onClick={()=> setRating(star)}
                                                                className={`star ${star <= rating ? 'orange': ''}`}
                                                                onMouseOver={(e) => e.target.classList.add('yellow')}
                                                                onMouseOut={(e) => e.target.classList.remove('yellow')}
                                                                ><i className="fa fa-star"></i></li>
                                                            ))
                                                        }
                                                        
                                                    </ul>

                                                    <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                                    </textarea>

                                                    <button  disabled={loading} onClick={reviewHandler}   className="btn my-3 float-right review-btn px-4 text-black" data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div>
                                       
                                        <Modal isOpen={show} onRequestClose={() => setShow(false)}>
                                            <h2>Hello</h2>
                                            <p>This is a modal.</p>
                                            <button onClick={() => setShow(false)}>Close</button>
                                        </Modal>
                                    </div> */}

                                </div>

                            </div>

                        </div>

                    </div>
                   
                    {(product.reviews && product.reviews.length > 0) ?
                    <ProductReview reviews={product.reviews}/> : null
                    }
                    </Fragment>}

        </Fragment>
    )
}

export default ProductDetail