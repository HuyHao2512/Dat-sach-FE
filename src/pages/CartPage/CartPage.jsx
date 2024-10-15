import React from "react";
import "./CartPage.css";
import { Divider } from "antd";
import { Row, Col, Button } from "antd";
import { InputNumber } from "antd";
import { useState } from "react";
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
  const [quantities, setQuantities] = useState({});
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
  const handleQuantityChange = (itemId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
    setBookId(itemId);
    setQuantity(value);
    mutation.mutate({
      bookId: bookId,
      quantity: quantity,
      userId: localStorage.getItem("userId"),
    });
  };
  console.log("quantities", quantity);
  console.log("bookId", bookId);
  const handleUpdateItemInCart = () => {};
  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (isError) {
    return <div>Đã xảy ra lỗi: {error.message}</div>;
  }

  return (
    <div>
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
                  <Col xs={24} sm={16} md={12} lg={8}>
                    <h3>{item.bookId.book_name}</h3>
                    <p>Giá: {item.bookId.price.toLocaleString()} VND</p>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>Số lượng</h3>
                    {/*<InputNumber
                      min={1}
                      value={item.quantity || quantityItem} // Sử dụng số lượng từ state hoặc giá trị mặc định
                      onChange={(value) => handleQuantityChange(value)}
                      style={{ marginRight: "10px" }}
                    /> */}
                    <InputNumber
                      min={1}
                      defaultValue={item.quantity}
                      value={quantities[item._id]} // Sử dụng số lượng từ state hoặc giá trị mặc định
                      onChange={(value) =>
                        handleQuantityChange(item._id, value)
                      } // Gọi hàm với id của item
                      style={{ marginRight: "10px" }}
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
                      danger
                      onClick={handleUpdateItemInCart}
                    >
                      Xóa
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
          <Col span={20} offset={2}>
            <div className="cart-item">
              <Row gutter={16}>
                <Col xs={0} sm={16} md={18} lg={20}></Col>
                {/* <Col xs={24} sm={8} md={6} lg={4}></Col>
                <Col xs={24} sm={8} md={6} lg={4}></Col>
                <Col xs={24} sm={8} md={6} lg={4}></Col>
                <Col xs={24} sm={8} md={6} lg={4}></Col> */}
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
