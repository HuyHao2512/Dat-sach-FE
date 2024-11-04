import { Card } from "antd";
import { useState } from "react";
import BookDrawer from "./BookDrawer";
const BookCard = ({ book }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div
      style={{
        marginLeft: "30px",
        width: "200px",
      }}
    >
      <Card hoverable onClick={showDrawer}>
        <img
          src={book.image}
          alt=""
          style={{ height: "150px", width: "100%", objectFit: "cover" }}
        />
        <h3 className="title-book">{book.book_name}</h3>
        <p className="title-book">Tác giả: {book.author}</p>
        <p>Xem chi tiết</p>
      </Card>
      <BookDrawer book={book} open={open} onClose={onClose} />
    </div>
  );
};

export default BookCard;
