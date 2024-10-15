import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

function RegisterPage() {
  const [form] = Form.useForm();
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const handleSubmit = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (_, value) => {
    if (value && value !== form.getFieldValue("password")) {
      return Promise.reject("Two passwords that you enter is inconsistent!");
    }
    return Promise.resolve();
  };

  const validateToNextPassword = (_, value) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"]);
    }
    return Promise.resolve();
  };

  const handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        (domain) => `${value}${domain}`
      );
    }
    setAutoCompleteResult(autoCompleteResult);
  };

  const prefixSelector = (
    <Form.Item name="prefix" initialValue="86" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const websiteOptions = autoCompleteResult.map((website) => (
    <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
  ));

  return (
    <Row>
      <Col span={12} offset={6}>
        <div className="content-register">
          <div className="form-register">
            <h1>Đăng ký</h1>
            <div>
              <Form
                form={form}
                onFinish={handleSubmit}
                layout="horizontal"
                initialValues={{ prefix: "86" }}
              >
                <Form.Item
                  label="Họ tên"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="E-mail"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Vui lòng nhập đúng định dạng",
                    },
                    { required: true, message: "Vui lòng nhập E-mail!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  hasFeedback
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                    { validator: validateToNextPassword },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Xác nhận mật khẩu"
                  name="confirm"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập lại mật khẩu",
                    },
                    { validator: compareToFirstPassword },
                  ]}
                >
                  <Input.Password onBlur={handleConfirmBlur} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      required: true,
                      message: "Bạn phải đòng ý với chính sách!",
                    },
                  ]}
                >
                  <Checkbox>
                    Tôi đồng ý với <Link to="/policy">chính sách</Link>
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Đăng ký
                  </Button>
                </Form.Item>
                <p>
                  Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default RegisterPage;
