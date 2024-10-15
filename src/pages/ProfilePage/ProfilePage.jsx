import React from "react";
import {
  Layout,
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Row,
  Col,
  Avatar,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
const { Header, Content, Footer } = Layout;

function ProfilePage() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form data:", values);
    // Xử lý lưu dữ liệu ở đây
  };
  return (
    <div>
      <Layout className="layout">
        <Content style={{ padding: "50px 50px" }}>
          <Row justify="center">
            <Col xs={24} sm={16} md={12} lg={8}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  username: "Hồ Huy Hào",
                  email: "huyhao@gmail.com",
                  phone: "0123456789",
                  address: "Hưng Lợi Ninh Kiều Cần Thơ",
                }}
              >
                <Form.Item
                  name="username"
                  label="Họ tên"
                  rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Họ tên" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "Vui lòng nhập E-mail!",
                    },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="E-mail" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    {
                      type: "phone",
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Số điện thoại"
                  />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập E-mail!",
                    },
                  ]}
                >
                  <Input prefix={<HomeOutlined />} placeholder="Địa chỉ" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: "10px" }}
                  >
                    Lưu thông tin
                  </Button>
                  <Link to="/">
                    <Button>Hủy</Button>
                  </Link>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default ProfilePage;
