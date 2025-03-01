"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { fetchSliderKatalog } from "../../api/ApiSliderKatalog";

export default function HeaderKatalog() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const getSlides = async () => {
      const sliderData = await fetchSliderKatalog();
      setSlides(sliderData);
    };

    getSlides();
  }, []);

  return (
    <div>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg shadow-md"
      >
        {slides.length > 0 ? (
          slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full bg-cover h-[400px] object-cover rounded-lg"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/800x400?text=Loading+Slides"
              alt="Loading Slide"
              className="w-full bg-cover h-[400px] object-cover rounded-lg"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
