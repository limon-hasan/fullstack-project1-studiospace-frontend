"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clapperboard,
} from "lucide-react";

// Swiper CSS Styles
import "swiper/css";
import "swiper/css/effect-fade";

const SLIDES = [
  {
    id: 1,
    category: "Film & Photo Production",
    specs: "1,400 sq.ft • Motorized Cyc Wall",
    title: "Architectural Cycloramas & Production Stages",
    description:
      "Daylight-flooded infinity coves, motorized overhead grids, and 3-phase power drops engineered for commercial cinema sets.",
    price: "From $85/hr",
    badge: "Verified Host Guarantee",
    categoryTab: "01 Film",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1920",
  },
  {
    id: 2,
    category: "Acoustic Audio & Recording",
    specs: "850 sq.ft • SSL Console & Vocal Booth",
    title: "World-Class Analog Suites & Tracking Rooms",
    description:
      "Tuned acoustic spaces equipped with vintage outboard preamps, isolated live rooms, and reference monitoring for pristine audio capture.",
    price: "From $110/hr",
    badge: "Acoustically Certified",
    categoryTab: "02 Audio",
    image:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1920",
  },
  {
    id: 3,
    category: "Broadcast & Live Production",
    specs: "1,100 sq.ft • 4K Multi-Cam Switcher",
    title: "Multi-Cam Broadcast & Virtual Streaming Sets",
    description:
      "Low-latency gigabit fiber connectivity, robotic PTZ camera arrays, and custom RGB lighting matrices built for premium live broadcasts.",
    price: "From $95/hr",
    badge: "Gigabit Fiber Ready",
    categoryTab: "03 Live",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920",
  },
];

export default function HeroSlider() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // ব্রাউজারে মাউন্ট হওয়ার পর Swiper লোড নিশ্চিত করা (Asynchronous microtask দিয়ে cascading render সমাধান)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // SSR / Prerender এর সময় ক্লিন স্কেলিটন স্টেট
  if (!isMounted) {
    return (
      <section className="relative w-full h-[540px] sm:h-[620px] bg-background border-b border-border/60 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-background border-b border-border/60">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={900}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="w-full h-[540px] sm:h-[620px]"
      >
        {SLIDES.map((slide, idx) => (
          <SwiperSlide
            key={slide.id}
            className="relative w-full h-full select-none"
          >
            {/* Background Image with Pure Dark Cinematic Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover object-center scale-105 transition-transform duration-[6000ms] ease-out"
              />
              {/* লাইট এবং ডার্ক উভয় মোডেই ছবি ক্রিস্প রাখার জন্য পিওর ডার্ক গ্র্যাডিয়েন্ট */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl space-y-4 sm:space-y-5">
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/20 text-white text-xs font-semibold backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{slide.category}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/10 text-white/90 text-xs font-medium backdrop-blur-md">
                    <span>{slide.specs}</span>
                  </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                  {slide.title}
                </h1>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed max-w-xl font-normal">
                  {slide.description}
                </p>

                {/* Price & Guarantee Callouts */}
                <div className="flex items-center gap-3 pt-1 text-xs">
                  <span className="font-bold text-white bg-white/15 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    {slide.price}
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{slide.badge}</span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  {/* Explore Studios Link */}
                  <Link
                    href="/studios"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-md"
                  >
                    <span>Explore Studios</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Host Your Space -> /add-studio তে রিডাইরেক্ট হবে */}
                  <Link
                    href="/add-studio"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all backdrop-blur-md"
                  >
                    <Clapperboard className="w-4 h-4" />
                    <span>Host Your Space</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-6 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md p-1 rounded-xl border border-white/15">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeIndex === index
                    ? "bg-white/25 text-white shadow-xs"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {slide.categoryTab}
              </button>
            ))}
          </div>

          {/* Slide Counter & Arrow Controls */}
          <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
            <span className="text-xs font-mono font-bold text-white">
              0{activeIndex + 1}{" "}
              <span className="text-zinc-500">/ 0{SLIDES.length}</span>
            </span>

            <div className="flex items-center gap-1 border-l border-white/15 pl-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                type="button"
                className="p-1 rounded-md text-zinc-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                type="button"
                className="p-1 rounded-md text-zinc-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
