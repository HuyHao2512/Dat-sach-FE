// OrderAddress.js
import React from "react";
import { Button, Modal, Input, Form } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const OrderAddress = ({
  name,
  phone,
  address,
  showModal,
  setName,
  setPhone,
  setAddress,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  return (
    <div className="order-address">
      <h2 style={{ color: "orange" }}>
        <HomeOutlined />
        &nbsp; Địa chỉ nhận hàng
      </h2>
      <h3 style={{ fontWeight: "600" }}>
        {name} {phone}
      </h3>
      <p>{address}</p>
      {address && name && phone ? (
        <Button onClick={showModal}>Thay đổi thông tin nhận hàng</Button>
      ) : (
        <Button onClick={showModal}>Thêm địa chỉ nhận hàng</Button>
      )}
      <Modal
        title="Chỉnh sửa địa chỉ nhận hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Tên người nhận">
            <Input
              placeholder="Nhập thông tin người nhận"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input
              placeholder="Nhập địa chỉ mới"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderAddress;
