import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./HeaderComponent.css";
const HeaderAction = ({ isLoggedIn, onLogin, onLogout, onCart, onOrder }) => (
  <div className="header-actions">
    {isLoggedIn ? (
      <>
        <button className="login-btn" onClick={onLogout}>
          Đăng xuất
        </button>
        &nbsp;
        <button className="login-btn" onClick={onOrder}>
          Đơn mua
        </button>
        &nbsp;
        <button className="cart-btn" onClick={onCart}>
          <img src="public/shopping-cart.gif" alt="Cart" />
        </button>
      </>
    ) : (
      <button className="login-btn" onClick={onLogin}>
        Đăng nhập
      </button>
    )}
  </div>
);

export default HeaderAction;
