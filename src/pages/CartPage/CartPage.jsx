import React, { useState } from "react";
import "./CartPage.css";
import {
  Row,
  Col,
  Button,
  InputNumber,
  Modal,
  Divider,
  Spin,
  message,
} from "antd";
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
      console.log("Cập nhật số lượng thành công:", data.data);
      message.success("Cập nhật số lượng thành công");
    },
    onError: (error) => {
      console.error("Error:", error);
      message.error("Có lỗi xảy ra");
    },
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["carts", userId],
    queryFn: () => fetchCart(userId),
  });

  const mutationDelete = new useMutation({
    mutationFn: ({ bookId, userId }) =>
      userService.deleteItemInCart({ bookId, userId }),
    onSuccess: (data) => {
      console.log("Xóa sản phẩm thành công:", data.data);
      message.success("Xóa sản phẩm thành công");
    },
    onError: (error) => {
      console.error("Error:", error);
      message.error("Có lỗi xảy ra");
    },
  });

  const handleDelete = (bookId) => {
    console.log("Xóa sản phẩm");
    mutationDelete.mutate({
      bookId: bookId,
      userId: userId,
    });
  };

  if (isLoading) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  const showModal = (id, currentQuantity) => {
    setBookId(id); // Thiết lập bookId cho sản phẩm đang chỉnh sửa
    setIsModalOpen(true); // Mở modal
    setQuantity(currentQuantity); // Đặt số lượng hiện tại vào state
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

  const isCartEmpty = !data || data.data[0]?.items.length === 0;

  return (
    <div className="cartpage">
      <Divider orientation="left">
        <h1>Giỏ hàng</h1>
      </Divider>
      <div className="cart-content">
        <Row>
          <Col span={20} offset={2}>
            {isCartEmpty ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="/empty-cart.png" alt="Library Icon" />
              </div>
            ) : (
              data?.data[0]?.items.map((item) => (
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
                        {(item.bookId.price * item.quantity).toLocaleString()}{" "}
                        VND
                      </p>
                    </Col>
                    <Col xs={24} sm={8} md={6} lg={4}>
                      <Button
                        type="primary"
                        style={{ backgroundColor: "orange" }}
                        onClick={() =>
                          showModal(item.bookId._id, item.quantity)
                        }
                      >
                        <EditOutlined />
                      </Button>
                    </Col>
                    <Col xs={24} sm={8} md={6} lg={4}>
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDelete(item.bookId._id)}
                      >
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
                      value={quantity} // Sử dụng value thay vì defaultValue
                      onChange={(value) => setQuantity(value)}
                    />
                  </Modal>
                </div>
              ))
            )}
          </Col>
          <Col span={20} offset={2}>
            <div className="cart-item">
              <Row gutter={16}>
                <Col xs={0} sm={16} md={18} lg={20}></Col>
                <Col xs={24} sm={8} md={6} lg={4}>
                  <Link to="/order">
                    <Button
                      type="primary"
                      disabled={isCartEmpty} // Vô hiệu hóa nếu giỏ hàng trống
                      onClick={() => {
                        if (isCartEmpty) {
                          message.warning("Giỏ hàng của bạn đang trống!");
                        }
                      }}
                    >
                      Thanh toán
                    </Button>
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
