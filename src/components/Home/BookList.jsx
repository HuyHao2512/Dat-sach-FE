import { Row, Col } from "antd";
import BookCard from "./BookCart";

const BookList = ({ isLoading, isError, books }) => {
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError) {
    return <h1>Error loading books</h1>;
  }

  return (
    <Row gutter={[16, 16]}>
      {books.map((book) => (
        <Col span={6} xs={24} sm={12} md={8} lg={6} key={book._id}>
          <BookCard book={book} />
        </Col>
      ))}
    </Row>
  );
};

export default BookList;
