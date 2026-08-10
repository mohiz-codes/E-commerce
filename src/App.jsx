import { Routes, Route, Router } from "react-router-dom";
import { useState } from 'react'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import ProductType from './pages/ProductType.jsx'
import Cart from './pages/Cart.jsx'
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";



function App() {
 

  return (
    <>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productType" element={<ProductType />} />
      <Route path="/product" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      
    </Routes>
    <Footer />

    </>
   
  )
}

export default App
