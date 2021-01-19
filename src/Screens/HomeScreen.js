import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../component/Product";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { listProducts } from "../actions/productActions";
import ProductCarousel from "../component/ProductCarousel";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1> Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((prooduct) => (
            <Col key={prooduct._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={prooduct} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
