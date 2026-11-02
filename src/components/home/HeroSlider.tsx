"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const SLIDES = [
  {
    id: 1,
    tag: "Film & Cinematography",
    headline: "Turn Cinematic Visions Into Masterpieces",
    subtext:
      "Reserve soundproof cinema sound stages, motorized lighting grids, and seamless cyclorama walls built for high-end film crews.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop",
    exploreHref: "/studios?category=sound-stage",
  },
  {
    id: 2,
    tag: "Music & Audio Production",
    headline: "Record in Acoustically Calibrated Suites",
    subtext:
      "Book pristine recording studios equipped with analog outboard gear, vintage preamps, and calibrated Dolby Atmos monitoring.",
    image:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1600&auto=format&fit=crop",
    exploreHref: "/studios?category=music",
  },
  {
    id: 3,
    tag: "Podcast & Live Broadcast",
    headline: "Stream & Record with Zero Production Friction",
    subtext:
      "Acoustic broadcast lounges with multi-camera 4K setups, Shure SM7B mics, and dedicated switchers ready for immediate streaming.",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1600&auto=format&fit=crop",
    exploreHref: "/studios?category=podcast",
  },
];

export default function HeroSlider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        // Next.js page navigation-er por autoplay o rendering thik rakhar jonno
        observer={true}
        observeParents={true}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        className="hero-swiper h-[540px] sm:h-[620px] w-full"
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className="relative w-full h-full select-none"
          >
            {/* 1. Background Image with Permanent Cinematic Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority={index === 0}
                unoptimized
                className="object-cover brightness-[0.55]"
              />
              {/* Ekhane permanent dark gradient deway Light o Dark ubhoy mode-ei UI crisp thakbe */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30" />
            </div>

            {/* 2. Content Overlay */}
            <div className="relative z-10 max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-left">
              <div className="max-w-2xl space-y-4">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-medium tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{slide.tag}</span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  {slide.headline}
                </h1>

                {/* Subtext */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal">
                  {slide.subtext}
                </p>

                {/* Mandatory CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={slide.exploreHref}
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <span>Explore Studios</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/add-studio"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/30 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Host Your Space</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 3. Custom Frosted-Glass Navigation Arrows (Ugly Blue Buttons replaced) */}
      <button
        onClick={() => swiperInstance?.slidePrev()}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => swiperInstance?.slideNext()}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
