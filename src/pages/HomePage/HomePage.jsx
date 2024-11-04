import { Divider, Row, Col } from "antd";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HeaderSection from "../../components/Home/HeaderSection";
import FeatureSection from "../../components/Home/FeatureSection";
import BookList from "../../components/Home/BookList";
import PaginationComponent from "../../components/Home/PaginationComponent";
import "./HomePage.css";

const LIMIT = 8;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const booksRef = useRef(null);

  const fetchApi = async (page) => {
    const response = await axios.get(
      `http://localhost:8080/api/book/getallbooks?page=${page}`
    );
    return response; // Make sure to return the data directly
  };

  const { isError, isLoading, data } = useQuery({
    queryKey: ["books", currentPage],
    queryFn: () => fetchApi(currentPage),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error fetching data:", error);
    return <h1>Error</h1>;
  }
  const handleExploreClick = () => {
    if (booksRef.current) {
      booksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <HeaderSection onExploreClick={handleExploreClick} />
      <div ref={booksRef}>
        <FeatureSection />
        <Divider style={{ borderColor: "#4fb0dc" }}>
          <h1>
            Có thể bạn thích{" "}
            <img
              src="public/library.gif"
              style={{ height: "60px" }}
              alt="Library Icon"
            />
          </h1>
        </Divider>
        <Row>
          <Col span={20} offset={2}>
            <BookList
              isLoading={isLoading}
              isError={isError}
              books={data?.data?.data || []}
            />
          </Col>
        </Row>
        <PaginationComponent
          currentPage={currentPage}
          totalItems={data?.data?.totalItems}
          pageSize={LIMIT}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default HomePage;
