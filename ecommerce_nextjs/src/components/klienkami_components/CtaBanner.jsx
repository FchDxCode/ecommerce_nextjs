"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { fetchCtaBanner } from "../../api/ApiCtaBanner";

export default function CtaBanner() {
  const [ctaData, setCtaData] = useState(null);

  useEffect(() => {
    const getCtaData = async () => {
      const data = await fetchCtaBanner();
      setCtaData(data);
    };

    getCtaData();
  }, []);

  if (!ctaData) {
    return <p className="text-center py-10 text-gray-500">Memuat CTA Banner...</p>;
  }

  return (
    <div className="pt-24">
      <motion.section
        className="relative rounded-lg overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url('${ctaData.image}')`,
          height: "450px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Efek parallax
        }}
      >
        {/* Overlay gradient dengan efek blur */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        {/* Konten teks */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h2
            className="text-4xl font-extrabold mb-4 drop-shadow-lg md:text-5xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {ctaData.title}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {ctaData.subtitle}
          </motion.p>
          <motion.a
            href={ctaData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 text-lg font-bold rounded-full bg-green-500/10 text-white shadow-xl transition-all hover:bg-green-600/40 border border-green-500 hover:shadow-2xl hover:scale-110"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FontAwesomeIcon icon={faPhone} className="text-2xl mr-3 animate-pulse" />
            Hubungi Kami
            <FontAwesomeIcon icon={faArrowRight} className="text-lg ml-3 transition-transform duration-300 group-hover:translate-x-2" />
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
