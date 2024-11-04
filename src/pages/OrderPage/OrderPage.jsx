/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Divider } from "antd";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import * as userService from "../../services/userService";
import { InputNumber, Input, Modal, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./OrderPage.css";
function OrderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingPrice, setShippingPrice] = useState(30000);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("");
  const nagivate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Địa chỉ nhận hàng đã được cập nhật:", address);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const userId = localStorage.getItem("userId");
  const fetchCart = async (userId) => {
    const response = userService.getCart(userId);
    return response;
  };
  const { data, isError, isLoading } = useQuery({
    queryKey: ["carts", userId],
    queryFn: () => fetchCart(userId),
  });
  const mutation = new useMutation({
    mutationFn: (data) => userService.createOrder(data),
    onSuccess: (data) => {
      console.log("Data:", data);
      alert("Đặt hàng thành công");
      nagivate("/");
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
  const mutationDeleteCart = new useMutation({
    mutationFn: ({ userId }) => userService.removeUserCart({ userId }),
    onSuccess: (data) => {
      console.log("Gio hang trong");
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
  const handleCreateOrder = () => {
    mutation.mutate({
      OrderItem: data.data[0].items,
      address: address,
      phone: phone,
      name: name,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      userId: localStorage.getItem("userId"),
      status: "Chờ xác nhận",
    });
    mutationDeleteCart.mutate({
      userId: localStorage.getItem("userId"),
    });
  };
  const totalProductPrice = data?.data[0]?.items.reduce((total, item) => {
    return total + item.bookId.price * item.quantity;
  }, 0);
  useEffect(() => {
    setTotalPrice(totalProductPrice + shippingPrice);
  }, [totalProductPrice, shippingPrice]);
  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="orderpage">
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
              <h3 style={{ fontWeight: "600" }}>
                {name} {phone}
              </h3>
              <p>{address}</p>
              <Button onClick={showModal}>Thay đổi thông tin nhận hàng</Button>
            </div>
            <Modal
              title="Chỉnh sửa địa chỉ nhận hàng"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form>
                <Form.Item label="Tên người nhận">
                  <Input
                    placeholder="Nhập thông tin người nhận"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Địa chỉ">
                  <Input
                    placeholder="Nhập địa chỉ mới"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                  <Input
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </Modal>
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
              {data?.data[0]?.items.map((item) => (
                <div key={item._id}>
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
                        }} // Make image responsive
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
                      <p>
                        {(item.bookId.price * item.quantity).toLocaleString()}{" "}
                        VND
                      </p>
                    </Col>
                  </Row>
                  <br />
                </div>
              ))}
              <hr />
              <div className="order-item">
                <Row>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <p>
                      Tổng tiền sản phẩm: {totalProductPrice?.toLocaleString()}{" "}
                      VND
                    </p>
                    <p>Phí vận chuyển: {shippingPrice.toLocaleString()} VND</p>
                    <h3>Tổng thanh toán: {totalPrice.toLocaleString()} VND</h3>
                    <Button
                      style={{ backgroundColor: "pink" }}
                      onClick={handleCreateOrder}
                    >
                      Mua hàng
                    </Button>
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
