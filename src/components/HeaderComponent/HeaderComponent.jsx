/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Tabs, Input, Drawer, message } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import "./HeaderComponent.css"; // CSS dành cho Header
const { TabPane } = Tabs;
function HeaderComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameSingUp, setUsernameSingUp] = useState("");
  const [passwordSingUp, setPasswordSingUp] = useState("");
  const [emailSingUp, setEmailSingUp] = useState("");
  const handleChangUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangUsernameSignUp = (e) => {
    setUsernameSingUp(e.target.value);
  };
  const handleChangePasswordSignUp = (e) => {
    setPasswordSingUp(e.target.value);
  };
  const handleChangeEmailSignUp = (e) => {
    setEmailSingUp(e.target.value);
  };
  const navigate = useNavigate();
  const mutation = new useMutation({
    mutationFn: (data) => userService.login(data),
    onSuccess: (data) => {
      console.log("Data:", data.data);
      localStorage.setItem("access_token", data.data.accessToken);
      localStorage.setItem("refresh_token", data.data.refreshToken);
      localStorage.setItem("username", JSON.stringify(data.data.username));
      localStorage.setItem("userId", data.data.id);
      setIsLoggedIn(true);
      message.success("Đăng nhập thành công");
    },
    onError: (error) => {
      message.error("Đăng nhập thất bại");
    },
  });
  const { data, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      if (data?.data?.accessToken) {
        // const decoded = jwtDecode(data?.data?.accessToken);
        // console.log("Decoded:", decoded);
        if (data.data.roles[0] === "ROLE_ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    }
  }, [isSuccess]);
  const handleSignIn = () => {
    mutation.mutate({
      username: username,
      password: password,
    });
  };
  const mutationSignUp = new useMutation({
    mutationFn: (data) => userService.register(data),
    onSuccess: (data) => {
      console.log("Data:", data.data);
      setEmailSingUp("");
      setUsernameSingUp("");
      setPasswordSingUp("");
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
  const handleSignUp = () => {
    mutationSignUp.mutate({
      username: usernameSingUp,
      email: emailSingUp,
      password: passwordSingUp,
    });
  };
  const mutationLogout = useMutation({
    mutationFn: (refreshToken) => userService.logout({ token: refreshToken }), // Truyền refresh token vào
    onSuccess: () => {
      console.log("Logout successful");
      // Xóa các token và thông tin đăng nhập từ localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      // Cập nhật trạng thái đăng xuất
      setIsLoggedIn(false);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error during logout:", error);
    },
  });

  // Hàm handleLogout để gọi khi người dùng nhấn nút đăng xuất
  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      mutationLogout.mutate(refreshToken); // Gọi mutate với refresh token
    } else {
      console.error("No refresh token found");
    }
  };
  const handleLogin = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOkLogin = (values) => {
    console.log("Success:", values);
    setIsModalVisible(false);
  };
  const handleOkRegister = (values) => {
    console.log("Success:", values);
    setIsModalVisible(false);
  };
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleCart = () => {
    const userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
  };
  const handleOrder = () => {
    const userId = localStorage.getItem("userId");
    navigate(`/orderdetail/${userId}`);
  };
  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={"public/logo.png"} alt="Logo" />
          </Link>
        </div>
        <div className="header-actions">
          {isLoggedIn ? (
            <>
              <button className="login-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
              &nbsp;
              <button className="login-btn" onClick={handleOrder}>
                Đơn mua
              </button>
              &nbsp;
              <button className="cart-btn" onClick={handleCart}>
                <img src="public/shopping-cart.gif" alt="" />
              </button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={handleLogin}>
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </div>
      <Modal
        title="Đăng Nhập / Đăng Ký"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Đăng Nhập" key="1">
            <Form onFinish={handleOkLogin}>
              <Form.Item
                label="Tài khoản"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tài khoản!" },
                ]}
                value={username}
                onChange={handleChangUsername}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                value={password}
                onChange={handleChangePassword}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  onClick={handleSignIn}
                >
                  Đăng Nhập
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Đăng Ký" key="2">
            <Form onFinish={handleOkRegister}>
              <Form.Item
                label="Tài khoản"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tài khoản!" },
                ]}
                value={usernameSingUp}
                onChange={handleChangUsernameSignUp}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                value={emailSingUp}
                onChange={handleChangeEmailSignUp}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                value={passwordSingUp}
                onChange={handleChangePasswordSignUp}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirm"
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  onClick={handleSignUp}
                >
                  Đăng Ký
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </header>
  );
}

export default HeaderComponent;
