import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const EditProduct = () => {
  const { id } = useParams(); // lấy id từ route
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [rating_rate, setRatingRate] = useState(0);
  const [rating_count, setRatingCount] = useState(0);

  // Nếu id !== "new", fetch dữ liệu sản phẩm để sửa
  useEffect(() => {
    if (id !== "new") {
      const fetchProduct = async () => {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          alert("Lỗi: " + error.message);
        } else {
          setTitle(data.title);
          setPrice(data.price);
          setImage(data.image);
          setRatingRate(data.rating_rate);
          setRatingCount(data.rating_count);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id === "new") {
      // Thêm mới sản phẩm
      const { error } = await supabase.from("product1").insert([
        {
          title,
          price,
          image,
          rating_rate,
          rating_count,
        },
      ]);
      if (error) alert("Lỗi thêm mới: " + error.message);
      else navigate("/ListProducts_SP_Admin"); // quay về trang admin
    } else {
      // Sửa sản phẩm
      const { error } = await supabase
        .from("product1")
        .update({ title, price, image, rating_rate, rating_count })
        .eq("id", id);
      if (error) alert("Lỗi sửa: " + error.message);
      else navigate("/ListProducts_SP_Admin"); // quay về trang admin
    }
  };

  return (
    <div className="container">
      <h2>{id === "new" ? "Thêm sản phẩm mới" : "Sửa sản phẩm"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Giá:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Link hình ảnh:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>Đánh giá (rate):</label>
          <input
            type="number"
            value={rating_rate}
            onChange={(e) => setRatingRate(e.target.value)}
          />
        </div>
        <div>
        <label>Số đánh giá:</label>
          <input
            type="number"
            value={rating_count}
            onChange={(e) => setRatingCount(e.target.value)}
          />
        </div>
        <button type="submit">{id === "new" ? "Thêm mới" : "Lưu thay đổi"}</button>
        <button type="button" onClick={() => navigate("/ListProducts_SP_Admin")}>
          Hủy
        </button>
      </form>
    </div>
  );
};

export default Editproduct;