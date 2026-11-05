import { Search, CalendarCheck, Clapperboard, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    title: "Discover & Filter",
    description:
      "Explore verified production spaces tailored to your discipline—from daylight cyc walls to sound-isolated music suites.",
    icon: Search,
  },
  {
    step: "02",
    title: "Book Confidently",
    description:
      "Select your date and hourly slot. Enjoy transparent pricing with zero surprise equipment or facility add-on fees.",
    icon: CalendarCheck,
  },
  {
    step: "03",
    title: "Create Without Friction",
    description:
      "Arrive, verify entry, access pre-configured studio lighting and audio gear, and execute your production on schedule.",
    icon: Clapperboard,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 bg-background border-b border-border/60 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold">
            Simple 3-Step Process
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            How StudioSpace Works
          </h2>
          <p className="text-sm text-muted-foreground">
            Streamlined studio rentals designed specifically for solo creators,
            production crews, and recording artists.
          </p>
        </div>

        {/* 3-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 sm:p-8 rounded-3xl border border-border/70 bg-card/60 backdrop-blur-xs flex flex-col justify-between hover:border-primary/40 hover:bg-card transition-all duration-200 group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-primary/80 font-mono tracking-tight group-hover:text-primary transition-colors">
                      {item.step}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Step Indicator Accent */}
                <div className="mt-6 pt-4 border-t border-border/40 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                  <span>Phase {index + 1} of 3</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md hover:gap-2.5 cursor-pointer"
          >
            <span>Explore All Spaces Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
