import React from 'react';
import { Link } from 'react-router-dom';


export default function Product({product,col}) {
  const firstImage = product?.productImages?.[0]?.images || "/default-image.jpg"; 
  return (
          <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
             // src={product.productImages[0].images}
             src={firstImage}
              alt={product.productname}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link to={`/product/${product.id}`}>{product.productname}</Link>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner" style={{width: `${product.ratings/5*100}%`}}></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
              </div>
              <p className="card-text">${product.price}</p>
              <Link to={`/product/${product.id}`} id="view_btn" className="btn btn-block">View Details</Link>
            </div>
          </div>
      </div>        
  )
}


