import { Row, Col } from "antd";

const FeatureSection = () => {
  return (
    <Row>
      <Col span={20} offset={2}>
        <Row>
          <Col span={8} className="center-content">
            <img
              src="public/books.gif"
              style={{ width: "300px" }}
              alt="Books"
            />
            <h2>
              Chúng tôi cung cấp nhiều thể loại sách, đa dạng các phiên bản, hứa
              hẹn sẽ làm đọc giả thỏa thích lựa chọn
            </h2>
          </Col>
          <Col span={8} className="center-content">
            <img
              src="public/cashback.gif"
              style={{ width: "300px" }}
              alt="Cashback"
            />
            <h2>
              Chúng tôi đảm bảo chất lượng sách luôn đảm bảo, nếu có sai sót
              chúng tôi sẽ hoàn tiền một cách minh bạch
            </h2>
          </Col>
          <Col span={8} className="center-content">
            <img
              src="public/delivery-truck.gif"
              style={{ width: "300px" }}
              alt="Delivery"
            />
            <h2>
              Với dịch vụ vận chuyển đa dạng, chúng tôi sẽ đem sách đến cho bạn
              với thời gian cực kỳ nhanh chóng
            </h2>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FeatureSection;
