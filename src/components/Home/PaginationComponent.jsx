import { Pagination } from "antd";

const PaginationComponent = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  return (
    <Pagination
      style={{ marginTop: "30px " }}
      align="center"
      current={currentPage}
      total={totalItems}
      pageSize={pageSize}
      onChange={onPageChange}
    />
  );
};

export default PaginationComponent;
