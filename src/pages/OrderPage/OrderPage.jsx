// OrderPage.js
import React, { useState, useEffect } from "react";
import { Divider, Row, Col, message } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import OrderAddress from "../../components/Order/OrderAddress";
import OrderItem from "../../components/Order/OrderItem";
import OrderSummary from "../../components/Order/OrderSummary";
import "./OrderPage.css";

function OrderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingPrice, setShippingPrice] = useState(30000);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => {
    console.log("Địa chỉ nhận hàng đã được cập nhật:", address);
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  const userId = localStorage.getItem("userId");
  const fetchCart = async (userId) => {
    const response = userService.getCart(userId);
    return response;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["carts", userId],
    queryFn: () => fetchCart(userId),
  });

  const mutation = useMutation({
    mutationFn: (data) => userService.createOrder(data),
    onSuccess: () => {
      message.success("Đặt hàng thành công");
      navigate("/");
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const mutationDeleteCart = useMutation({
    mutationFn: ({ userId }) => userService.removeUserCart({ userId }),
    onSuccess: () => {
      console.log("Giỏ hàng trống");
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
            <OrderAddress
              name={name}
              phone={phone}
              address={address}
              showModal={showModal}
              setName={setName}
              setPhone={setPhone}
              setAddress={setAddress}
              isModalOpen={isModalOpen}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
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
                <OrderItem key={item._id} item={item} />
              ))}
              <hr />
              <OrderSummary
                totalProductPrice={totalProductPrice}
                shippingPrice={shippingPrice}
                totalPrice={totalPrice}
                handleCreateOrder={handleCreateOrder}
                address={address}
                name={name}
                phone={phone}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default OrderPage;
