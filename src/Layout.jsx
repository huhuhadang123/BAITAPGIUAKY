import "./assets/css/layout.css";
import logo from "./assets/images/Ten-truong-do-1000x159.png";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <html>
      <header>
        <link rel="stylesheet" href="assets/css/layout.css" />

        <div id="header" className="header">
          <div id="banner" className="banner">
            <div id="divmenutrai">
              <nav id="menutrai">
                <ul className="menutrai" style={{ width: "250px" }}>
                  <li>
                    <a href="/" class="menutrai">
                      TRANG CHU
                    </a>
                  </li>
                  <li>
                    <a class="menutrai" href="/trang1">
                      {" "}
                      SAN PHAM
                    </a>
                  </li>
                  <li>
                    <a class="menutrai" href="/trang2">
                      SINH VIEN
                    </a>
                  </li>
                  <li>
                    <a class="menutrai" href="/Listsanpham">
                      LIST SAN PHAM
                    </a>
                  </li>
                  <li>
                    <a class="menutrai" href="/ListProducts_SP_Admin">
                      Quản trị
                    </a>
                  </li>
                  <li>
                    <a class="menutrai" href="/LoginPage">
                      Đăng nhập
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div style={{ width: "1000px" }}>
              <a href="/">
                <img src={logo} width="500" height="80" />
              </a>
            </div>
            <div>Tim kiem</div>
          </div>
          <div id="menubar" className="menubar"></div>
        </div>
      </header>

      <body>
        <Outlet />
      </body>
      <footer className="footer">
        <div className="footer-container">
          {/* Cột 1: Giới thiệu */}
          <div className="footer-section">
            <h3>Store Giày Chính Hãng</h3>
            <p>
              Cung cấp Quần Aó Cam kết 100% hàng thật – đổi trả miễn phí trong 7
              ngày.
            </p>
          </div>

          {/* Cột 2: Liên hệ */}
          <div className="footer-section">
            <h3>Liên hệ</h3>
            <ul>
              <li>🏠 123 Nguyễn Trãi, Quận 1, TP.HCM</li>
              <li>📞 0901 234 567</li>
              <li>✉️ contact@storegiay.vn</li>
            </ul>
          </div>

          {/* Cột 3: Liên kết nhanh */}
          <div className="footer-section">
            <h3>Liên kết nhanh</h3>
            <ul>
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <a href="#">Sản phẩm</a>
              </li>
              <li>
                <a href="#">Khuyến mãi</a>
              </li>
              <li>
                <a href="#">Liên hệ</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Store bán quần áo | Thiết kế bởi Đăng 💙</p>
        </div>
      </footer>
    </html>
  );
};
export default Layout;
