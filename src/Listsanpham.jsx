import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Listsanpham = () => {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null); // State để quản lý sản phẩm được nhấn

  // Lấy dữ liệu từ API khi component được render
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data); // Cập nhật dữ liệu vào state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Hàm để toggle phần mô tả sản phẩm khi nhấn vào sản phẩm
  const handleToggleDescription = (id) => {
    if (activeProduct === id) {
      setActiveProduct(null); // Nếu sản phẩm đang mở, đóng lại
    } else {
      setActiveProduct(id); // Mở mô tả cho sản phẩm vừa nhấn
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh", // Chiếm toàn bộ chiều cao màn hình
        display: "flex",
        justifyContent: "center", // Căn giữa ngang
        backgroundColor: "#f9f9f9", // Màu nền
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
          maxWidth: "1000px", // Giới hạn chiều rộng
          width: "100%",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              height: "auto", // Tự động điều chỉnh chiều cao
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
              cursor: "pointer", // Con trỏ thay đổi khi hover
            }}
            onClick={() => handleToggleDescription(product.id)} // Khi nhấn vào sản phẩm, gọi hàm toggle
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                height: "140px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h3 style={{ margin: "10px 0 5px" }}>{product.title}</h3>
            <p>{product.category}</p>
            <p style={{ margin: "10px 0 5px" }}>${product.price}</p>

            {/* Chỉ hiển thị mô tả nếu sản phẩm này được nhấn */}
            {activeProduct === product.id && (
              <p style={{ marginTop: "10px", color: "#555" }}>
                {product.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Listsanpham;
