"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Untuk navigasi ke halaman produk
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { fetchKategoriProducts } from "../../api/ApiKategoriProduct"; // Import API

export default function ProductKategoriLanding() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchKategoriProducts();
      setCategories(data);
    };

    getCategories();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-gray-100 via-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Kategori Produk 📦
        </h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            1200: { slidesPerView: 5 },
            992: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            576: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <a
                href={`/product?category=${category.id}`}
                className="block w-full"
              >
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 hover:rotate-1 transition-transform duration-500">
                  <div className="relative">
                    <img
                      src={category.image}
                      className="w-full h-48 object-cover"
                      alt={category.title}
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
