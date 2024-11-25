import { Drawer, Button, Space, InputNumber } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as userService from "../../services/userService";
import { message } from "antd";

const BookDrawer = ({ book, open, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const mutation = useMutation({
    mutationFn: ({ bookId, quantity, userId }) =>
      userService.addToCart({ bookId, quantity, userId }),
    onSuccess: () => message.success("Thêm vào giỏ hàng thành công"),
    onError: () => message.error("Bạn chưa đăng nhập hoặc có lỗi xảy ra"),
  });

  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId");
    mutation.mutate({ bookId: book._id, quantity, userId });
    onClose();
  };

  return (
    <Drawer title="Thông tin sách" onClose={onClose} open={open}>
      <h2>
        <strong>Tên sách: {book.book_name}</strong>
      </h2>
      <img
        src={book.image}
        style={{ width: "100%", height: "350px", objectFit: "cover" }}
      />
      <br />
      <br />
      <br />
      <h3>Tác giả: {book.author}</h3>
      <p>Thể loại: {book.category.category_name}</p>
      <p>Nhà xuất bản: {book.publisher}</p>
      <p>Giá: {book.price}đ</p>
      <Space>
        <InputNumber min={1} value={quantity} onChange={setQuantity} />
        <Button type="primary" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </Button>
      </Space>
      <br />
      <br />
      <i
        style={{
          fontSize: "15px", // Tăng kích thước chữ
          color: "#333", // Màu chữ dễ đọc
          lineHeight: "1.5", // Khoảng cách giữa các dòng
        }}
      >
        {book.description}
      </i>
    </Drawer>
  );
};

export default BookDrawer;
