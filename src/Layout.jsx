import "./assets/css/layout.css";
import logo from "./assets/images/Ten-truong-do-1000x159.png";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <div id="header" className="header">
          <div id="banner" className="banner">
            <div id="divmenutrai">
              <nav id="menutrai">
                <ul className="menutrai">
                  <li>
                    <a href="/" className="menutrai">
                      TRANG CHỦ
                    </a>
                  </li>
                  <li>
                    <a className="menutrai" href="/trang1">
                      SẢN PHẨM
                    </a>
                  </li>
                  <li>
                    <a className="menutrai" href="/trang2">
                      SINH VIÊN
                    </a>
                  </li>
                  <li>
                    <a className="menutrai" href="/Listsanpham">
                      DANH SÁCH SẢN PHẨM
                    </a>
                  </li>
                  {/* Hai mục này đã được di chuyển lên #menubar */}
                </ul>
              </nav>
            </div>
            <div>
              <a href="/">
                <img src={logo} alt="Logo" />
              </a>
            </div>
            <div>Tìm kiếm</div>
          </div>

          {/* --- PHẦN ĐÃ SỬA: THANH ĐIỀU HƯỚNG NGANG (NAVBAR) --- */}
          <div id="menubar" className="menubar">
            <nav id="topnav">
              <ul className="topnav-list">
                <li>
                  <a
                    className="nav-link admin-link"
                    href="/ListProducts_SP_Admin"
                  >
                    QUẢN LÝ SẢN PHẨM
                  </a>
                </li>
                <li>
                  <a className="nav-link login-link" href="/LoginPage">
                    ĐĂNG NHẬP HỆ THỐNG
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {/* ---------------------------------------------------- */}
        </div>
      </header>

      <div className="outlet-container">
        <Outlet />
      </div>

      <footer className="footer">
        {/* Nội dung footer giữ nguyên */}
        <div className="footer-container">
          <div className="footer-section">
            <h3>Store Giày Chính Hãng</h3>
            <p>
              Cung cấp Quần Aó Cam kết 100% hàng thật – đổi trả miễn phí trong 7
              ngày.
            </p>
          </div>
          <div className="footer-section">
            <h3>Liên hệ</h3>
            <ul>
              <li>🏠 123 Nguyễn Trãi, Quận 1, TP.HCM</li>
              <li>📞 0901 234 567</li>
              <li>✉️ contact@storegiay.vn</li>
            </ul>
          </div>
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
    </>
  );
};
export default Layout;
