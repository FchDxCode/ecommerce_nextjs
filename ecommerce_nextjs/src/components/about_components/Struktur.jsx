"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchCompanyStructure } from "../../api/ApiCompanyStructure";

export default function Struktur() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const getTeamMembers = async () => {
      const data = await fetchCompanyStructure();
      console.log("📌 Team Members:", data); // Debugging
      setTeamMembers(data);
    };

    getTeamMembers();
  }, []);

  if (teamMembers.length === 0) {
    return <p className="text-center text-gray-500 py-10">Memuat data...</p>;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Struktur Perusahaan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 text-center relative overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              {/* Background Gradient di Atas */}
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>

              {/* Gambar / Ikon */}
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6 shadow-md overflow-hidden">
                {member.icon && (
                  <img
                    src={`http://localhost:1337${member.icon.url}`}
                    alt={member.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>

              {/* Role & Nama */}
              <h3 className="text-xl font-bold text-gray-900">{member.title}</h3>
              <p className="mt-2 text-gray-600">{member.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
