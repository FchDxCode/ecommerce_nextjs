"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronDown, faChevronUp, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { fetchFaqData } from "../../api/ApiFaq";

export default function FaqList() {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getFaqs = async () => {
      const { faqs, categories } = await fetchFaqData();
      setFaqs(faqs);
      setCategories([{ id: "all", title_kategori_faq: "Semua" }, ...categories]);
    };

    getFaqs();
  }, []);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // Filter FAQ berdasarkan kategori atau pencarian
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.title_faq.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === "Semua" || 
      faq.kategori_faq?.title_kategori_faq.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    setOpenFaq(null); // Reset opened FAQ when changing category
  };

  return (
    <div className="py-24">
      {/* Header Section */}
      <motion.header
        className="w-full h-[400px] bg-cover bg-center relative"
        style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?support,faq')` }}
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white py-24 px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">
            <FontAwesomeIcon icon={faCircleQuestion} className="mr-3 text-yellow-400" />
            Pusat Bantuan
          </h1>
          <p className="text-lg mt-4 drop-shadow-md">
            Temukan jawaban untuk pertanyaan Anda atau hubungi tim dukungan kami.
          </p>
        </div>
      </motion.header>

      {/* Input Search */}
      <div className="relative max-w-4xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border text-gray-700 border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Kategori FAQ */}
      <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.title_kategori_faq)}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory.toLowerCase() === category.title_kategori_faq.toLowerCase()
                  ? "bg-blue-600 text-white shadow-md"
                  : "border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {category.title_kategori_faq}
            </motion.button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 space-y-6">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900">{faq.title_faq}</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                    {faq.kategori_faq?.title_kategori_faq}
                  </span>
                </div>
                <FontAwesomeIcon
                  icon={openFaq === faq.id ? faChevronUp : faChevronDown}
                  className="text-gray-500 transition-transform"
                />
              </button>
              <motion.div
                className="px-6 py-4 bg-white text-gray-600"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openFaq === faq.id ? "auto" : 0, opacity: openFaq === faq.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>{faq.description_faq}</p>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <motion.p 
            className="text-center py-8 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {searchQuery 
              ? "Tidak ada FAQ yang sesuai dengan pencarian Anda."
              : `Tidak ada FAQ dalam kategori ${selectedCategory}.`}
          </motion.p>
        )}
      </section>
    </div>
  );
}
