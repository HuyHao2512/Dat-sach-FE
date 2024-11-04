import React from "react";
import "./HeaderSection.css";
const HeaderSection = ({ onExploreClick }) => {
  return (
    <div className="flex-container">
      <div className="text-center">
        <h1>
          <span className="fade-in" id="digit1" style={{ fontWeight: "bold" }}>
            CHÀO&nbsp;
          </span>
          <span className="fade-in" id="digit2" style={{ fontWeight: "bold" }}>
            MỪNG&nbsp;
          </span>
          <span className="fade-in" id="digit3" style={{ fontWeight: "bold" }}>
            BẠN
          </span>
        </h1>
        <h3
          className="fadeIn"
          style={{
            fontSize: "50px",
          }}
        >
          <img src="public/book.png" style={{ height: "60px" }} /> ĐẾN VỚI NHÀ
          SÁCH PHƯƠNG NAM{" "}
          <img src="public/book.png" style={{ height: "60px" }} />
        </h3>
        <button type="button" name="button" onClick={onExploreClick}>
          KHÁM PHÁ NGAY
        </button>
      </div>
    </div>
  );
};

export default HeaderSection;
