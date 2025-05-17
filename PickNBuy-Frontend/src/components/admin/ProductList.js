import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBContainer,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { clearError } from '../../slices/productsSlices';
import { deleteProduct, getAdminProducts } from '../../actions/productsActions';
import Loader from '../layouts/Loader';
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { clearProductDeleted } from '../../slices/productSlice';

const ProductList = () => {

    const { products=[], loading=true, error}= useSelector(state => state.productsState);
    const {isProductDeleted , error: productError} = useSelector(state => state.productState);
    const dispatch = useDispatch();

    const deleteHandler = (e,id) => {
      e.target.disabled = true;
      dispatch (deleteProduct(id))
    }

    useEffect(() => {
        if(error || productError)
        {
            Swal.fire({
                icon: "error",
                text: error || productError
            });
            dispatch(clearError());
            return;
        }

        if (isProductDeleted){
          Swal.fire({
              icon: "success",
              text: "Product Deleted Successfully"
          });
          dispatch(clearProductDeleted());
          return;
      }
        dispatch(getAdminProducts());
    }, [dispatch, error,isProductDeleted])

  return (
    <div className='row'>
    <div className='col-12 col-md-2'>
        <Sidebar/>
    </div>
    <div className='col-12 col-md-10'>
    <h1 className="my-4">Product List</h1>
    <Fragment>
        {loading ? <Loader/> :
        <MDBTable striped bordered hover responsive>
              <MDBTableHead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.productname}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link
                        to={`/admin/products/${product.id}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        <i className="fa fa-pencil"></i>
                      </Link>
                      <MDBBtn
                        color="danger"
                        size="sm"
                        onClick={(e) => deleteHandler(e, product.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </MDBBtn>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
}
    </Fragment></div>
    </div>
  )
}

export default ProductList