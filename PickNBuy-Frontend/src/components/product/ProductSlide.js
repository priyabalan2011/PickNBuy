import React from 'react';
import  { useEffect, useState } from "react";
//import { Carousel } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";




function ProductSlide() {
    const [product, setProduct] = useState(null);

    useEffect(() => {
      // Simulating fetching data only once.
      const fetchProductData = () => {
        const products = [
          {
            id: 1,
            productname: "Test Product",
            productImages: [
              { id: 1, images: "/images/products/2.jpg" },
              { id: 2, images: "/images/products/3.jpg" }
            ]
          }
        ];
  
        // Only set product once to avoid re-renders
        setProduct(products[0]);
      };
  
      // Fetch product data only on mount
      fetchProductData();
    }, []); 
    // Debugging
  console.log("Product State:", product);

  if (!product) {
    return <p>Loading...</p>; // Show loading message until product is set
  }
      return (
        <div className="container mt-4">
<p>carousel</p>
{product.productImages && product.productImages.length > 0 ? (
<Swiper navigation modules={[Navigation]} className="mySwiper">
            {product.productImages.map((productImage) => (
                    <SwiperSlide key={productImage.id}>
                    <img src={productImage.images} alt="Product" width="500" height="500" />
                    </SwiperSlide>
       
         ))}
    </Swiper>
           ): (
            <p>No images available.</p>
          )}
           
         
        </div>
      );
    }
  


export default ProductSlide;