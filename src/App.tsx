import "./styles.css";
// @ts-ignore
import Home from "./Listsanpham";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import Trang2 from "./Trang2";
// @ts-ignore
import Listsanpham from "./Listsanpham";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  //return <Layout />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListProducts_SP />} />
          <Route path="trang1" element={<Trang1 />} />
          <Route path="sanpham/:id" element={<Chitietsanpham />} />
          <Route path="trang2" element={<Trang2 />} />
          <Route path="listsanpham" element={<Listsanpham />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
