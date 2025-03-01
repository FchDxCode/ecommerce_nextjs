"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTimes } from "@fortawesome/free-solid-svg-icons";
import HeaderKatalog from "./HeaderKatalog";
import TopKatalogFilter from "./TopKatalogFilter";
import { fetchKatalogList, submitKatalogForm, updateTotalDownload } from "../../api/ApiKatalog";

export default function KatalogList() {
  const [katalogs, setKatalogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKatalog, setSelectedKatalog] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const getKatalogs = async () => {
      const data = await fetchKatalogList(selectedCategory);
      setKatalogs(data);
    };

    getKatalogs();
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownloadClick = (katalog) => {
    setSelectedKatalog(katalog);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Nama dan Email wajib diisi!");
      return;
    }

    try {
      // Submit form data
      const isFormSubmitted = await submitKatalogForm(formData.name, formData.email);
      if (!isFormSubmitted) {
        alert("Gagal mengirim data, coba lagi.");
        return;
      }

      // Update total download di UI
      const updatedKatalogs = katalogs.map((item) =>
        item.id === selectedKatalog.id
          ? { ...item, totalDownload: item.totalDownload + 1 }
          : item
      );
      setKatalogs(updatedKatalogs);

      // Update total download di database
      await updateTotalDownload(selectedKatalog.id, selectedKatalog.totalDownload + 1);

      // Buka file di tab baru
      window.open(`${selectedKatalog.fileUrl}`, '_blank');

      // Reset form dan tutup modal
      setIsModalOpen(false);
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Error handling download:", error);
      alert("Terjadi kesalahan saat mengunduh file.");
    }
  };

  return (
    <div>
      <main className="pt-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HeaderKatalog />
          <TopKatalogFilter onCategorySelect={handleCategoryClick} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {katalogs.length > 0 ? (
              katalogs.map((katalog, idx) => (
                <motion.div
                  key={katalog.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={katalog.image}
                      alt={katalog.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg'; // Fallback image jika error
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDownloadClick(katalog)}
                        className="bg-white/20 text-white font-semibold px-5 py-3 rounded-lg shadow-md flex items-center gap-2 transition-all hover:bg-white/30 border"
                      >
                        <FontAwesomeIcon icon={faDownload} className="text-lg" />
                        Download
                      </button>
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">{katalog.title}</h3>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">Memuat katalog...</p>
            )}
          </div>
        </div>
      </main>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-black">Download Katalog</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full text-black ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Download
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
