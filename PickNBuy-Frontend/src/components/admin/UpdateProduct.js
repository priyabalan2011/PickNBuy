import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../../actions/productsActions';
import Swal from "sweetalert2";
import { clearProductUpdated, productRequest } from '../../slices/productSlice';
import { clearError } from '../../slices/productsSlices';
import { getProduct } from '../../actions/productAction';
import { useRef } from 'react';


const UpdateProduct = () => {
    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ description, setDescription ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ stock, setStock ] = useState(0);
    const [ seller, setSeller ] = useState("");
    const [ images, setImages ] = useState([]);
    const [ imagesCleared, setImagesCleared ] = useState(false);
    const [ imagesPreview, setImagesPreview ] = useState([]);
    const {id : productId }= useParams();
    const isInitialLoad = useRef(true);

    const {loading, error, product, isProductUpdated} = useSelector(state=>state.productState);
    const categories=[
        'Electronics',
        'MobilePhones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    //alert(productId)
    const onImageChane = (e) =>{
      
        const files = Array.from(e.target.files);
        files.forEach(file =>{
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState == 2 ) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file)
        })

    }

    const submitHandler = (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('productname' , name);
            formData.append('price' , price);
            formData.append('stock' , stock);
            formData.append('description' , description);
            formData.append('seller' , seller);
            formData.append('category' , category.toUpperCase());
            images.forEach (image => {
                formData.append('files', image)
            })
            formData.append('imagesCleared',imagesCleared);
            dispatch(updateProduct(productId,formData));
    }

    const clearImagesHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }

    useEffect (()=>{
        if (isProductUpdated){
            Swal.fire({
                icon: "success",
                text: "Product Updated Successfully"
            });
            dispatch(clearProductUpdated());
            setImages([]);
            return;
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
        if(isInitialLoad.current){
            dispatch(getProduct(productId));
        
        }  
        

    },[dispatch,loading,error, isProductUpdated])

    useEffect (() =>{
        if(product.id && isInitialLoad.current){
            setName(product.productname);
            setPrice(product.price);
            setStock(product.stock);
            setSeller(product.seller);
            setDescription(product.description);
            setCategory(product.category);
            let images=[];
            product.productImages.forEach(image =>{
                images.push(image.images);
            });
            setImagesPreview(images);
            isInitialLoad.current = false;
        }

    },[product])

    return (

        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />
            </div>
            <div className='col-12 col-md-10'>
                {/* <h1 className="my-4">Product List</h1> */}
                <Fragment>

                    <div className="wrapper my-5">
                        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                            <h1 className="mb-4">Update Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="double"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea 
                                className="form-control" 
                                id="description_field" 
                                rows="8"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                 ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select value={category} className="form-control" id="category_field" onChange={e => setCategory(e.target.value)}>
                                    <option>Select</option>
                                   {
                                    categories.map(category =>(
                                        <option value = {category.toUpperCase()} key={category.toUpperCase()}>{category}</option>
                                    ))
                                   }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    onChange={e => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    onChange={e => setSeller(e.target.value)}
                                    value={seller}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        onChange={onImageChane}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                {imagesPreview.length > 0 &&  <span className="mr-2" onClick={clearImagesHandler} style={{cursor: "pointer"}}><i className="fa fa-trash"></i></span>}
                                    
                                {imagesPreview.map(image =>(
                                    <img
                                    className='mt-3 mr-2'
                                    key={image}
                                    src={image}
                                    alt={`Image Preview`}
                                    width = "55"
                                    height="52"

                                    />
                                ))}

                            </div>


                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled = {isInitialLoad.current}
                            >
                                UPDATE
                            </button>

                        </form>
                    </div>
                </Fragment></div>
        </div>
    )
}

export default UpdateProduct