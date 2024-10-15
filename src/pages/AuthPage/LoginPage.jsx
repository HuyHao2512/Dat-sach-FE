import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./LoginPage.css";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const handleChangUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
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
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
  const token = localStorage.getItem("access_token");
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

  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <div className="content-login">
            <div className="form-login">
              <h1>Đăng nhập</h1>
              <div>
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập username!",
                      },
                    ]}
                    value={username}
                    onChange={handleChangUsername}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu",
                      },
                    ]}
                    value={password}
                    onChange={handleChangePassword}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Checkbox>Ghi nhớ tôi</Checkbox>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleSignIn}
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <p>
                Bạn chưa có tài khoản ?{" "}
                <Link to="/register">
                  <Button htmlType="submit">Đăng ký</Button>
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
