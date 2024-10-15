import React from "react";
import { Row, Col } from "antd";
import { Card, Pagination } from "antd";
import { Divider } from "antd";
import { useState } from "react";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Drawer, Button, Space, InputNumber } from "antd";
import { Menu } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as userService from "../../services/userService";
import axios from "axios";

import "./HomePage.css";
const items = [
  {
    label: "Bộ lọc",
    key: "SubMenu",
    icon: <MenuUnfoldOutlined />,
    children: [
      {
        type: "group",
        label: "Theo giá",
        children: [
          {
            label: "Từ thấp đến cao",
            key: "setting:1",
          },
          {
            label: "Từ cao đến thấp",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Theo A-Z",
        children: [
          {
            label: "Từ A-Z",
            key: "setting:3",
          },
          {
            label: "Từ Z-A",
            key: "setting:4",
          },
        ],
      },
    ],
  },
];
const LIMIT = 8;
function HomePage() {
  const fetchApi = async (page) => {
    const response = await axios.get(
      `http://localhost:8080/api/book/getallbooks?page=${page}`
    );
    return response;
  };
  const mutation = new useMutation({
    mutationFn: ({ bookId, quantity, userId }) =>
      userService.addToCart({ bookId, quantity, userId }),
    onSuccess: (data) => {
      console.log("Da them vao gio hang:", data.data);
    },
    onError: (error) => {
      console.error("Error adding book to cart:", error);
    },
  });

  const [current, setCurrent] = useState("mail");
  const [currentPage, setCurrentPage] = useState(1);

  const { isError, isLoading, data } = useQuery({
    queryKey: ["books", currentPage],
    queryFn: () => fetchApi(currentPage),
  });

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [bookId, setBookId] = useState(null);
  const showDrawer = (id) => {
    setOpen(true);
    setBookId(id);
  };
  const onClose = () => {
    setOpen(false);
    setBookId(null);
  };
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  const onPageChange = (num) => {
    setCurrentPage(num);
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  console.log("quantities", quantity);
  console.log("itemId", bookId);
  const handleAddToCart = () => {
    if (!bookId) {
      console.error("Book ID is missing");
      return;
    }
    mutation.mutate({
      bookId: bookId,
      quantity: quantity,
      userId: localStorage.getItem("userId"),
    });
    alert("Thêm vào giỏ hàng thành công");
    onClose(); // Đóng Drawer sau khi thêm vào giỏ hàng
  };
  return (
    <div>
      <div>
        <img
          src="public/slide.png"
          alt=""
          className="slide"
          style={{ width: "100%" }}
          loading="lazy"
        />
      </div>
      <Divider style={{ borderColor: "#4fb0dc" }}>
        <h1>Có thể bạn thích</h1>
      </Divider>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div>
        <Row>
          <Col span={20} offset={2}>
            <Row gutter={[16, 16]}>
              {data?.data?.data.length > 0 &&
                data?.data?.data.map((book) => (
                  <Col
                    className="gutter-row"
                    span={6}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    key={book._id}
                  >
                    <div className="div-card">
                      <Card
                        className="card"
                        hoverable
                        onClick={() => showDrawer(book._id)}
                      >
                        <img
                          src={book.image}
                          alt=""
                          style={{
                            height: "150px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <h3
                          style={{ maxWidth: "280px" }}
                          className="title-book"
                        >
                          {book.book_name}
                        </h3>
                        <p className="title-book">Tác giả: {book.author}</p>
                        <p>Xem chi tiết</p>
                      </Card>
                    </div>
                    <Drawer
                      title="Thông tin sách"
                      onClose={onClose}
                      open={open}
                    >
                      <h3>Tên sách: {book.book_name}</h3>
                      <p>Nhà xuất bản: {book.publisher}</p>
                      <p>Giá: {book.price}đ</p>
                      <p>Mô tả: {book.description}</p>
                      <div
                        style={{
                          textAlign: "right",
                        }}
                      >
                        <Space>
                          <InputNumber
                            min={1}
                            value={quantity}
                            onChange={handleQuantityChange}
                            style={{ marginRight: "10px" }}
                          />
                          <Button
                            type="primary"
                            onClick={handleAddToCart}
                            style={{ marginBottom: "20px" }}
                          >
                            Thêm vào giỏ hàng
                          </Button>
                        </Space>
                      </div>
                    </Drawer>
                  </Col>
                ))}
            </Row>
            <br />
            {/* {data?.data?.totalItems && ( */}
            <Pagination
              align="center"
              current={currentPage}
              total={data?.data?.totalItems}
              pageSize={LIMIT}
              onChange={(page) => onPageChange(page)}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
