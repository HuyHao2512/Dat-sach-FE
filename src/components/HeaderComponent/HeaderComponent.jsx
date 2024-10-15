import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import "./HeaderComponent.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FacebookOutlined,
  InstagramOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

function HeaderComponent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = JSON.parse(localStorage.getItem("username"));
    if (token && storedUser) {
      setUser(storedUser);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    setUser(null);
  };
  const userId = localStorage.getItem("userId");
  return (
    <div>
      <header className="header">
        <div className="grid wide">
          <nav className="header__navbar hide-on-mobile-tablet">
            <ul className="header__navbar-list">
              <li className="header__navbar-item">
                <Link to="/about" className="custom-link">
                  Về chúng tôi
                </Link>
              </li>
              <li className="header__navbar-item">
                <span className="header__navbar-title--no-pointer">
                  Kết nối
                </span>

                <a href="" className="header__navbar-icon-link">
                  <FacebookOutlined className="header__navbar-icon" />
                </a>
                <a href="" className="header__navbar-icon-link">
                  <InstagramOutlined className="header__navbar-icon" />
                </a>
              </li>
            </ul>
            {user ? (
              <ul className="header__navbar-list">
                <li className="header__navbar-item header__navbar-user">
                  <span className="header__navbar-user-name">Tài khoản</span>
                  <ul className="header__navbar-user-menu">
                    <li className="header__navbar-user-item">
                      <Link to="/profile">Thông tin</Link>
                    </li>
                    <li className="header__navbar-user-item">
                      <Link to="/orderdetail">Đơn mua</Link>
                    </li>
                    <li className="header__navbar-user-item header__navbar-user-item--separate">
                      <Link onClick={handleLogout} to="/">
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className="header__navbar-list">
                <li className="header__navbar-item header__navbar-user">
                  <span className="header__navbar-user-name">Tài khoản</span>
                  <ul className="header__navbar-user-menu">
                    <li className="header__navbar-user-item">
                      <Link to="/login">Đăng nhập</Link>
                    </li>
                    <li className="header__navbar-user-item">
                      <Link to="/register">Đăng ký</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
          </nav>
          <div className="header-with-search">
            <label
              htmlFor="mobile-search-checkbox"
              className="header__mobile-search"
            >
              <SearchOutlined className="header__mobile-search-icon" />
            </label>

            <div className="header__logo hide-on-tablet">
              <a href="/" className="header__logo-link">
                <img
                  src="public/logo.png"
                  className="header__logo-img"
                  alt=""
                />
              </a>
            </div>
            <input
              type="checkbox"
              hidden
              id="mobile-search-checkbox"
              className="header__search-checkbox"
            />
            <div className="header__search ">
              <div className="header__search-input-wrap">
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="Nhập để tìm kiếm sản phẩm"
                />
              </div>
              <button className="header__search-btn">
                <SearchOutlined />
              </button>
            </div>

            <div className="header__cart">
              <div className="header__cart-wrap">
                <ShoppingCartOutlined className="header__cart-icon" />
                <span className="header__cart-notice">2</span>
                <div className="header__cart-list ">
                  <h4 className="header__cart-heading">Giỏ hàng</h4>
                  {/* <h2>Chưa có sản phẩm</h2> */}
                  <ul className="header__cart-list-item">
                    <li className="header__cart-item">
                      <img src="" alt="anh_sách" className="header__cart-img" />
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-head">
                          <h5 className="header__cart-item-name">
                            Chí Phèo - Nam Cao
                          </h5>
                          <div className="header__cart-item-price-wrap">
                            <span className="header__cart-item-price">
                              2.000.000đ
                            </span>
                            <span className="header__cart-item-multiply">
                              x
                            </span>
                            <span className="header__cart-item-qnt">2</span>
                          </div>
                        </div>
                        <div className="header__cart-item-body">
                          <span className="header__cart-item-description">
                            Phân loại : Truyện ngắn
                          </span>
                          <span className="header__cart-item-remove">Xóa</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <Link
                    to={`/user/${userId}`}
                    className="header__cart-view-cart btn btn--primary"
                  >
                    Xem giỏ hàng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HeaderComponent;
