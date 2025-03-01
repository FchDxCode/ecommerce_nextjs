"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { fetchStoryCompany } from "../../api/ApiStoryCompany";

export default function StoryPt() {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const getStoryData = async () => {
      const data = await fetchStoryCompany();
      setTimelineData(data);
    };

    getStoryData();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Perjalanan Kami
        </h2>

        <div className="relative">
          {/* Garis Tengah Timeline */}
          <div className="absolute top-0 left-1/2 w-1 h-full bg-blue-300 transform -translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.length > 0 ? (
              timelineData.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className="relative flex flex-col md:flex-row md:items-center justify-between"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                  {/* Ikon di Tengah */}
                  <div className="absolute left-1/2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center transform -translate-x-1/2">
                    <FontAwesomeIcon icon={faCircle} className="text-blue-500 text-sm" />
                  </div>

                  {/* Tahun & Keterangan */}
                  <div className="md:w-5/12 md:text-right md:pr-8">
                    <h3 className="text-xl font-semibold text-blue-600">{item.year}</h3>
                    <p className="mt-2 text-gray-700 font-medium">{item.title}</p>
                  </div>

                  <div className="hidden md:block md:w-2/12"></div>

                  {/* Deskripsi */}
                  <div className="mt-4 md:mt-0 md:w-5/12 md:pl-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center">
                      <p className="text-gray-600">{item.description}</p>
                      <FontAwesomeIcon icon={faArrowRight} className="ml-4 text-blue-400 text-lg" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">Memuat data...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
