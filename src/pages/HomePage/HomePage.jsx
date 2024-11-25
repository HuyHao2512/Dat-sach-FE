import { Divider, Row, Col, Menu } from "antd";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HeaderSection from "../../components/Home/HeaderSection";
import FeatureSection from "../../components/Home/FeatureSection";
import BookList from "../../components/Home/BookList";
import PaginationComponent from "../../components/Home/PaginationComponent";
import "./HomePage.css";
import {
  FilterOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

const LIMIT = 8;

const items = [
  {
    label: "Lọc",
    key: "SubMenu",
    icon: <FilterOutlined />,
    children: [
      {
        type: "group",
        label: "Lọc theo giá",
        children: [
          {
            label: "Giá tăng dần",
            key: "setting:1",
            icon: <ArrowUpOutlined />,
          },
          {
            label: "Giá giảm dần",
            key: "setting:2",
            icon: <ArrowDownOutlined />,
          },
        ],
      },
      {
        type: "group",
        label: "Lọc theo tên",
        children: [
          {
            label: "A-Z",
            key: "setting:3",
            icon: <SortAscendingOutlined />,
          },
          {
            label: "Z-A",
            key: "setting:4",
            icon: <SortDescendingOutlined />,
          },
        ],
      },
    ],
  },
];

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [current, setCurrent] = useState("mail");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const booksRef = useRef(null);

  const fetchApi = async (page, sortBy, sortOrder) => {
    const response = await axios.get(
      `http://localhost:8080/api/book/getallbooks?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    );
    return response;
  };

  const { isError, isLoading, data } = useQuery({
    queryKey: ["books", currentPage, sortBy, sortOrder],
    queryFn: () => fetchApi(currentPage, sortBy, sortOrder),
  });
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data. Please try again.</div>;
  }

  const handleExploreClick = () => {
    if (booksRef.current) {
      booksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    let newSortBy;
    let newSortOrder;

    // Determine sortBy and sortOrder based on the selected menu item
    if (e.key === "setting:1" || e.key === "setting:2") {
      newSortBy = "price"; // Sort by price
      newSortOrder = e.key === "setting:1" ? "asc" : "desc"; // Ascending or descending
    } else if (e.key === "setting:3" || e.key === "setting:4") {
      newSortBy = "name"; // Sort by name
      newSortOrder = e.key === "setting:3" ? "asc" : "desc"; // A-Z or Z-A
    }

    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to the first page when sorting changes
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
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <br />
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
