// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Form, Input, message } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as adminService from "../../services/adminService";
import "./CategoryPage.css";

function CategoryPage() {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal cho tạo loại
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Modal cho chỉnh sửa
  const [editingCategory, setEditingCategory] = useState(null); // Category đang chỉnh sửa

  const { isError, isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => adminService.getAllCategories(),
  });
  const mutationCreateCategory = new useMutation({
    mutationFn: (data) => adminService.createCategory(data),
    onSuccess: () => {
      console.log("Tạo loại sách thành công");
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
  const editCategoryMutation = useMutation({
    mutationFn: (category) => adminService.editCategory(category.id, category), // Sử dụng hàm editCategory
    onSuccess: () => {
      // Có thể thực hiện các hành động sau khi thành công, như refetch dữ liệu
      console.log("Chỉnh sửa loại sách thành công");
      setIsEditModalVisible(false);
      setEditingCategory(null);
    },
    onError: (error) => {
      console.error("Error updating category:", error);
    },
  });
  const deleteCategoryMutation = useMutation({
    mutationFn: (id) => adminService.deleteCategory(id),
    onSuccess: () => {
      message.success("Xóa danh mục thành công!");
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi xóa danh mục!");
    },
  });
  const handleAddCategorySubmit = (values) => {
    console.log("Tạo loại sách mới với thông tin:", values);
    mutationCreateCategory.mutate(values);
    setIsModalVisible(false);
  };
  const handleEditCategorySubmit = (values) => {
    if (!editingCategory || !editingCategory._id) {
      console.error("ID không hợp lệ:", editingCategory);
      return;
    }
    const updatedCategory = { id: editingCategory._id, ...values }; // Đảm bảo sử dụng _id
    editCategoryMutation.mutate(updatedCategory);
  };

  const handleAddCategory = () => {
    setIsModalVisible(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsEditModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEditingCategory(null);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading categories...</h1>;
  }
  const handleDeleteCategory = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa danh mục này?",
      onOk: () => {
        deleteCategoryMutation.mutate(id);
      },
    });
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên loại sách",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleEditCategory(record)}
            style={{
              marginRight: "8px",
              backgroundColor: "orange",
              marginBottom: "20px",
            }}
          >
            Sửa
          </Button>
          <Button
            type="danger"
            style={{ backgroundColor: "#f33135" }}
            onClick={() => handleDeleteCategory(record._id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Loại sách</h1>
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={handleAddCategory}
      >
        <PlusOutlined />
        Thêm loại sách
      </Button>
      <Table columns={columns} dataSource={data?.data} rowKey="_id" />

      {/* Modal thêm loại sách */}
      <Modal
        title="Thêm loại sách"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form onFinish={handleAddCategorySubmit}>
          <Form.Item
            label="Tên loại sách"
            name="category_name"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại sách!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal chỉnh sửa loại sách */}
      <Modal
        title="Chỉnh sửa loại sách"
        open={isEditModalVisible}
        onCancel={handleEditModalCancel}
        footer={null}
      >
        {editingCategory && (
          <Form
            initialValues={editingCategory}
            onFinish={handleEditCategorySubmit}
          >
            <Form.Item
              label="Tên loại sách"
              name="category_name"
              rules={[
                { required: true, message: "Vui lòng nhập tên loại sách!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default CategoryPage;
