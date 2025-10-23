import React, { useEffect, useState } from "react";

const Listsanpham = () => {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);

  // --- State mới cho phân trang ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Hiển thị 8 sản phẩm mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://68f99a87ef8b2e621e7cd04c.mockapi.io/Schena"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleToggleDescription = (id) => {
    setActiveProduct(activeProduct === id ? null : id);
  };

  // --- Logic cho phân trang ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- CSS cho hiệu ứng hover và pagination ---
  const pageStyles = `
    .product-card:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    .pagination {
      display: flex;
      justify-content: center;
      list-style: none;
      padding: 0;
      margin-top: 40px;
    }
    .pagination li {
      margin: 0 5px;
    }
    .pagination button {
      cursor: pointer;
      border: 1px solid #ddd;
      padding: 8px 16px;
      border-radius: 6px;
      background-color: #fff;
      transition: background-color 0.3s, color 0.3s;
      font-weight: 500;
    }
    .pagination button:hover {
      background-color: #f0f2f5;
    }
    .pagination button.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }
  `;

  return (
    <>
      {/* Thẻ style để thêm CSS cho hover và pagination */}
      <style>{pageStyles}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column", // Thay đổi để chứa cả grid và pagination
          alignItems: "center", // Căn giữa toàn bộ nội dung
          backgroundColor: "#f0f2f5",
          padding: "40px 20px",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "24px",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* Chỉ map trên 'currentItems' thay vì 'products' */}
          {currentItems.map((product) => (
            <div
              key={product.id}
              className="product-card" // Thêm className để áp dụng hiệu ứng hover
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "left",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease", // Thêm transition cho hiệu ứng mượt mà
              }}
              onClick={() => handleToggleDescription(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#1a202c",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minHeight: "2.5rem", // Điều chỉnh để tiêu đề luôn có 2 dòng chiều cao
                  }}
                >
                  {product.title}
                </h3>
                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "0.875rem",
                    color: "#718096",
                  }}
                >
                  {product.category}
                </p>
                <div style={{ marginTop: "auto" }}>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#2d3748",
                    }}
                  >
                    ${product.price}
                  </p>
                </div>
                {activeProduct === product.id && (
                  <p
                    style={{
                      marginTop: "12px",
                      color: "#4a5568",
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {product.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* --- Component Phân trang --- */}
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Listsanpham;
