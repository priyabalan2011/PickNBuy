import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBContainer,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { clearError } from '../../slices/orderSlice';
import Loader from '../layouts/Loader';
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { clearProductDeleted } from '../../slices/productSlice';
import { deleteOrder , adminOrders as adminOrdersAction } from '../../actions/orderActions';
import { clearOrderDeleted } from '../../slices/orderSlice';

const OrderList = () => {

    const { adminOrders=[], loading=true, error, isOrderDeleted}= useSelector(state => state.orderState);
   
    const dispatch = useDispatch();

    const deleteHandler = (e,id) => {
      e.target.disabled = true;
      dispatch (deleteOrder(id))
    }

    useEffect(() => {
        if(error )
        {
            Swal.fire({
                icon: "error",
                text: error 
            });
            dispatch(clearError());
            return;
        }

        if (isOrderDeleted){
          Swal.fire({
              icon: "success",
              text: "Order Deleted Successfully"
          });
          dispatch(clearOrderDeleted());
          return;
      }
        dispatch(adminOrdersAction());
    }, [dispatch, error,isOrderDeleted])

  return (
    <div className='row'>
    <div className='col-12 col-md-2'>
        <Sidebar/>
    </div>
    <div className='col-12 col-md-10'>
    <h1 className="my-4">Orders List</h1>
    <Fragment>
        {loading ? <Loader/> :
        <MDBTable striped bordered hover responsive>
              <MDBTableHead>
                <tr>
                  <th>ID</th>
                  <th>Number Of Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {adminOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.orderitems.length}</td>
                    <td>${order.totalPrice}</td>
                    <td><p style={{color:order.orderStatus.includes("Processing") ? 'red' : 'green'}}>{order.orderStatus}</p></td>
                    <td>
                      <Link
                        to={`/admin/order/${order.id}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        <i className="fa fa-pencil"></i>
                      </Link>
                      <MDBBtn
                        color="danger"
                        size="sm"
                        onClick={(e) => deleteHandler(e, order.id)}
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

export default OrderList