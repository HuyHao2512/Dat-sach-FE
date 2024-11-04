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
      <h3>Tên sách: {book.book_name}</h3>
      <p>Nhà xuất bản: {book.publisher}</p>
      <p>Giá: {book.price}đ</p>
      <p>Mô tả: {book.description}</p>
      <Space>
        <InputNumber min={1} value={quantity} onChange={setQuantity} />
        <Button type="primary" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </Button>
      </Space>
    </Drawer>
  );
};

export default BookDrawer;
