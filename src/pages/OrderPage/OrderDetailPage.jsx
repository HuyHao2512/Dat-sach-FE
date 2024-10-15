import React from "react";
import { Layout, Row, Col, Card, Typography, Divider, List } from "antd";
import "./OrderPage.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const order = {
  customerName: "Hồ Huy Hào 0123456789",
  address: "Hưng Lợi Ninh Kiều Cần Thơ",
  status: "Đang giao hàng",
  totalAmount: 300000,
  products: [
    {
      id: 1,
      name: "Tôi thấy hoa vàng trên cỏ xanh",
      image: "public/sach1.jpg",
      quantity: 2,
      price: 100000,
    },
    {
      id: 2,
      name: "Tôi thấy hoa vàng trên cỏ xanh",
      image: "public/sach1.jpg",
      quantity: 1,
      price: 100000,
    },
  ],
};

function OrderDetailPage() {
  return (
    <Layout className="layout">
      <Divider orientation="center">
        <h1>Đơn mua</h1>
      </Divider>
      <Content style={{ padding: "50px 50px" }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            <Card>
              <Title level={3}>Thông tin đơn hàng</Title>
              <Text>
                <strong>Người nhận:</strong> {order.customerName}
              </Text>
              <br />
              <Text>
                <strong>Địa chỉ:</strong> {order.address}
              </Text>
              <br />
              <Text>
                <strong>Trạng thái:</strong> {order.status}
              </Text>
              <Divider />
              <Title level={3}>Chi tiết đơn hàng</Title>
              <List
                itemLayout="horizontal"
                dataSource={order.products}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "100px", height: "100px" }}
                        />
                      }
                      title={item.name}
                      description={`Số lượng: ${item.quantity} | Đơn giá: ${item.price}`}
                    />
                    <div>
                      <Text strong>
                        Thành tiền: {item.quantity * item.price}
                      </Text>
                    </div>
                  </List.Item>
                )}
              />
              <Divider />
              <Row justify="end">
                <Col>
                  <p>Phí vận chuyển: 30000</p>
                  <Text strong>Tổng cộng: {order.totalAmount + 30000}</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default OrderDetailPage;
