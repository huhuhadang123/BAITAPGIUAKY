import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
// Đảm bảo bạn có file CSS cho form, ví dụ:
// import "./assets/css/editproduct.css";

const EditProduct_SP_Admin = () => {
  const { id } = useParams(); // Lấy id từ URL: /admin/edit/:id
  const navigate = useNavigate();

  // Khởi tạo state cho form, sử dụng các trường tương ứng với Supabase
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    rating_rate: "", // Tỷ lệ đánh giá (ví dụ: 4.5)
    rating_count: "", // Số lượng đánh giá
  });

  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(true); // Kiểm tra xem là Thêm mới hay Sửa

  // 1. Tải dữ liệu sản phẩm hiện tại (nếu đang sửa)
  useEffect(() => {
    if (id && id !== "new") {
      setIsNew(false);
      const fetchProduct = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single(); // Lấy 1 bản ghi duy nhất

        if (error) {
          console.error("Lỗi khi tải sản phẩm:", error.message);
          alert("Không tìm thấy sản phẩm.");
          navigate("/admin/products"); // Chuyển về trang danh sách
        } else if (data) {
          setProduct({
            title: data.title || "",
            price: data.price || "",
            image: data.image || "",
            description: data.description || "",
            // Chuyển đổi sang string để hiển thị trong input
            rating_rate: String(data.rating_rate || ""),
            rating_count: String(data.rating_count || ""),
          });
        }
        setLoading(false);
      };
      fetchProduct();
    }
  }, [id, navigate]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // 2. Xử lý Thêm mới/Cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Chuẩn bị dữ liệu để gửi lên Supabase
    const productData = {
      title: product.title,
      price: product.price, // Giả định Supabase tự chuyển đổi kiểu
      image: product.image,
      description: product.description,
      // Đảm bảo các trường số là số (hoặc null nếu để trống)
      rating_rate: parseFloat(product.rating_rate) || 0,
      rating_count: parseInt(product.rating_count, 10) || 0,
    };

    let error = null;

    if (isNew) {
      // THÊM MỚI
      const { error: insertError } = await supabase
        .from("product1")
        .insert([productData]);
      error = insertError;
    } else {
      // CẬP NHẬT (SỬA)
      const { error: updateError } = await supabase
        .from("product1")
        .update(productData)
        .eq("id", id);
      error = updateError;
    }

    setLoading(false);

    if (error) {
      alert(
        `Lỗi khi ${isNew ? "thêm mới" : "cập nhật"} sản phẩm: ${error.message}`
      );
    } else {
      alert(`${isNew ? "Thêm mới" : "Cập nhật"} sản phẩm thành công!`);
      navigate("/admin/products"); // Quay về trang danh sách sản phẩm sau khi thành công
    }
  };

  if (loading && !isNew) {
    return <div className="container">Đang tải thông tin sản phẩm...</div>;
  }

  return (
    <div className="container">
      <h2>{isNew ? "➕ Thêm mới sản phẩm" : "✏️ Sửa sản phẩm"}</h2>
      <button
        className="btn back-btn"
        onClick={() => navigate("/admin/products")}
      >
        ⬅️ Quay lại danh sách
      </button>
      <form onSubmit={handleSubmit} className="product-form">
        {/* Trường Tên sản phẩm */}
        <div className="form-group">
          <label htmlFor="title">Tên sản phẩm:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Trường Giá */}
        <div className="form-group">
          <label htmlFor="price">Giá:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Trường URL Hình ảnh */}
        <div className="form-group">
          <label htmlFor="image">URL Hình ảnh:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
          {product.image && (
            <img
              src={product.image}
              alt="Xem trước"
              className="image-preview"
            />
          )}
        </div>

        {/* Trường Mô tả */}
        <div className="form-group">
          <label htmlFor="description">Mô tả:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        {/* Trường Đánh giá (Tỷ lệ) */}
        <div className="form-group">
          <label htmlFor="rating_rate">Tỷ lệ đánh giá (1-5):</label>
          <input
            type="number"
            id="rating_rate"
            name="rating_rate"
            value={product.rating_rate}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
          />
        </div>

        {/* Trường Số lượng đánh giá */}
        <div className="form-group">
          <label htmlFor="rating_count">Số lượng đánh giá:</label>
          <input
            type="number"
            id="rating_count"
            name="rating_count"
            value={product.rating_count}
            onChange={handleChange}
            min="0"
          />
        </div>

        <button
          type="submit"
          className="btn green submit-btn"
          disabled={loading}
        >
          {loading
            ? "Đang xử lý..."
            : isNew
            ? "Thêm sản phẩm"
            : "Cập nhật sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct_SP_Admin;
