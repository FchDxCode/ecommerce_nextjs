"use client";

import { useEffect, useState } from "react";
import { fetchKlien } from "../../api/ApiKlienKami"; // Import API
import Marquee from "react-fast-marquee";

export default function Klien() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchKlien();
      setLogos(data);
    };

    getData();
  }, []);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          Klien Kami 🤝🏻
        </h2>

        {logos.length === 0 ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <>
            {/* Baris Atas (Ke Kanan) */}
            <Marquee gradient={false} speed={40} className="mb-10">
              {logos.map((client, idx) => (
                <div key={client.id} className="mx-5 flex items-center justify-center">
                  <img
                    src={client.image}
                    alt={`Client ${idx + 1}`}
                    className="h-36 object-contain"
                  />
                </div>
              ))}
            </Marquee>

            {/* Baris Bawah (Ke Kiri) */}
            <Marquee gradient={false} speed={40} direction="right">
              {logos.map((client, idx) => (
                <div key={client.id} className="mx-5 flex items-center justify-center">
                  <img
                    src={client.image}
                    alt={`Client ${idx + 1}`}
                    className="h-36 object-contain"
                  />
                </div>
              ))}
            </Marquee>
          </>
        )}
      </div>
    </section>
  );
}
