import React  from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Home from "./user/Home";
import AdminHome from "./admin/AdminHome";
import ProductDetails from "./user/ProductDetails";
import Products from "./admin/Products";
import Categories from "./admin/Categories";
import PickUpPoints from "./admin/PickUpPoints";

function App() {
  return <>
  <BrowserRouter> 
  <Routes> 
   <Route exact path="/" element={<Home/>} />
   <Route exact path = '/product/:id' element = {<ProductDetails/>}/>
   <Route exact path="/admin" element={<AdminHome/>} />
   <Route exact path="/admin/products" element={<Products/>}/>
   <Route exact path='/admin/categories' element={<Categories/>}/>
   <Route exact path='/admin/pickUpPoints' element={<PickUpPoints/>}/>
   </Routes>
   </BrowserRouter>


  </>;
}

export default App;
