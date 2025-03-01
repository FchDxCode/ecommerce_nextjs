"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SummaryProduct({ cartItems }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Hitung total harga dan jumlah item
    const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const items = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
    
    setTotalPrice(total);
    setTotalItems(items);
  }, [cartItems]); // Hanya update ketika cartItems berubah

  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return "";

    let message = "Halo, saya ingin memesan produk berikut:\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title} x${item.quantity || 1} - Rp ${item.price.toLocaleString()}\n`;
    });

    message += `\nTotal Produk: ${totalItems} item\n`;
    message += `Total Harga: Rp ${totalPrice.toLocaleString()}\n\n`;
    message += "Saya ingin konfirmasi pesanan ini. Terima kasih! 😊";

    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    const phoneNumber = "6282213153118";
    const waLink = `https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="mt-16">
      <div className="lg:w-96">
        <div className="bg-white shadow-xl rounded-lg p-6 sticky top-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">🛍️ Ringkasan Belanja</h2>

          {/* Rincian Harga */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Item</span>
              <span className="font-medium text-green-600">{totalItems} item</span>
            </div>

            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.title}</span>
                <span className="font-medium text-red-600">x{item.quantity || 1}</span>
              </div>
            ))}

            <div className="flex justify-between text-sm border-t pt-4">
              <span className="text-gray-600">Total Harga</span>
              <span className="font-medium text-gray-900">Rp {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6">
            {/* Tombol Pembayaran */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg shadow-lg font-medium hover:shadow-xl transition-all"
              onClick={handleCheckout}
            >
              💳 Lanjut ke WhatsApp
            </motion.button>

            {/* Link Kembali */}
            <div className="mt-4 text-center">
              <a href="/product" className="text-sm text-blue-600 hover:text-blue-800 transition">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> Lanjut Belanja
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
