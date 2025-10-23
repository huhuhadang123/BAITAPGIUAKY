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
                      EGOV
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
      <footer></footer>
    </html>
  );
};
export default Layout;
