import { Row, Col } from "antd";
import { Card, Pagination } from "antd";
import { Divider } from "antd";
import { useState } from "react";
import { Drawer, Button, Space, InputNumber, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as userService from "../../services/userService";
import { useRef } from "react";
import axios from "axios";
import "./HomePage.css";
const LIMIT = 8;
function HomePage() {
  const booksRef = useRef(null);
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
      message.success("Thêm vào giỏ hàng thành công");
    },
    onError: (error) => {
      console.error("Error adding book to cart:", error);
      message.error("Bạn chưa đăng nhập hoặc có lỗi xảy ra");
    },
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { isError, isLoading, data } = useQuery({
    queryKey: ["books", currentPage],
    queryFn: () => fetchApi(currentPage),
  });
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
  const handleExploreClick = () => {
    // Cuộn đến phần danh sách sách
    if (booksRef.current) {
      booksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  if (isLoading) {
    return (
      <div style={{ paddingTop: "200px", paddingLeft: "500px" }}>
        <img src="public/Loading.gif" alt="" />
      </div>
    );
  }
  if (isError) {
    return <h1>Error</h1>;
  }
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
    onClose(); // Đóng Drawer sau khi thêm vào giỏ hàng
  };
  return (
    <div>
      <div>
        <div className="flex-container">
          <div className="text-center">
            <h1>
              <span
                className="fade-in"
                id="digit1"
                style={{ fontWeight: "bold" }}
              >
                CHÀO&nbsp;
              </span>
              <span
                className="fade-in"
                id="digit2"
                style={{ fontWeight: "bold" }}
              >
                MỪNG&nbsp;
              </span>
              <span
                className="fade-in"
                id="digit3"
                style={{ fontWeight: "bold" }}
              >
                BẠN
              </span>
            </h1>
            <h3
              className="fadeIn"
              style={{
                fontSize: "50px",
              }}
            >
              <img src="public/book.png" style={{ height: "60px" }} /> ĐẾN VỚI
              NHÀ SÁCH PHƯƠNG NAM{" "}
              <img src="public/book.png" style={{ height: "60px" }} />
            </h3>
            <button type="button" name="button" onClick={handleExploreClick}>
              KHÁM PHÁ NGAY
            </button>
          </div>
        </div>
      </div>
      <div ref={booksRef}>
        <Row>
          <Col span={20} offset={2}>
            <Row>
              <Col span={8} className="center-content">
                <img src="public/books.gif" style={{ width: "300px" }} />
                <h2>
                  Chúng tôi cung cấp nhiều thể loại sách, đa dạng các phiên bản,
                  hứa hẹn sẽ làm đọc giả thỏa thích lựa chọn
                </h2>
              </Col>
              <Col span={8} className="center-content">
                <img src="public/cashback.gif" style={{ width: "300px" }} />
                <h2>
                  Chúng tôi đảm bảo chất lượng sách luôn đảm bảo, nếu có sai sót
                  chúng tôi sẽ hoàn tiền một cách minh bạch
                </h2>
              </Col>
              <Col span={8} className="center-content">
                <img
                  src="public/delivery-truck.gif"
                  style={{ width: "300px" }}
                />
                <h2>
                  Với dịch vụ vận chuyển đa dạng, chúng tôi sẽ đem sách đến cho
                  bạn với thời gian cực kỳ nhanh chóng
                </h2>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Divider style={{ borderColor: "#4fb0dc" }}>
        <h1>
          Có thể bạn thích{" "}
          <img src="public/library.gif" style={{ height: "60px" }} />
        </h1>
      </Divider>
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
                          <Button type="primary" onClick={handleAddToCart}>
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
