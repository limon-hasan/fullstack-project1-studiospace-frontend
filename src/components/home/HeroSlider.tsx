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
  ShieldCheck,
  Layers,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const SLIDES = [
  {
    id: 1,
    tag: "Film & Photo Production",
    badge: "1,400 sq.ft • Motorized Cyc Wall",
    headline: "Architectural Cycloramas & Production Stages",
    subtext:
      "Daylight-flooded infinity coves, motorized overhead grids, and 3-phase power drops engineered for commercial cinema sets.",
    image:
      "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=1600&auto=format&fit=crop",
    exploreHref: "/studios?category=sound-stage",
    hourlyRate: "$85/hr",
  },
  {
    id: 2,
    tag: "Audio & Mastering Suite",
    badge: "Dolby Atmos 7.1.4 • Vintage Neve Desk",
    headline: "Acoustically Tuned Dolby Atmos Suites",
    subtext:
      "Precision-treated control rooms with vintage analog channel strips, outboard tube compressors, and calibrated reference monitoring.",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1600&auto=format&fit=crop",
    exploreHref: "/studios?category=music",
    hourlyRate: "$65/hr",
  },
  {
    id: 3,
    tag: "Live Broadcast & Podcast",
    badge: "4K Blackmagic Switcher • 4x Shure SM7B",
    headline: "Broadcast-Ready Creator Lounges",
    subtext:
      "Multi-mic acoustic sound lounges with automated lighting scenes, dedicated switchers, and zero-latency audio interfaces.",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1600&auto=format&fit=crop",
    exploreHref: "/studios?category=podcast",
    hourlyRate: "$50/hr",
  },
];

export default function HeroSlider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={900}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        observer={true}
        observeParents={true}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="hero-swiper h-[560px] sm:h-[620px] w-full"
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className="relative w-full h-full select-none"
          >
            {/* 1. Full-Width Background Image with Clean Cinematic Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority={index === 0}
                unoptimized
                className="object-cover brightness-[0.6] scale-105 transition-transform duration-1000 ease-out"
              />
              {/* লেফট টু রাইট ও বটম গ্রেডিয়েন্ট যা টেক্সট ক্লিয়ার রাখে */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent z-1" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 z-1" />
            </div>

            {/* 2. Slide Content - Aligned to max-w-6xl */}
            <div className="relative z-10 max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-left">
              <div className="max-w-2xl space-y-4 sm:space-y-5">
                {/* Micro-Spec Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-white text-xs font-semibold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{slide.tag}</span>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-slate-300 text-xs">
                    <Layers className="w-3 h-3 text-slate-400" />
                    <span>{slide.badge}</span>
                  </div>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]">
                  {slide.headline}
                </h1>

                {/* Subtext */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
                  {slide.subtext}
                </p>

                {/* Pricing & Host Highlight */}
                <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
                  <span className="font-semibold text-white bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                    From {slide.hourlyRate}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    Verified Host Guarantee
                  </span>
                </div>

                {/* Mandatory CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    href={slide.exploreHref}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-slate-100 transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>Explore Studios</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/add-studio"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-slate-300" />
                    <span>Host Your Space</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 3. Bottom Slide Switcher Tabs & Numeric Counter (Aligned inside max-w-6xl) */}
      <div className="absolute bottom-5 left-0 right-0 z-20 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Interactive Slide Pills */}
          <div className="hidden md:flex items-center gap-2 pointer-events-auto">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => swiperInstance?.slideToLoop(idx)}
                className={`text-left px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md ${
                  activeIndex === idx
                    ? "bg-white/20 text-white font-medium border border-white/25 shadow-xs"
                    : "bg-black/30 text-slate-400 hover:text-white hover:bg-black/50 border border-white/10"
                }`}
              >
                <span className="text-[10px] font-mono opacity-60">
                  0{idx + 1}
                </span>
                <span>{slide.tag.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Slide Index Progress Counter & Controls */}
          <div className="flex items-center gap-3 pointer-events-auto ml-auto md:ml-0 bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl">
            <span className="text-xs font-mono text-slate-400">
              <strong className="text-white">0{activeIndex + 1}</strong> / 0
              {SLIDES.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                aria-label="Previous Slide"
                className="w-7 h-7 rounded-md border border-white/15 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => swiperInstance?.slideNext()}
                aria-label="Next Slide"
                className="w-7 h-7 rounded-md border border-white/15 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all cursor-pointer"
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
