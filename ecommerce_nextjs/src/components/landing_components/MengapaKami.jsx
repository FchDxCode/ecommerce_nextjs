"use client";

import { useEffect, useState } from "react";
import { fetchMengapaKami } from "../../api/ApiMengapaKami"; // Import API
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WavesSedeng from "../WavesSedeng";

export default function MengapaKami() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMengapaKami();
      setItems(data);
    };

    getData();
  }, []);

  return (
    <section className="relative pb-10 pt-16 overflow-hidden">
      <div className="absolute overflow-hidden bottom-0 left-0 w-full">
        <WavesSedeng />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Mengapa Kami Terbaik 🏆
        </h2>

        {items.length === 0 ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center mx-auto w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full text-white mb-6">
                  <FontAwesomeIcon icon={item.icon} className="text-3xl" />
                </div>

                <h3 className="text-xl text-center font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
