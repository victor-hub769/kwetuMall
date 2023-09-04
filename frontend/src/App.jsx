import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home";
import AdminHome from "./pages/admin/AdminHome";
import ProductDetails from "./pages/user/ProductDetails";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import PickUpPoints from "./pages/admin/PickUpPoints";
import Register from "./pages/user/auth/Register";
import Login from "./pages/user/auth/Login";
import AdminLogin from "./pages/admin/Auth/Login";
import AdminRegister from "./pages/admin/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/user/Cart";
import UserProtectedRoute from "./components/UserProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          {/* <Route exact path="/admin" element={<AdminHome />} /> */}

          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/admin/login" element={<AdminLogin />} />
          <Route exact path="/admin/register" element={<AdminRegister />} />
          <Route
            exact
            path="/cart-details"
            element={<UserProtectedRoute component={Cart} />}
          />
          {/* <Route exact path="/admin/products" element={<Products />} />
          <Route exact path="/admin/categories" element={<Categories />} />
          <Route exact path="/admin/pickUpPoints" element={<PickUpPoints />} /> */}
          {/* ( Protected Routes) */}
          {/* <ProtectedRoute path = "/admin" element = {<AdminHome/>}/> */}
          <Route
            exact
            path="/admin"
            element={<ProtectedRoute component={AdminHome} />}
          />
          <Route
            exact
            path="/admin/products"
            element={<ProtectedRoute component={Products} />}
          />
          <Route
            exact
            path="/admin/categories"
            element={<ProtectedRoute component={Categories} />}
          />
          <Route
            exact
            path="/admin/pickUpPoints"
            element={<ProtectedRoute component={PickUpPoints} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
