"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { submitContactForm } from "../../api/ApiFormContact";

export default function FormContact() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    pesan: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // Handle input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form ke API
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const isSubmitted = await submitContactForm(
      formData.nama,
      formData.email,
      formData.phone,
      formData.pesan
    );
    setLoading(false);

    if (isSubmitted) {
      setSuccess("Pesan berhasil dikirim!");
      setFormData({ nama: "", email: "", phone: "", pesan: "" });
    } else {
      setSuccess("Gagal mengirim pesan. Coba lagi.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Informasi Kontak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-600 rounded-2xl p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-8">Hubungi Kami</h2>
          <p className="mb-8 text-blue-100">
            Kami siap membantu Anda. Silakan hubungi kami melalui form ini atau gunakan kontak yang tersedia di bawah ini.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faPhone} className="text-xl" />
              <div>
                <h3 className="font-semibold">Telepon</h3>
                <p className="text-blue-100">+62 89553424222</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-blue-100">admin@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faLocationDot} className="text-xl" />
              <div>
                <h3 className="font-semibold">Alamat</h3>
                <p className="text-blue-100">Jl. Sudirman No. 123, Jakarta</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Formulir Kontak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 text-black focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 text-black focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Nomor Telepon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 text-black focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Pesan</label>
              <textarea
                name="pesan"
                value={formData.pesan}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 text-black focus:ring-blue-500 focus:border-transparent"
                required
              ></textarea>
            </div>

            {/* Notifikasi Sukses / Error */}
            {success && (
              <p className={`text-center text-lg font-semibold ${success.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>
                {success}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              <span>{loading ? "Mengirim..." : "Kirim Pesan"}</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
