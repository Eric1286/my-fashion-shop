import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import InformationPage from "./pages/InformationPage";
import Layout from "./components/Layout/Layout";
import CartPage from "./pages/CartPage";
function App() {
  // console.log([1, 2, 3].slice(1));
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<InformationPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
