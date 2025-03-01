"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faCommentDots, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faTelegram } from "@fortawesome/free-brands-svg-icons";

export default function FloatingButton() {
  const [showButton, setShowButton] = useState(false);
  const [showServiceButtons, setShowServiceButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Tombol Service (WhatsApp & Telegram) */}
      <motion.button
        onClick={() => setShowServiceButtons(!showServiceButtons)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-[90px] right-6 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <FontAwesomeIcon icon={faCommentDots} className="text-2xl" />
      </motion.button>

      <AnimatePresence>
        {showServiceButtons && (
          <div>
            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/62XXXXXXXXXX" // Ganti dengan nomor WhatsApp Anda
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-[155px] right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
            </motion.a>

            {/* Telegram Button dengan Nomor Telepon */}
            <motion.a
              href="https://t.me/+62XXXXXXXXXX" // Ganti dengan nomor Telegram Anda
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 50 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="fixed bottom-[220px] right-6 z-50 p-4 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 transition-all"
            >
              <FontAwesomeIcon icon={faPhone} className="text-2xl" />
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      {/* Tombol Kembali ke Atas (Lebih Unik) */}
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faChevronUp} className="text-2xl animate-bounce" />
        </motion.button>
      )}
    </div>
  );
}
