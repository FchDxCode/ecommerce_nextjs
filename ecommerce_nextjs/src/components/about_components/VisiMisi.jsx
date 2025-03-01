"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBullseye, faCheck } from "@fortawesome/free-solid-svg-icons";
import { fetchVisiMisi } from "../../api/ApiVisiMisi";

export default function VisiMisi() {
  const [visiMisi, setVisiMisi] = useState({ visi: "", misi: [] });

  useEffect(() => {
    const getVisiMisi = async () => {
      const data = await fetchVisiMisi();
      setVisiMisi(data);
    };

    getVisiMisi();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Visi & Misi</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faEye} className="text-3xl text-white" />
              </div>
              <h3 className="ml-4 text-2xl font-semibold text-gray-900">Visi</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{visiMisi.visi}</p>
          </motion.div>

          {/* Misi */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <FontAwesomeIcon icon={faBullseye} className="text-3xl text-white" />
              </div>
              <h3 className="ml-4 text-2xl font-semibold text-gray-900">Misi</h3>
            </div>

            <ul className="text-gray-600 space-y-4">
              {visiMisi.misi.length > 0 ? (
                visiMisi.misi.map((misi, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <FontAwesomeIcon icon={faCheck} className="text-white text-lg" />
                    </div>
                    <span className="ml-4 mt-2">{misi}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Misi belum tersedia</p>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
