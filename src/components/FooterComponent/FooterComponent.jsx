// eslint-disable-next-line no-unused-vars
import React from "react";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Footer.css";
function FooterComponent() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Về Chúng Tôi</h4>
          <ul>
            <li>
              <a href="#">Giới Thiệu Về Nhà Sách Phương Nam</a>
            </li>
            <li>
              <a href="#">Hệ Thống Nhà Sách Phương Nam</a>
            </li>
            <li>
              <a href="#">Điều Khoản Sử Dụng</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Tài Khoản Của Tôi</h4>
          <ul>
            <li>
              <a href="#">Đăng nhập</a>
            </li>
            <li>
              <a href="#">Tạo tài khoản</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Hỗ Trợ Khách Hàng</h4>
          <ul>
            <li>
              <a href="#">Các Câu Hỏi Thường Gặp</a>
            </li>
            <li>
              <a href="#">Chính Sách Đổi/Trả Hàng</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Liên Hệ Với Chúng Tôi</h4>
          <p>Hotline: 1900 6656</p>
          <p>Email: hotro@nhasachphuongnam.com</p>
          <div className="social-icons">
            <Link to="facebook.com/nhasachphuongnam">
              <FacebookOutlined style={{ fontSize: "40px", color: "black" }} />
            </Link>
            <Link to="#">
              <InstagramOutlined style={{ fontSize: "40px", color: "black" }} />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 - Bản quyền của Nhà Sách Phương Nam</p>
      </div>
    </div>
  );
}

export default FooterComponent;
