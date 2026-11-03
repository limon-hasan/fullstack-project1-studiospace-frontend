import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import StudioCard, { Studio } from "@/components/shared/StudioCard";

// Backend theke MongoDB-r top 6-ti studio fetch korar function
async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch("http://localhost:8000/featured-studios", {
      cache: "no-store", // dynamic real-time data fetching
    });

    if (!res.ok) {
      throw new Error("Failed to fetch featured studios");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching featured studios from DB:", error);
    return [];
  }
}

export default async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="py-16 sm:py-20 bg-background border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{"Top Rated Creators' Choice"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Featured Studio Spaces
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Curated, production-ready creative environments verified for
              acoustic isolation, high-output power, and professional equipment.
            </p>
          </div>

          <Link
            href="/studios"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            <span>Explore All Spaces</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Dynamic MongoDB Grid */}
        {studios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground text-sm border border-dashed rounded-xl">
            No featured studios found in database.
          </div>
        )}
      </div>
    </section>
  );
}
