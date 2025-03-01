"use client";

import { useEffect, useState } from "react";
import { fetchTestimonials } from "../../api/ApiTestimonial"; // Import API
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import WavesKecil from "../Waveskecil";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTestimonials();
      setTestimonials(data);
    };

    getData();
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Wave Background Atas */}
      <div className="absolute bottom-0 overflow-hidden left-0 w-full">
        <WavesKecil />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-4xl font-extrabold text-center mb-20 text-gray-900">
          Testimonial 📝
        </h2>

        {testimonials.length === 0 ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            loop={true}
            centeredSlides={true}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            breakpoints={{
              1024: { slidesPerView: 3 }, // Desktop
              768: { slidesPerView: 2 }, // Tablet
            }}
            className="swiper-container"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="select-none relative bg-white/30 backdrop-blur-lg border border-gray-500 shadow-lg rounded-lg p-6 h-[500px] flex flex-col justify-between transition-transform hover:scale-105 duration-300">
                  {/* Gambar Produk */}
                  <div className="relative h-56 rounded-lg overflow-hidden">
                    <img
                      src={item.brandImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
                  </div>

                  {/* Logo Perusahaan */}
                  <div className="flex items-center justify-center -mt-10">
                    <div className="bg-white p-3 rounded-full shadow-md transform transition-transform hover:scale-110">
                      <img
                        src={item.profileImage}
                        alt={item.companyName}
                        className="h-14 w-14 object-contain"
                      />
                    </div>
                  </div>

                  {/* Konten Testimonial */}
                  <div className="px-6 py-4 text-center flex flex-col justify-center">
                    <p className="text-gray-600 italic text-lg mb-4">
                      <span className="text-blue-600 font-bold text-2xl">“</span>
                      {item.feedback}
                      <span className="text-blue-600 font-bold text-2xl">”</span>
                    </p>
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.companyName}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
