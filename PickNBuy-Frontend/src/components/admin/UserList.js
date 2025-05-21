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

import { clearOrderDeleted } from '../../slices/orderSlice';
import { deleteUser, getUsers } from '../../actions/userActions';
import { clearUserDeleted } from '../../slices/usersSlice';

const UserList = () => {

    const { users=[], loading=true, error, isUserDeleted}= useSelector(state => state.userState);
   
    const dispatch = useDispatch();

    const deleteHandler = (e,id) => {
      e.target.disabled = true;
      dispatch(deleteUser(id))
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

        if (isUserDeleted){
          Swal.fire({
              icon: "success",
              text: "User Deleted Successfully"
          });
          dispatch(clearUserDeleted());
          return;
      }
        dispatch(getUsers());
    }, [dispatch, error,isUserDeleted])

  return (
    <div className='row'>
    <div className='col-12 col-md-2'>
        <Sidebar/>
    </div>
    <div className='col-12 col-md-10'>
    <h1 className="my-4">Users List</h1>
    <Fragment>
        {loading ? <Loader/> :
        <MDBTable striped bordered hover responsive>
              <MDBTableHead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                   
                    <td>
                      <Link
                        to={`/admin/user/${user.id}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        <i className="fa fa-pencil"></i>
                      </Link>
                      <MDBBtn
                        color="danger"
                        size="sm"
                        onClick={(e) => deleteHandler(e, user.id)}
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

export default UserList