import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import HeaderAction from "./HeaderAction";
import Logo from "./Logo";
import "./HeaderComponent.css";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import * as userService from "../../services/userService";
function HeaderComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => setIsScrolled(window.scrollY > 50));
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  useEffect(() => {
    // Kiểm tra nếu access_token có tồn tại trong localStorage
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []); // Dependency array chỉ chạy một lần khi component mount

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalVisible(false);
  };

  const handleLogin = () => setIsModalVisible(true);
  const mutationLogout = useMutation({
    mutationFn: (refreshToken) => userService.logout({ token: refreshToken }), // Truyền refresh token vào
    onSuccess: () => {
      console.log("Logout successful");
      // Xóa các token và thông tin đăng nhập từ localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("roles");
      localStorage.removeItem("user");
      // Cập nhật trạng thái đăng xuất
      setIsLoggedIn(false);
      navigate("/");
      message.success("Đăng xuất thành công");
    },
    onError: (error) => {
      console.error("Error during logout:", error);
      message.error("Đăng xuất thất bại");
    },
  });
  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      mutationLogout.mutate(refreshToken); // Gọi mutate với refresh token
    } else {
      console.error("No refresh token found");
    }
  };
  const handleCart = () => navigate(`/user/${localStorage.getItem("userId")}`);
  const handleOrder = () =>
    navigate(`/orderdetail/${localStorage.getItem("userId")}`);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Logo />
        <HeaderAction
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onCart={handleCart}
          onOrder={handleOrder}
        />
      </div>
      <AuthModal
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
}

export default HeaderComponent;
