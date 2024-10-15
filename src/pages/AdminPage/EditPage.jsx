import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import "./EditPage.css";
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
function EditPage() {
  const [componentDisabled, setComponentDisabled] = useState(true);
  return (
    <div className="edit-content">
      <div style={{ marginLeft: "0" }}>
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          style={{
            width: "500px",
          }}
        >
          <Form.Item label="Tên sách">
            <Input value="Tôi thấy hoa vàng trên cỏ xanh" />
          </Form.Item>
          <Form.Item label="Loại sách">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Tác giả">
            <Input value="Tôi thấy hoa vàng trên cỏ xanh" />
          </Form.Item>
          <Form.Item label="Nhà xuất bản">
            <Input value="Tôi thấy hoa vàng trên cỏ xanh" />
          </Form.Item>
          <Form.Item label="Giá">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Số lượng trong kho">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Chi tiết">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ marginLeft: "170px" }}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default EditPage;
