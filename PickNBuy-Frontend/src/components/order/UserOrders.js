import { Fragment, useEffect } from 'react'
import  MetaData from '../layouts/MetaData';
//import { MDBDataTable } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import {userOrders as userOrdersAction} from '../../actions/orderActions';
//import { MDBDataTable } from 'mdbreact'; 
import { Link } from 'react-router-dom';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBContainer
  } from 'mdb-react-ui-kit';

function UserOrders() {
    const { userOrders } = useSelector (state => state.orderState);
    const {user} = useSelector (state => state.authState);
    const dispatch = useDispatch();


    useEffect ( () =>{
       // alert(user.id);
        dispatch(userOrdersAction(user.id));

    },[dispatch])


   
  return (
    <Fragment>
        <MetaData title = "My Orders"/>
       
         
        <MDBContainer className='mt-5'>
        <h1 className='mb-4'>My Orders</h1>

        <MDBTable align='middle' hover responsive bordered>
          <MDBTableHead>
            <tr>
              <th scope='col'>Order ID</th>
              <th scope='col'>Order Date</th>
              <th scope='col'>Number of Items</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Status</th>
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {userOrders.map(userOrder => (
              <tr key={userOrder.id}>
                <td>{userOrder.id}</td>
                <td>{userOrder.paidAt.split('T')[0]}</td>
                <td>{userOrder.orderitems.length}</td>
                <td>${userOrder.totalPrice.toFixed(2)}</td>
                <td>
                  <span style={{ color: userOrder.orderStatus.includes('Delivered') ? 'green' : 'red' }}>
                    {userOrder.orderStatus}
                  </span>
                </td>
                <td>
                  <Link to={`/order/${userOrder.id}`} className='btn btn-primary btn-sm'>
                    <i className='fa fa-eye'></i>
                  </Link>
              
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    </Fragment>
  )
}

export default UserOrders;