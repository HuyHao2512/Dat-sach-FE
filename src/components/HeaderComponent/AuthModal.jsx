import React, { useState, useEffect } from "react";
import { Modal, Tabs, Form, Input, Button, message } from "antd";
import * as userService from "../../services/userService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

const AuthModal = ({ isVisible, onCancel, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameSignUp, setUsernameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (data) => userService.login(data),
    onSuccess: (data) => {
      console.log("Data:", data.data);
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("username", JSON.stringify(data.data.username));
      localStorage.setItem("userId", data.data.id);
      localStorage.setItem("roles", JSON.stringify(data.data.roles));
      localStorage.setItem("user", JSON.stringify(data.data));
      setIsLoggedIn(true);
      message.success("Đăng nhập thành công");
      if (data.data.roles[0] === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      onCancel();
      onLoginSuccess();
    },
    onError: (error) => {
      console.error("Error:", error);
      message.error("Đăng nhập thất bại");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data) => userService.register(data),
    onSuccess: () => {
      setUsernameSignUp("");
      setPasswordSignUp("");
      setEmailSignUp("");
      message.success("Đăng ký thành công");
    },
    onError: (error) => {
      console.error("Error:", error);
      message.error("Đăng ký thất bại");
    },
  });

  const handleSignIn = () => {
    loginMutation.mutate({
      username: username,
      password: password,
    });
  };

  const handleSignUp = () => {
    signUpMutation.mutate({
      username: usernameSignUp,
      email: emailSignUp,
      password: passwordSignUp,
    });
  };

  return (
    <Modal
      title="Đăng Nhập / Đăng Ký"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Đăng Nhập" key="1">
          <Form onFinish={handleSignIn}>
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
            >
              <Input onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Đăng Ký" key="2">
          <Form onFinish={handleSignUp}>
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
            >
              <Input onChange={(e) => setUsernameSignUp(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input onChange={(e) => setEmailSignUp(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                onChange={(e) => setPasswordSignUp(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Đăng Ký
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;
