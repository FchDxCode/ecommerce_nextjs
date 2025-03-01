"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchHeaders } from "../../api/ApiHeroSections"; // Import API
import {
  faAward,
  faProjectDiagram,
  faBox,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

// Mapping icon dari API ke FontAwesome
const iconMap = {
  "fa-sharp fa-solid fa-medal": faAward,
  "fa-sharp fa-solid fa-diagram-project": faProjectDiagram,
  "fa-sharp fa-solid fa-cube": faBox,
  "fa-sharp fa-solid fa-people-group": faUsers,
};

export default function HeroSections() {
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const getHeaders = async () => {
      const data = await fetchHeaders();
      setHeaders(data);
      setLoading(false);
    };

    getHeaders();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("stats-section");
      if (section) {
        const { top } = section.getBoundingClientRect();
        if (top < window.innerHeight - 100) {
          setInView(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="-mt-[4rem] z-10 relative" id="stats-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {headers.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center border border-gray-200"
            >
              <div className="text-center">
                {/* Icon dari API */}
                <div className="text-4xl text-orange-500 mb-3">
                  <FontAwesomeIcon icon={iconMap[item.icon] || faAward} />
                </div>

                {/* Efek Angka yang Menghitung */}
                <div className="text-2xl font-bold text-blue-800">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={parseInt(item.title.replace(/\D/g, ""))} // Ambil angka dari title
                      duration={2.5}
                      separator=","
                      suffix={item.title.replace(/[0-9]/g, "")} // Ambil teks setelah angka
                    />
                  ) : (
                    "0"
                  )}
                </div>

                {/* Deskripsi */}
                <div className="text-gray-600 text-sm">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
