"use client";

import { useState } from "react";
import SummaryProduct from "../../components/cart_components/SummaryProduct";
import ListProduct from "../../components/cart_components/ListProduct";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const handleCartUpdate = (updatedCart) => {
    setCartItems(updatedCart);
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-[13rem]">
          <ListProduct onCartUpdate={handleCartUpdate} />
          <SummaryProduct cartItems={cartItems} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
