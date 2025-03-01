"use client";

import { useEffect, useState } from "react";
import { fetchCoverTentangKami } from "../../api/ApiCoverTentangKami";

export default function Header() {
  const [coverData, setCoverData] = useState(null);

  useEffect(() => {
    const getCoverData = async () => {
      const data = await fetchCoverTentangKami();
      setCoverData(data);
    };

    getCoverData();
  }, []);

  if (!coverData) {
    return <p className="text-center py-10">Memuat data...</p>;
  }

  return (
    <div>
      <header className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Section */}
            <div className="lg:col-span-7">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                {coverData.title.split(" ").slice(0, 2).join(" ")}{" "}
                <span className="text-yellow-300">
                  {coverData.title.split(" ").slice(2).join(" ")}
                </span>
              </h1>
              <p className="mt-8 text-lg leading-relaxed">
                {coverData.subtitle}
              </p>

              <ul className="mt-8 space-y-5">
                {coverData.content.split("\n\n").map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="h-8 w-8 flex items-center justify-center bg-yellow-300/20 text-blue-800 rounded-full mr-4">
                      ⭐
                    </span>
                    <p className="text-base">{item.replace("⭐ ", "")}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section (Hero Image) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative">
                <img
                  src={`http://localhost:1337${coverData.cover.url}`}
                  alt={coverData.title}
                  className="rounded-xl shadow-2xl w-full h-auto object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-yellow-300 rounded-full h-20 w-20 flex items-center justify-center animate-pulse">
                  🚀
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Wave Shape */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-24 fill-current text-white"
          >
            <path d="M0,96L120,80C240,64,480,32,720,21.3C960,11,1200,21,1320,26.7L1440,32V120H1320C1200,120,960,120,720,120C480,120,240,120,120,120H0Z"></path>
          </svg>
        </div>
      </header>
    </div>
  );
}
