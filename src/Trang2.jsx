// import React from "react"; // Khung sườn React không cần import trong các phiên bản mới

// Định nghĩa styles (có thể chuyển sang file CSS module hoặc styled-components)
const styles = {
  mainContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#f0f2f5",
    padding: "40px 20px",
  },

  studentGrid: {
    display: "grid",

    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    width: "100%",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 15px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
    },
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "4px solid #3498db",
    boxShadow: "0 0 10px rgba(52, 152, 219, 0.5)",
  },
  name: {
    fontSize: "1.25rem",
    margin: "5px 0",
    fontWeight: "600",
    color: "#2c3e50",
  },
  info: {
    margin: "3px 0",
    fontSize: "0.95rem",
    color: "#7f8c8d",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "20px",
    fontSize: "2rem",
    fontWeight: "700",
  },
};

const StudentCard = ({ motsinhvien }) => {
  return (
    <div style={styles.card}>
      <img
        src={motsinhvien.anh}
        alt={motsinhvien.hoten}
        style={styles.avatar}
      />
      <h3 style={styles.name}>{motsinhvien.hoten}</h3>
      <p style={styles.info}>**Lớp:** {motsinhvien.lop}</p>
      <p style={styles.info}>**Email:** {motsinhvien.email}</p>
    </div>
  );
};

const Trang2 = () => {
  const dssv = [
    {
      id: 1,
      hoten: "Nguyễn Văn An111",
      lop: "K19",
      email: "abc@1234.edu.vn",
      anh: "https://htmediagroup.vn/wp-content/uploads/2022/11/Anh-58-copy-min.jpg.webp",
    },
    {
      id: 2,
      hoten: "Trần Văn Bình",
      lop: "K19",
      email: "abc@1234.edu.vn",
      anh: "https://htmediagroup.vn/wp-content/uploads/2022/08/Anh-cong-so-1-min.jpg.webp",
    },
    {
      id: 3,
      hoten: "Hà Thị Hiền",
      lop: "K19",
      email: "abc@cuong.edu.vn",
      anh: "https://smilemedia.vn/wp-content/uploads/2022/08/Concept-chup-anh-ca-nhan-chan-dung.jpg",
    },
    {
      id: 4,
      hoten: "Nguyễn Kiều Hải My",
      lop: "K19",
      email: "abc@cuong.edu.vn",
      anh: "https://studiochupanhdep.com//Upload/Images/Album/anh-beauty-01.jpg",
    },
  ];

  return (
    <div style={styles.mainContainer}>
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <h2 style={styles.title}>Danh Sách Sinh Viên</h2>
        <div style={styles.studentGrid}>
          {dssv.map((motsinhvien) => (
            <StudentCard key={motsinhvien.id} motsinhvien={motsinhvien} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trang2;
