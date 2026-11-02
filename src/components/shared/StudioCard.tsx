import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ArrowUpRight } from "lucide-react";

export interface Studio {
  _id: string;
  title: string;
  category: string;
  image: string;
  hourlyRate: number;
  rating: number;
  reviewsCount: number;
  location: string;
}

interface StudioCardProps {
  studio: Studio;
}

export default function StudioCard({ studio }: StudioCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs hover:shadow-xl hover:border-border transition-all duration-300">
      {/* ১. Studio Image & Floating Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={studio.image}
          alt={studio.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-background/85 backdrop-blur-md text-foreground border border-border/60 shadow-xs">
            {studio.category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-background/85 backdrop-blur-md text-foreground border border-border/60 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{studio.rating.toFixed(1)}</span>
            <span className="text-[10px] text-muted-foreground font-normal">
              ({studio.reviewsCount})
            </span>
          </div>
        </div>
      </div>

      {/* ২. Card Content Body */}
      <div className="flex flex-col flex-1 p-5 justify-between gap-4">
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground/80" />
            <span className="truncate">{studio.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {studio.title}
          </h3>
        </div>

        {/* ৩. Hourly Rate & View Details Action */}
        <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-muted-foreground">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-extrabold text-foreground">
                ${studio.hourlyRate}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                / hr
              </span>
            </div>
          </div>

          <Link
            href={`/studios/${studio._id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
