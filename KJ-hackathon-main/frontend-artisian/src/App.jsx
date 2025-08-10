import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import SearchResult from "./pages/SearchResult";
import { Dashboard } from "./components/Dashboard-Admin/DashBoard";
import ProductPage from "./pages/ProductPage";
import { Inventory } from "./components/Inventory/Inventory";
import Orders from "./components/Orders/Order";
import { AddProduct } from "./components/Inventory/AddProduct";
import { Product } from "./components/Inventory/Product";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import SearchPage from "./pages/SearchPage";
import UserProfile from "./pages/UserProfile";
import Artists from "./pages/Artists";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/product/:pid" element={<ProductDetail />}></Route>
      <Route path="/wishlist" element={<Wishlist />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/searchresult" element={<SearchPage />}></Route>

      <Route path="/products" element={<ProductPage />}></Route>
      {/* <Route path="/user/profile" element={<UserProfile />}></Route> */}
      {/* <Route path="/connect" element={<CallPage />}></Route> */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/inventory" element={<Inventory />} />
      <Route path='/admin/orders' element={<Orders />} />
      <Route path='/admin/add-product' element={<AddProduct />} />
      <Route path='/admin/product' element={<Product />} />

      <Route path="/artists" element={<Artists />}></Route>
    </Routes>
  );
}

export default App;
