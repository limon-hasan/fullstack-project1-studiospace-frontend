import Link from "next/link";
import {
  Camera,
  Film,
  Music2,
  Mic2,
  Palette,
  Activity,
  ArrowUpRight,
} from "lucide-react";

// Amader database-e thaka 6-ti discipline/category data
const CATEGORIES = [
  {
    id: "photo-studios",
    name: "Photo Studios",
    description: "Natural daylight, cyc walls & flash gear",
    icon: Camera,
    count: "15+ Spaces",
  },
  {
    id: "sound-stages",
    name: "Sound Stages",
    description: "Acoustic isolation, lighting grids & green screen",
    icon: Film,
    count: "8+ Stages",
  },
  {
    id: "music-suites",
    name: "Music Suites",
    description: "Tuned control rooms & vintage analog gear",
    icon: Music2,
    count: "12+ Suites",
  },
  {
    id: "podcast-rooms",
    name: "Podcast Rooms",
    description: "Multi-mic setups & 4K broadcast switching",
    icon: Mic2,
    count: "10+ Rooms",
  },
  {
    id: "art-workshops",
    name: "Art Workshops",
    description: "Sculpting, ceramics & ventilated maker spaces",
    icon: Palette,
    count: "6+ Workshops",
  },
  {
    id: "dance-studios",
    name: "Dance Studios",
    description: "Sprung floors, mirrored walls & high ceilings",
    icon: Activity,
    count: "9+ Studios",
  },
];

export default function StudioCategories() {
  return (
    <section className="py-16 sm:py-20 bg-background border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Browse by Creative Discipline
          </h2>
          <p className="text-sm text-muted-foreground">
            Find purpose-built environments tailored to your specific creative
            production needs.
          </p>
        </div>

        {/* Categories Grid (Mobile: 1, Tablet: 2, Desktop: 3 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/studios?category=${encodeURIComponent(cat.name)}`}
                className="group relative p-6 rounded-2xl border border-border/70 bg-card hover:bg-card/80 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  {/* Category Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title & Arrow */}
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-0 group-hover:opacity-100" />
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Footer Count & Link */}
                <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">
                    {cat.count}
                  </span>
                  <span className="text-primary font-semibold text-[11px] group-hover:underline">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
