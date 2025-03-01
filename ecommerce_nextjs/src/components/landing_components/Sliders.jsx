"use client";

import { useEffect, useState, useRef } from "react";
import Glide from "@glidejs/glide";
import { motion } from "framer-motion";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { fetchSliders } from "../../api/ApiSliders"; // Import fungsi fetch API

export default function Sliders() {
  const glideRef = useRef(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSlides = async () => {
      const data = await fetchSliders();
      setSlides(data);
      setLoading(false);
    };

    getSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const glide = new Glide(glideRef.current, {
      type: "carousel",
      perView: 1,
      focusAt: "center",
      autoplay: 3000,
      hoverpause: false,
      animationDuration: 800,
    });

    glide.mount();

    return () => {
      glide.destroy();
    };
  }, [slides]);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="">
      <div className="glide relative" ref={glideRef}>
        <div className="glide__track" data-glide-el="track">
          <div className="glide__slides">
            {slides.map((slide, idx) => (
              <div key={idx} className="glide__slide relative h-[600px]">
                {/* Background Image */}
                <img
                  src={slide.image}
                  className="w-full h-[600px] object-cover"
                  alt="Slide Image"
                />

                {/* Overlay dan Konten */}
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="text-center text-white px-4 md:px-8">
                    <motion.h1
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2 }}
                      className="text-lg md:text-xl mb-6 drop-shadow-lg"
                    >
                      {slide.description}
                    </motion.p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Navigasi */}
        <div className="absolute inset-0 flex justify-between items-center px-6" data-glide-el="controls">
          <button className="text-white text-3xl bg-black/40 p-3 rounded-full hover:bg-black/60 transition" data-glide-dir="<">
            ❮
          </button>
          <button className="text-white text-3xl bg-black/40 p-3 rounded-full hover:bg-black/60 transition" data-glide-dir=">">
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}
