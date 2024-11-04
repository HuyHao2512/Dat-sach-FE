// OrderSummary.js
import React from "react";
import { Row, Col, Button } from "antd";

const OrderSummary = ({
  totalProductPrice,
  shippingPrice,
  totalPrice,
  handleCreateOrder,
  address,
  name,
  phone,
}) => {
  return (
    <div className="order-summary">
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <p>Tổng tiền sản phẩm: {totalProductPrice?.toLocaleString()} VND</p>
          <p>Phí vận chuyển: {shippingPrice.toLocaleString()} VND</p>
          <h3>Tổng thanh toán: {totalPrice.toLocaleString()} VND</h3>
          {address && name && phone ? (
            <Button
              style={{ backgroundColor: "pink" }}
              onClick={handleCreateOrder}
            >
              Mua hàng
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "pink" }}
              onClick={handleCreateOrder}
              disabled
            >
              Mua hàng
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OrderSummary;
