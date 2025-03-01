"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchWebConfig } from "../api/ApiWebConfig";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [webConfig, setWebConfig] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getWebConfig = async () => {
      const config = await fetchWebConfig();
      setWebConfig(config);
    };
    getWebConfig();
  }, []);

  useEffect(() => {
    // Ambil jumlah item di keranjang dari localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCount(storedCart.length);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const loadGoogleTranslate = () => {
      if (typeof window !== "undefined") {
        if (!window.google || !window.google.translate) {
          if (!window.googleTranslateElementInit) {
            window.googleTranslateElementInit = function () {
              if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement(
                  { pageLanguage: "id", autoDisplay: false },
                  "google_translate_element"
                );
              }
            };
          }

          const existingScript = document.querySelector(
            'script[src*="translate.google.com"]'
          );
          if (!existingScript) {
            const script = document.createElement("script");
            script.src =
              "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
          }
        } else {
          window.googleTranslateElementInit();
        }
      }
    };

    setTimeout(loadGoogleTranslate, 100);

    return () => {
      const element = document.getElementById("google_translate_element");
      if (element) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    };
  }, [pathname]);

  const navItems = [
    { name: "Beranda", path: "/landing" },
    { name: "Tentang Kami", path: "/about" },
    { name: "Produk", path: "/product" },
    { name: "Katalog", path: "/katalog" },
    { name: "Hubungi Kami", path: "/klienkami" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav
      className={`fixed top-0 bg-white w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled ? "bg-white/20 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <a href="/landing">
            <img
              className="h-12 w-auto cursor-pointer transition-transform hover:scale-105"
              src={webConfig?.logoUrl || "/default-logo.png"}
              alt={webConfig?.title || "Logo"}
              onError={(e) => { e.target.src = "/default-logo.png"; }}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {navItems.map((item, idx) => (
              <a href={item.path} key={idx} className="relative group">
                <div
                  className={`text-gray-900 font-medium cursor-pointer transition-all py-2 px-3 rounded-md ${
                    pathname === item.path
                      ? "bg-orange-400/50 text-gray-700 font-bold shadow-md"
                      : "hover:bg-orange-400/50"
                  }`}
                >
                  {item.name}
                </div>
              </a>
            ))}

            {/* Google Translate Widget */}
            <div id="google_translate_element" className="ml-4"></div>

            {/* 🔥 Cart Icon */}
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
              className="relative ml-5"
            >
              <a href="/cart" className="relative">
                <div className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition shadow-md">
                  <FontAwesomeIcon icon={faShoppingCart} className="text-gray-700 text-xl" />
                </div>
                {/* 🔥 Notif Badge jika ada item di cart */}
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                    {cartItemCount}
                  </span>
                )}
              </a>
            </motion.div>
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="text-2xl" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center space-y-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, idx) => (
              <a href={item.path} key={idx} className="text-xl font-medium transition-all" onClick={() => setMobileMenuOpen(false)}>
                <div
                  className={`px-6 py-2 rounded-lg ${
                    pathname === item.path
                      ? "bg-orange-400/50 text-gray-300 font-bold shadow-md"
                      : "hover:bg-orange-400/50"
                  }`}
                >
                  {item.name}
                </div>
              </a>
            ))}

            {/* 🔥 Cart Icon in Mobile Menu */}
            <a href="/cart">
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
                className="bg-gray-100 px-5 py-3 rounded-lg flex items-center space-x-3 text-gray-800 shadow-lg hover:bg-gray-200 transition"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                <span>Keranjang</span>
              </motion.button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
