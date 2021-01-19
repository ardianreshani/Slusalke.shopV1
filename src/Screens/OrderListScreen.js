import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import {
  listOrders
} from "../actions/orderActions";


const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
        dispatch(listOrders())
    }else{
        history.push("/login");
    }
    
  }, [dispatch, history, userInfo, ]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>All Orders</h1>
        </Col>
        
      </Row>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr ket={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>${order.totalPrice}</td>
                <td> {order.isPaid ?(
                     order.paidAt.substring(0, 10)
                     ) : (<i className='fas fa-times' style={{color: 'red'}}></i>)} 
                </td>
                <td> {order.isDelivered ?(
                     order.deliveredAt.substring(0, 10)
                     ) : (<i className='fas fa-times' style={{color: 'red'}}></i>)} 
                </td>
                <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                            Details
                        </Button>
                    </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
