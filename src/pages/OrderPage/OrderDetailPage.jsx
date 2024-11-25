import { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  List,
  Spin,
  Button,
  Modal,
  message,
} from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as userService from "../../services/userService";
import * as adminService from "../../services/adminService";
import "./OrderPage.css";

const { Title, Text } = Typography;

function OrderDetailPage() {
  const userId = localStorage.getItem("userId");
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => userService.getOrderByUser(userId),
  });
  const mutationCancle = useMutation({
    mutationFn: (order) => adminService.updateOrder(order.id, order),
    onSuccess: () => {
      console.log("Cập nhật đơn hàng thành công");
      message.success("Hủy đơn hàng thành công");
      setIsModalVisible(false); // Đóng modal khi thành công
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleCancelOrder = (id) => {
    setCurrentOrderId(id);
    setIsModalVisible(true); // Mở modal xác nhận
  };

  const handleOk = () => {
    if (currentOrderId) {
      mutationCancle.mutate({
        id: currentOrderId,
        status: "Đã hủy",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Đóng modal khi người dùng chọn hủy
  };

  if (isLoading) {
    return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  }

  if (isError) {
    return (
      <Title level={3} style={{ textAlign: "center", color: "red" }}>
        Lỗi
      </Title>
    );
  }

  return (
    <Layout style={{ padding: "100px 100px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Đơn mua
      </Title>
      {orders.length === 0 ? (
        <Text style={{ textAlign: "center", display: "block" }}>
          No orders found.
        </Text>
      ) : (
        <Row gutter={16}>
          {orders.map((order) => (
            <Col span={24} key={order._id}>
              <Card style={{ marginBottom: "20px" }}>
                <Title level={4}>Mã đơn hàng: {order._id}</Title>
                <Divider />
                <Text strong>Tên khách hàng:</Text> <Text>{order.name}</Text>
                <br />
                <Text strong>Địa chỉ:</Text> <Text>{order.address}</Text>
                <br />
                <Text strong>Số điện thoại:</Text> <Text>{order.phone}</Text>
                <br />
                <Text strong>Phí vận chuyển:</Text>{" "}
                <Text>{order.shippingPrice} VND</Text>
                <br />
                <Text strong>Tổng tiền:</Text>{" "}
                <Text>{order.totalPrice} VND</Text>
                <br />
                <Text strong>Trạng thái:</Text> <Text>{order.status}</Text>
                <br />
                <Text strong>Ngày mua:</Text>{" "}
                <Text>{new Date(order.createdAt).toLocaleString()}</Text>
                <Divider />
                <Title level={5}>Danh sách sản phẩm:</Title>
                <List
                  dataSource={order.OrderItem}
                  renderItem={(item) => (
                    <List.Item>
                      <Text>
                        Tên sách: {item.bookId.book_name};
                        <br />
                        Số lượng: {item.quantity}
                      </Text>
                    </List.Item>
                  )}
                />
                <Button
                  type="primary"
                  danger
                  onClick={() => handleCancelOrder(order._id)}
                  disabled={
                    order.status === "Đã giao" || order.status === "Đã hủy"
                  }
                >
                  Hủy đơn
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal
        title="Xác Nhận Hủy Đơn Hàng"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
      </Modal>
    </Layout>
  );
}

export default OrderDetailPage;
