import { useState } from "react";
import {
  Table,
  Button,
  Pagination,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  message,
} from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import * as adminService from "../../services/adminService";
import axios from "axios";
import "./AdminPage.css";

const LIMIT = 8;
function AdminPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // State để lưu URL hình ảnh

  // Fetch data
  const fetchApi = async (page) => {
    const response = await axios.get(
      `http://localhost:8080/api/book/getallbooks?page=${page}`
    );
    return response.data;
  };

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => adminService.getAllCategories(),
  });

  const mutationCreate = useMutation({
    mutationFn: (data) => adminService.createBook(data),
    onSuccess: () => {
      message.success("Tạo sách thành công");
    },
    onError: (error) => {
      console.error(error);
      message.error("Tạo sách thất bại");
    },
  });
  const mutationEditBook = useMutation({
    mutationFn: (book) => adminService.editBook(book.id, book),
    onSuccess: (data) => {
      console.log("Dữ liệu phản hồi từ server:", data); // In ra phản hồi từ server
      message.success("Chỉnh sửa sách thành công");
      setIsModalVisible(false);
    },
    onError: (error) => {
      console.error(error);
      message.error("Chỉnh sửa sách thất bại");
    },
  });

  const { isError, isLoading, data } = useQuery({
    queryKey: ["books", currentPage],
    queryFn: () => fetchApi(currentPage),
  });

  const mutationDeleteBook = useMutation({
    mutationFn: (id) => adminService.deleteBook(id),
    onSuccess: () => {
      message.success("Xóa danh mục thành công!");
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi xóa danh mục!");
    },
  });
  const handleDeleteBook = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa danh mục này?",
      onOk: () => {
        mutationDeleteBook.mutate(id);
      },
    });
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const showEditModal = (product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const handleEditSubmit = (values) => {
    if (!editingProduct || !editingProduct._id) {
      console.error("ID không hợp lệ:", editingProduct);
      return;
    }
    const updatedProduct = { id: editingProduct._id, ...values }; // Đảm bảo sử dụng _id
    mutationEditBook.mutate(updatedProduct);
  };
  const handleCreate = () => {
    setIsModalCreate(true);
    setUploadedImageUrl(null); // Reset URL hình ảnh khi mở modal tạo sản phẩm
  };

  const handleCreateSubmit = (values) => {
    const data = {
      ...values,
      image: uploadedImageUrl, // Thêm URL của ảnh vào dữ liệu gửi đi
    };
    mutationCreate.mutate(data);
    setIsModalCreate(false);
  };

  const handleCancelCreate = () => {
    setIsModalCreate(false);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading data...</h1>;
  }

  const handleImageUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = response.data.imageUrl;
      setUploadedImageUrl(imageUrl); // Lưu lại URL hình ảnh
      onSuccess(imageUrl); // Gọi onSuccess sau khi upload thành công
      message.success("Tải lên hình ảnh thành công");
      console.log("Uploaded image URL:", imageUrl);
    } catch (error) {
      onError(error); // Gọi onError nếu có lỗi
      message.error("Tải lên hình ảnh thất bại");
      console.error("Error uploading image:", error);
    }
  };

  const bookData = Array.isArray(data.data) ? data.data : [];
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="book"
          style={{ width: "80px", height: "100px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Tên sách",
      dataIndex: "book_name",
      key: "book_name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} VND`,
    },
    {
      title: "Số lượng trong kho",
      dataIndex: "countInStock",
      key: "countInStock",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => showEditModal(record)}
            style={{
              marginRight: "8px",
              backgroundColor: "orange",
              marginBottom: "20px",
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            type="danger"
            onClick={() => handleDeleteBook(record._id)}
            style={{ backgroundColor: "#f33135" }}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh sách sản phẩm</h1>
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={handleCreate}
      >
        <PlusOutlined />
        Thêm sách
      </Button>
      <Table
        columns={columns}
        dataSource={bookData}
        rowKey="_id"
        pagination={false}
      />
      <Pagination
        align="center"
        current={currentPage}
        total={data?.totalItems}
        pageSize={LIMIT}
        onChange={(page) => onPageChange(page)}
      />

      {/* Modal chỉnh sửa sản phẩm */}
      <Modal
        title="Chỉnh sửa sản phẩm"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {editingProduct && (
          <Form initialValues={editingProduct} onFinish={handleEditSubmit}>
            <Form.Item
              label="Tên sách"
              name="book_name"
              rules={[{ required: true, message: "Vui lòng nhập tên sách!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Loại sách"
              name="category"
              rules={[{ required: true, message: "Vui lòng chọn loại sách!" }]}
            >
              <Select>
                {categoriesData &&
                  categoriesData.data.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.category_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Tác giả"
              name="author"
              rules={[
                { required: true, message: "Vui lòng nhập tên tác giả!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="NXB"
              name="publisher"
              rules={[
                { required: true, message: "Vui lòng nhập nhà xuất bản!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Đơn giá"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập đơn giá!" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[{ required: true, message: "Vui lòng nhập giảm giá!" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Số lượng trong kho"
              name="countInStock"
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[
                { required: true, message: "Vui lòng tải lên hình ảnh!" },
              ]}
            >
              <Upload maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Modal tạo sản phẩm */}
      <Modal
        title="Tạo sản phẩm mới"
        open={isModalCreate}
        onCancel={handleCancelCreate}
        footer={null}
      >
        <Form onFinish={handleCreateSubmit}>
          <Form.Item
            label="Tên sách"
            name="book_name"
            rules={[{ required: true, message: "Vui lòng nhập tên sách!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại sách"
            name="category"
            rules={[{ required: true, message: "Vui lòng chọn loại sách!" }]}
          >
            <Select>
              {categoriesData &&
                categoriesData.data.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.category_name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Tác giả"
            name="author"
            rules={[{ required: true, message: "Vui lòng nhập tên tác giả!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="NXB"
            name="publisher"
            rules={[{ required: true, message: "Vui lòng nhập nhà xuất bản!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Đơn giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập đơn giá!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Vui lòng nhập giảm giá!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Số lượng trong kho"
            name="countInStock"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: "Vui lòng tải lên hình ảnh!" }]}
          >
            <Upload
              maxCount={1}
              customRequest={handleImageUpload} // Sử dụng customRequest
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminPage;
