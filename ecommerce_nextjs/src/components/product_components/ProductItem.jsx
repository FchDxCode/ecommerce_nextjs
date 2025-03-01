"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function ProductItem({ product }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Cek jika sudah mencapai batas maksimal item
    if (storedCart.length >= 30) {
      toast.error('Maksimal 30 item dalam keranjang!');
      return;
    }

    // Cek apakah produk sudah ada di keranjang
    const existingItemIndex = storedCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Jika produk sudah ada, update quantity
      const newQuantity = (storedCart[existingItemIndex].quantity || 1) + 1;
      
      // Cek batas maksimal quantity per produk
      if (newQuantity > 20) {
        toast.error('Maksimal pembelian 20 item per produk!');
        return;
      }
      
      // Update quantity produk yang sudah ada
      storedCart[existingItemIndex].quantity = newQuantity;
      toast.success("🎉 Jumlah produk berhasil ditambahkan!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      // Jika produk belum ada, tambahkan sebagai item baru
      storedCart.push({ ...product, quantity: 1 });
      toast.success("🎉 Produk berhasil ditambahkan ke keranjang!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }

    // Simpan ke localStorage
    localStorage.setItem("cart", JSON.stringify(storedCart));
    setCart(storedCart);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden group relative border border-gray-200"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Gambar Produk */}
      <div className="relative aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden rounded-t-lg">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-[200px] transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No Image</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-3">
          <Link
            href={`/product/${product.documentId}`}
            className="bg-white/20 border border-white text-white px-4 py-2 rounded-lg font-medium shadow-md transition hover:bg-white/30 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faEye} />
            Lihat Lebih
          </Link>
          <button
            onClick={addToCart}
            className="bg-red-500/20 border border-red-500 text-white px-4 py-2 rounded-lg font-medium shadow-md transition hover:bg-red-600/40 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Simpan
          </button>
        </div>
      </div>

      {/* Detail Produk */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">{product.title}</h3>
        <p className="text-lg pt-3 font-semibold text-blue-600">
          Rp {product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
