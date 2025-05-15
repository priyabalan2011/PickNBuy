import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import { createNewProducts } from '../../actions/productsActions';
import Swal from "sweetalert2";
import { clearProductCreated } from '../../slices/productSlice';
import { clearError } from '../../slices/productsSlices';

const NewProduct = () => {

    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ description, setDescription ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ stock, setStock ] = useState(0);
    const [ seller, setSeller ] = useState("");
    const [ images, setImages ] = useState([]);
    const [ imagesPreview, setImagesPreview ] = useState([]);

    const {loading, error, product, isProductCreated} = useSelector(state=>state.productState);
    const categories=[
        'Electronics',
        'Mobile Phones',
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
            dispatch(createNewProducts(formData));
    }

    useEffect (()=>{
        if (isProductCreated){
            Swal.fire({
                icon: "success",
                text: "Product Created Successfully"
            });
            dispatch(clearProductCreated());
            navigate('/admin/products')
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

    },[dispatch,loading,error, isProductCreated])

    return (

        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />
            </div>
            <div className='col-12 col-md-10'>
                <h1 className="my-4">Product List</h1>
                <Fragment>

                    <div className="wrapper my-5">
                        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                            <h1 className="mb-4">New Product</h1>

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
                                <select className="form-control" id="category_field" onChange={e => setCategory(e.target.value)}>
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
                                disabled = {loading}
                            >
                                CREATE
                            </button>

                        </form>
                    </div>
                </Fragment></div>
        </div>
    )
}

export default NewProduct