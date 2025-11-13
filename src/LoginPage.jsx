import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Import Supabase client
import anhlogo1 from "./assets/images/Ten-truong-do-1000x159.png";
import "./assets/css/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState(""); // Thêm fullname cho đăng ký
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Điều khiển xem đang ở form đăng nhập hay đăng ký
  const navigate = useNavigate();

  // Kiểm tra xem người dùng đã đăng nhập chưa khi tải trang
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedInUser(JSON.parse(user).username);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username, // Supabase sử dụng email làm username
        password: password,
      });

      if (error) {
        setError(error.message || "Đăng nhập thất bại!");
      } else {
        // Lưu thông tin user vào localStorage
        localStorage.setItem("user", JSON.stringify({ username }));
        setLoggedInUser(username);
        alert("✅ Đăng nhập thành công!");
        navigate("/"); // chuyển tới trang chính
      }
    } catch (err) {
      setError("Server không phản hồi!");
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("user");
    setLoggedInUser(null);
    alert("✅ Đăng xuất thành công!");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: username, // Dùng email làm tên đăng nhập
        password: password,
      });

      if (error) {
        setError(error.message || "Đăng ký thất bại!");
      } else {
        // Lưu thông tin user vào localStorage và chuyển hướng đến trang login
        localStorage.setItem("user", JSON.stringify({ username }));
        setLoggedInUser(username);
        alert("✅ Đăng ký thành công! Bạn có thể đăng nhập ngay.");
        setIsSignUp(false); // Đóng form đăng ký
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra!");
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="Logo" className="login-logo" />

        <h2 className="login-title">
          {isSignUp ? "Đăng ký tài khoản" : "Đăng nhập vào tài khoản"}
        </h2>
        <p className="login-subtitle">
          {isSignUp
            ? "Tạo tài khoản mới"
            : "Sử dụng tài khoản của bạn để tiếp tục"}
        </p>

        {loggedInUser ? (
          <div className="welcome-message">
            <h3>Chào mừng, {loggedInUser}!</h3>
            <button onClick={handleLogout} className="logout-btn">
              Đăng xuất
            </button>
          </div>
        ) : (
          <form
            onSubmit={isSignUp ? handleSignUp : handleLogin}
            className="login-form"
          >
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label>Tên đăng nhập (Email)</label>
              <input
                type="email"
                placeholder="Nhập tên đăng nhập..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isSignUp && (
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên..."
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading
                ? "⏳ Đang xử lý..."
                : isSignUp
                ? "Đăng ký"
                : "Đăng nhập"}
            </button>
          </form>
        )}

        {!loggedInUser && (
          <p className="register-link">
            {isSignUp ? "Bạn đã có tài khoản?" : "Bạn chưa có tài khoản?"}{" "}
            <a href="#" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Đăng nhập ngay" : "Tạo tài khoản mới"}
            </a>
          </p>
        )}

        <div className="social-login">
          <button className="social-btn google">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
              alt="Google"
            />
            <span>Đăng nhập Google</span>
          </button>

          <button className="social-btn facebook">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
            />
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
