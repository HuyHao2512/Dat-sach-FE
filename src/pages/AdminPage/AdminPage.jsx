import React, { useState } from "react";
import { Anchor, Col, Row, Button, Pagination } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as userService from "../../services/userService";
import axios from "axios";
import "./AdminPage.css";

const LIMIT = 8;
function AdminPage() {
  const fetchApi = async (page) => {
    const response = await axios.get(
      `http://localhost:8080/api/book/getallbooks?page=${page}`
    );
    return response;
  };

  const [currentPage, setCurrentPage] = useState(1);

  const { isError, isLoading, data } = useQuery({
    queryKey: ["books", currentPage],
    queryFn: () => fetchApi(currentPage),
  });

  const onPageChange = (num) => {
    setCurrentPage(num);
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <div>
      <header>
        <h1>Admin page</h1>
        <nav>
          <ul>
            <li>
              <Link to="#">
                <h2>Đăng xuất</h2>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Row>
        <Col span={20}>
          <div
            id="part-1"
            style={{
              height: "190vh",
              background: "rgba(255,0,0,0.02)",
            }}
          >
            <div className="order-item-content">
              <div className="cart-item">
                <Row gutter={16}>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>Sản phẩm</h3>
                  </Col>
                  <Col xs={24} sm={16} md={12} lg={8}>
                    <h3>Tên sách</h3>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}>
                    <h3>Số lượng trong kho</h3>
                  </Col>
                  <Col xs={24} sm={8} md={6} lg={4}></Col>
                  <Col xs={24} sm={8} md={6} lg={4}></Col>
                </Row>
                <hr />

                {data?.data?.data.length > 0 &&
                  data?.data?.data.map((book) => (
                    <Row
                      gutter={16}
                      key={book._id}
                      style={{ marginBottom: "20px" }}
                    >
                      <Col xs={24} sm={8} md={6} lg={4}>
                        <img
                          src={book.image}
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
                        <h3 style={{ overflow: "hidden" }}>{book.book_name}</h3>
                      </Col>
                      <Col xs={24} sm={8} md={6} lg={4}>
                        <h3>{book.countInStock}</h3>
                      </Col>
                      <Col xs={24} sm={8} md={6} lg={4}>
                        <Button type="primary" style={{ marginTop: "0px" }}>
                          Chỉnh sửa
                        </Button>
                      </Col>
                      <Col xs={24} sm={8} md={6} lg={4}>
                        <Button
                          type="primary"
                          danger
                          style={{ marginTop: "0px" }}
                        >
                          Xóa
                        </Button>
                      </Col>
                    </Row>
                  ))}
              </div>
              <Pagination
                align="center"
                current={currentPage}
                total={data?.data?.totalItems}
                pageSize={LIMIT}
                onChange={(page) => onPageChange(page)}
              />
            </div>
          </div>
          <div
            id="part-2"
            style={{
              height: "100vh",
              background: "rgba(0,255,0,0.02)",
            }}
          >
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Mã Đơn Hàng</th>
                  <th>Trạng thái</th>
                  <th>Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Zdarefd4524</td>
                  <td>Chờ xác nhận</td>
                  <td>
                    <Link>Xem chi tiết</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination align="center" defaultCurrent={1} total={50} />
          <div
            id="part-3"
            style={{
              height: "100vh",
              background: "rgba(0,0,255,0.02)",
            }}
          />
        </Col>
        <Col span={4}>
          <Anchor
            items={[
              {
                key: "part-1",
                href: "#part-1",
                title: "Danh sách sản phẩm",
              },
              {
                key: "part-2",
                href: "#part-2",
                title: "Danh sách đơn hàng",
              },
              {
                key: "part-3",
                href: "#part-3",
                title: "Part 3",
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}

export default AdminPage;
