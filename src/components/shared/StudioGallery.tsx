"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface StudioGalleryProps {
  images: string[];
  title: string;
}

export default function StudioGallery({ images, title }: StudioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Large Carousel Viewport */}
      <div className="group relative w-full h-72 sm:h-96 md:h-[460px] rounded-3xl overflow-hidden border border-border/80 bg-muted shadow-sm">
        <Image
          src={images[activeIndex] || "/placeholder.jpg"}
          alt={`${title} - view ${activeIndex + 1}`}
          fill
          priority
          unoptimized
          className="object-cover transition-all duration-500 ease-out"
        />

        {/* Floating Tag */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/10">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Featured Studio View</span>
        </div>

        {/* Slide Counter Pill */}
        <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-xs font-semibold text-white border border-white/10">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Prev & Next Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Bar */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-2xl overflow-hidden shrink-0 transition-all border-2 cursor-pointer ${
                activeIndex === idx
                  ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
                  : "border-border/70 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
