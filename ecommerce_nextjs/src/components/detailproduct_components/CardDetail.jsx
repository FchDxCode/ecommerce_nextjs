"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBolt, faCheckCircle, faTag } from "@fortawesome/free-solid-svg-icons";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { toast } from 'react-hot-toast';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function CardDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Cek jika sudah mencapai batas maksimal item
    if (storedCart.length >= 30) {
      toast.error('Maksimal 30 item dalam keranjang!');
      return;
    }

    // Persiapkan data produk dengan gambar
    const productToAdd = {
      ...product,
      image: selectedImage // Menggunakan gambar yang dipilih sebagai gambar produk
    };

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
      storedCart.push({ ...productToAdd, quantity: 1 });
      toast.success("🎉 Produk berhasil ditambahkan ke keranjang!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }

    // Simpan ke localStorage dengan timestamp
    localStorage.setItem("cart", JSON.stringify(storedCart));
    localStorage.setItem("cart_expiry", Date.now() + 24 * 60 * 60 * 1000); // Set 24 jam expiry
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Kiri: Gambar Produk */}
        <motion.div 
          className="relative bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <motion.img 
              key={selectedImage}
              src={selectedImage} 
              alt={product.title}
              className="w-full h-96 object-cover transition-all duration-500 shadow-md rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
            />
            {product.diskon_product > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                <FontAwesomeIcon icon={faTag} />
                Diskon {product.diskon_product}%
              </div>
            )}
          </div>

          <div className="flex justify-center gap-3 mt-4">
            {product.images.map((img, index) => (
              <motion.img 
                key={index} 
                src={img} 
                alt={`${product.title} ${index + 1}`}
                className={`w-20 h-20 rounded-md cursor-pointer transition-transform hover:scale-105 border-2 shadow-sm ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
                whileHover={{ scale: 1.1 }}
                onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
              />
            ))}
          </div>
        </motion.div>

        {/* Kanan: Detail Produk */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 shadow-md">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Tersedia Stok Terbatas
          </span>

          <h1 className="text-4xl font-extrabold text-gray-900 leading-snug">
            {product.title}
          </h1>

          <div className="flex items-center space-x-4">
            <p className="text-4xl font-bold text-blue-600 drop-shadow-md">
              Rp {product.price.toLocaleString()}
            </p>
            {product.diskon_product > 0 && (
              <p className="text-sm line-through text-gray-500">
                Rp {(product.price / (1 - product.diskon_product / 100)).toLocaleString()}
              </p>
            )}
          </div>

          {/* Keunggulan Produk */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">✨ Keunggulan Produk</h3>
            <div className="prose prose-blue max-w-none text-gray-600">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
              >
                {product.keunggulan}
              </ReactMarkdown>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="space-y-4">
            <motion.button 
              onClick={addToCart}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
              Tambah ke Keranjang
            </motion.button>

            <motion.button 
              className="w-full bg-white text-blue-600 border-2 border-blue-600 py-3 font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-blue-100 transition-all hover:shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <FontAwesomeIcon icon={faBolt} className="text-lg text-yellow-500" />
              Beli Sekarang
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
