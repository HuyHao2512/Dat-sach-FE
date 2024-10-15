import React from "react";
import { Divider } from "antd";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { InputNumber, Space } from "antd";
import "./OrderPage.css";
function OrderPage() {
  return (
    <div>
      <Divider orientation="left">
        <h1>Đặt hàng</h1>
      </Divider>
      <div className="order-content">
        <Row>
          <Col span={20} offset={2}>
            <div className="order-address">
              <h2 style={{ color: "orange" }}>
                <HomeOutlined />
                &nbsp; Địa chỉ nhận hàng
              </h2>
              <h3 style={{ fontWeight: "600" }}>Hồ Huy Hào 0123456789</h3>
              <p>Địa chỉ: Hưng Lợi, Ninh Kiều, Cần Thơ</p>
              <Link to="/profile">
                <Button>Thay đổi thông tin nhận hàng</Button>
              </Link>
            </div>
            <div className="order-item-content">
              <div className="order-item-title">
                <Row gutter={16}>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h2>Sản phẩm</h2>
                  </Col>
                  <Col xs={24} sm={16} md={12} lg={8}>
                    <h2>Tên sách</h2>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h2>Đơn giá</h2>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h2>Số lượng</h2>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h2>Thành tiền</h2>
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="order-item">
                <Row gutter={16}>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <img
                      src="public/sach1.jpg"
                      alt="product"
                      className="cart-item-image"
                      style={{
                        width: "120px",
                        height: "120px",
                        //   paddingTop: "100%",
                        objectFit: "cover",
                      }} // Make image responsive
                    />
                  </Col>
                  <Col xs={24} sm={16} md={12} lg={8}>
                    <h3>Tôi thấy hoa vàng trên cỏ xanh</h3>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>100.000</h3>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>4</h3>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>400.000</h3>
                  </Col>
                </Row>
              </div>
              <hr />
              <div className="order-item">
                <Row gutter={16}>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <img
                      src="public/sach1.jpg"
                      alt="product"
                      className="cart-item-image"
                      style={{
                        width: "120px",
                        height: "120px",
                        //   paddingTop: "100%",
                        objectFit: "cover",
                      }} // Make image responsive
                    />
                  </Col>
                  <Col xs={24} sm={16} md={12} lg={8}>
                    <h3>Tôi thấy hoa vàng trên cỏ xanh</h3>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>100.000</h3>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>4</h3>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>400.000</h3>
                  </Col>
                </Row>
              </div>
              <div className="order-item">
                <Row>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <p>Tổng tiền sản phẩm: 400.000</p>
                    <p>Phí vận chuyển: 30.000</p>
                    <h3>Tổng thanh toán: 430.000</h3>
                    <Link to="/order">
                      <Button style={{ backgroundColor: "pink" }}>
                        Mua hàng
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default OrderPage;
