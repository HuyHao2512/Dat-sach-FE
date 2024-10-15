import React from "react";
import "./Footer.css";
function FooterComponent() {
  return (
    <div>
      <footer className="footer">
        <div className="grid wide footer__content">
          <div className="row">
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">CHĂM SÓC KHÁCH HÀNG</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    Trung Tâm Trợ Giúp
                  </a>
                </li>
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    Hướng Dẫn Mua Hàng
                  </a>
                </li>
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    Chính Sách Vận Chuyển
                  </a>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">VỀ CHÚNG TÔI</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    Giới Thiệu Về Shop
                  </a>
                </li>
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    Tuyển Dụng
                  </a>
                </li>
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    Điều Khoản Shop
                  </a>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">DANH MỤC</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    Sách
                  </a>
                </li>
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    Truyện
                  </a>
                </li>
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    Tiểu thuyết
                  </a>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">THEO DÕI CHÚNG TÔI TRÊN</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    <i className="footer-item__icon fab fa-facebook-square"></i>
                    Facebook
                  </a>
                </li>
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    <i className="footer-item__icon fab fa-instagram-square"></i>
                    Instagram
                  </a>
                </li>
                <li className="footer-item">
                  <a href="#" className="footer-item__link">
                    <i className="footer-item__icon fab fa-linkedin"></i>
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FooterComponent;
