/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AreaChartOutlined,
  DatabaseOutlined,
  PicLeftOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Col, Row } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import * as userService from "../../services/userService";
import { useMutation, useQuery } from "@tanstack/react-query";
import "./LayoutComponent.css";
const { Header, Sider, Content } = Layout;

const LIMIT = 8;
function LayoutComponent() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      handleLogout();
    } else {
      navigate(e.key);
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      mutationLogout.mutate(refreshToken); // Gọi mutate với refresh token
    } else {
      console.error("No refresh token found");
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="sider-content">
          <img src="/personnel.gif" style={{ height: "90px" }} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/admin"]}
          onClick={handleMenuClick}
          items={[
            {
              key: "/admin/dashboard",
              icon: <DatabaseOutlined />,
              label: "Danh mục sách",
            },
            {
              key: "/admin/category",
              icon: <PicLeftOutlined />,
              label: "Danh mục loại sách",
            },
            {
              key: "/admin/order",
              icon: <AreaChartOutlined />,
              label: "Đơn hàng",
            },
            {
              key: "logout", // Đặt key cho nút đăng xuất
              icon: <LogoutOutlined />,
              label: "Đăng xuất",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          {/* Kiểm tra nếu Outlet chưa có route nào được render, hiển thị dòng chữ Admin */}
          {location.pathname === "/admin" ? (
            <div>
              <img
                src="public/Vanilla@1x-1.0s-278px-251px.svg"
                alt="Logo"
                style={{
                  width: "70%",
                  paddingLeft: "400px",
                }}
              />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutComponent;
