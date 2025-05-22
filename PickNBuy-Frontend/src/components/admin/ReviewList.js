import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBContainer,
    MDBBtn
} from 'mdb-react-ui-kit';
import { clearError, clearReviewDeleted } from '../../slices/productSlice';
import Loader from '../layouts/Loader';
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { clearProductDeleted } from '../../slices/productSlice';

import { clearOrderDeleted } from '../../slices/orderSlice';
import { deleteUser, getUsers } from '../../actions/userActions';
import { clearUserDeleted } from '../../slices/usersSlice';
import { deleteReviews, getReviews } from '../../actions/productsActions';

const ReviewList = () => {

    const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(state => state.productState);
    const { products = [] } = useSelector(state => state.productsState);
    const [productId, setProductId] = useState("");

    const dispatch = useDispatch();

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteReviews(productId, id))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getReviews(productId));
    }


    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: "error",
                text: error
            });
            dispatch(clearError());
            return;
        }

        if (isReviewDeleted) {
            Swal.fire({
                icon: "success",
                text: "Review Deleted Successfully"
            });
            dispatch(clearReviewDeleted());
            dispatch(getReviews(productId));
            return;
        }

    }, [dispatch, error, isReviewDeleted])

    return (
        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar />
            </div>
            <div className='col-12 col-md-10'>
                <h1 className="my-4">Reviews List</h1>
                <div className="row justify-content-center mt-5">
                    <div className="col-5">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label >Product ID  &nbsp;&nbsp;</label>
                                {/* <input
                                    type="text"
                                    onChange={e => setProductId(e.target.value)}
                                    value={productId}
                                    className="form-control"
                                /> */}
                                
                                <select  onChange={e => setProductId(e.target.value)} >
                                    <option>Select a Product</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>{product.id}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" disabled={loading} className="btn btn-primary btn-block py-2">
                                Search
                            </button>
                        </form>
                    </div>
                </div><p />
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBTable striped bordered hover responsive>
                            <MDBTableHead>
                                <tr>
                                    <th>ID</th>
                                    <th>Rating</th>
                                    <th>User</th>
                                    <th>Comment</th>
                                    <th>Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {reviews.map((review) => (
                                    <tr key={review.id}>
                                        <td>{review.id}</td>
                                        <td>{review.rating}</td>
                                        <td>{review.user.name}</td>
                                        <td>{review.comment}</td>

                                        <td>

                                            <MDBBtn
                                                color="danger"
                                                size="sm"
                                                onClick={(e) => deleteHandler(e, review.id)}
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

export default ReviewList