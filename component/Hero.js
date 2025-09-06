"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Hero() {
  const slides = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  return (
    <section className="relative h-[80vh] w-full">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation
        className="h-full w-full"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-[80vh] w-full">
              <Image
                src={src}
                alt={`Slide ${i}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Text Content on Top */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6">
        <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          Discover the Latest Tech Gadgets
        </h2>
        <p className="text-lg mb-8 max-w-2xl drop-shadow-md">
          Upgrade your lifestyle with our curated collection of modern electronics and accessories.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
