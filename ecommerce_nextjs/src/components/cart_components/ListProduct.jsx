"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-hot-toast';

export default function ListProduct({ onCartUpdate }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    if (typeof onCartUpdate === 'function') {
      onCartUpdate(storedCart);
    }
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    if (typeof onCartUpdate === 'function') {
      onCartUpdate(updatedCart);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 20) {
      toast.error('Maksimal pembelian 20 item per produk!');
      return;
    }

    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    if (typeof onCartUpdate === 'function') {
      onCartUpdate(updatedCart);
    }
  };

  const addToCart = (product) => {
    // Ambil cart dari localStorage
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
    } else {
      // Jika produk belum ada, tambahkan sebagai item baru
      storedCart.push({ ...product, quantity: 1 });
    }

    // Simpan kembali ke localStorage
    localStorage.setItem("cart", JSON.stringify(storedCart));
    
    // Update state dan panggil callback
    setCart(storedCart);
    if (typeof onCartUpdate === 'function') {
      onCartUpdate(storedCart);
    }

    // Tampilkan notifikasi sukses
    toast.success('Produk berhasil ditambahkan ke keranjang!', {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="mt-16 max-w-4xl">
      <div className="bg-white shadow-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">🛒 Keranjang Belanja</h1>
          <span className="text-sm text-gray-500">{cart.length} Item</span>
        </div>

        <div className="space-y-6">
          {cart.length > 0 ? (
            cart.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-36 pb-6 border-b last:border-none items-center"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      className="w-full h-full object-cover" 
                      alt={product.title}
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg'; // Gambar placeholder jika error
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">💵 Harga: Rp {product.price.toLocaleString()}</p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="mt-2 text-sm text-red-600 hover:text-red-500 transition"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Hapus
                  </button>
                  <div className="mt-4 flex items-center">
                    <button
                      onClick={() => updateQuantity(product.id, (product.quantity || 1) - 1)}
                      className="!rounded-button w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={product.quantity || 1}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        if (value > 20) {
                          toast.error('Maksimal pembelian 20 item per produk!');
                          return;
                        }
                        updateQuantity(product.id, value);
                      }}
                      min="1"
                      max="20"
                      className="mx-2 w-16 text-center border-gray-300 rounded-md text-gray-500"
                    />
                    <button
                      onClick={() => {
                        const newQuantity = (product.quantity || 1) + 1;
                        if (newQuantity > 20) {
                          toast.error('Maksimal pembelian 20 item per produk!');
                          return;
                        }
                        updateQuantity(product.id, newQuantity);
                      }}
                      className="!rounded-button w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">Keranjang masih kosong.</p>
          )}
        </div>
      </div>
    </div>
  );
}
