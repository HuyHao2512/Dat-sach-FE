/* eslint-disable no-unused-vars */
import React from "react";
import { Table, Spin, Alert, Button, Form } from "antd"; // Import các thành phần cần thiết từ Ant Design
import * as adminService from "../../services/adminService";
import { useQuery, useMutation } from "@tanstack/react-query";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
import { useState } from "react";
function OrderPageAdmin() {
  const { isError, isLoading, data } = useQuery({
    queryKey: ["orders"], // Cập nhật queryKey thành "orders"
    queryFn: () => adminService.getAllOrders(), // Gọi hàm lấy danh sách đơn hàng
  });
  const mutationUpdate = new useMutation({
    mutationFn: (order) => adminService.updateOrder(order.id, order),
    onSuccess: () => {
      console.log("Cập nhật đơn hàng thành công");
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [form] = Form.useForm();

  const showModal = (id, currentStatus) => {
    setCurrentOrderId(id);
    form.setFieldsValue({ status: currentStatus });
    setIsModalVisible(true);
  };
  const handleOk = async () => {
    const values = await form.validateFields();
    console.log("Updating order ID:", currentOrderId); // Log ID
    mutationUpdate.mutate({
      id: currentOrderId,
      status: values.status,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Nếu đang loading, hiển thị loading spinner
  if (isLoading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (isError) {
    return (
      <Alert message="Có lỗi xảy ra trong việc tải đơn hàng" type="error" />
    );
  }

  // Cấu hình các cột của bảng
  const columns = [
    {
      title: "Mã Đơn Hàng",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Giá Giao Hàng",
      dataIndex: "shippingPrice",
      key: "shippingPrice",
      render: (text) => `${text}đ`, // Định dạng giá
    },
    {
      title: "Tổng Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `${text}đ`, // Định dạng giá
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ngày Mua",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(), // Định dạng ngày
    },
    {
      title: "Cập nhật",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => showModal(record._id, record.status)}
        >
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản Lý Đơn Hàng</h1>
      <Table
        dataSource={data} // Dữ liệu từ API
        columns={columns} // Các cột đã cấu hình
        rowKey="_id" // Khóa duy nhất cho từng hàng
        pagination={{ pageSize: 10 }} // Phân trang
      />
      <Modal
        title="Chỉnh sửa trạng thái đơn hàng"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
              <Select.Option value="Đang vận chuyển">
                Đang vận chuyển
              </Select.Option>
              <Select.Option value="Đã giao">Đã giao</Select.Option>
              <Select.Option value="Đã hủy">Đã hủy</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default OrderPageAdmin;
