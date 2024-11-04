/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./CartPage.css";
import { Row, Col, Button, InputNumber, Modal, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import * as userService from "../../services/userService";
function CartPage() {
  const userId = localStorage.getItem("userId");
  const fetchCart = async (userId) => {
    const response = userService.getCart(userId);
    return response;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const mutation = new useMutation({
    mutationFn: ({ bookId, quantity, userId }) =>
      userService.updateItemInCart({ bookId, quantity, userId }),
    onSuccess: (data) => {
      console.log("Cap nhat so luong thanh cong:", data.data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
  const { data, isError, isLoading } = useQuery({
    queryKey: ["carts", userId],
    queryFn: () => fetchCart(userId),
  });
  if (isLoading) {
    return <div>Đang tải...</div>;
  }
  const showModal = (id, currentQuantity) => {
    setBookId(id); // Thiết lập bookId cho sản phẩm đang chỉnh sửa
    setIsModalOpen(true); // Mở modal
    console.log(bookId);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    mutation.mutate({
      bookId: bookId,
      quantity: quantity,
      userId: userId,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // if (isError) {
  //   return <div>Đã xảy ra lỗi: {error.message}</div>;
  // }

  return (
    <div className="cartpage">
      <Divider orientation="left">
        <h1>Giỏ hàng</h1>
      </Divider>
      <div className="cart-content">
        <Row>
          <Col span={20} offset={2}>
            {data?.data[0]?.items.map((item) => (
              <div className="cart-item" key={item._id}>
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
                  <Col xs={24} sm={16} md={12} lg={4}>
                    <h3>{item.bookId.book_name}</h3>
                    <p>Giá: {item.bookId.price.toLocaleString()} VND</p>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>Số lượng</h3>
                    <InputNumber
                      min={1}
                      defaultValue={item.quantity}
                      style={{ marginRight: "10px" }}
                      disabled
                    />
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>Tổng cộng</h3>
                    <p>
                      {(item.bookId.price * item.quantity).toLocaleString()} VND
                    </p>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "orange" }}
                      onClick={() => showModal(item.bookId._id, item.quantity)}
                    >
                      <EditOutlined />
                    </Button>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <Button type="primary" danger>
                      Xóa
                    </Button>
                  </Col>
                </Row>
                <Modal
                  title="Chỉnh sửa số lượng sản phẩm"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <InputNumber
                    min={1}
                    defaultValue={item.quantity}
                    // value={quantity}
                    onChange={(value) => setQuantity(value)}
                  />
                </Modal>
              </div>
            ))}
          </Col>
          <Col span={20} offset={2}>
            <div className="cart-item">
              <Row gutter={16}>
                <Col xs={0} sm={16} md={18} lg={20}></Col>
                <Col xs={24} sm={8} md={6} lg={4}>
                  <Link to="/order">
                    <Button type="primary">Thanh toán</Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CartPage;
