// OrderItem.js
import React from "react";
import { Row, Col } from "antd";

const OrderItem = ({ item }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={8} md={6} lg={4}>
        <img
          src={item.bookId.image}
          alt="product"
          className="cart-item-image"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
          }}
        />
      </Col>
      <Col xs={24} sm={16} md={12} lg={8}>
        <h3>{item.bookId.book_name}</h3>
      </Col>
      <Col xs={24} sm={8} md={6} lg={4}>
        <p>Giá: {item.bookId.price.toLocaleString()} VND</p>
      </Col>
      <Col xs={24} sm={8} md={6} lg={4}>
        <p>{item.quantity}</p>
      </Col>
      <Col xs={24} sm={8} md={6} lg={4}>
        <p>{(item.bookId.price * item.quantity).toLocaleString()} VND</p>
      </Col>
    </Row>
  );
};

export default OrderItem;
