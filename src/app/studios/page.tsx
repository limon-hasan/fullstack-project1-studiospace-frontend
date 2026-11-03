import type { ComponentProps } from "react";
import Link from "next/link";
import StudioCard from "@/components/shared/StudioCard";
import { Sparkles, SlidersHorizontal, Check } from "lucide-react";

type StudioItem = ComponentProps<typeof StudioCard>["studio"];

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

const CATEGORY_TABS = [
  "All",
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
  "Dance Studios",
];

// ব্যাকএন্ড API থেকে সব স্টুডিও ফেচ করার ফাংশন
async function getStudios(): Promise<StudioItem[]> {
  try {
    const res = await fetch("http://localhost:8000/studios", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = (await res.json()) as StudioItem[];
    return data;
  } catch (error) {
    console.error("Error fetching studios:", error);
    return [];
  }
}

export default async function StudiosPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const allStudios = await getStudios();

  const selectedCategory = category || "All";

  // ক্যাটাগরি অনুযায়ী স্টুডিও ফিল্টারিং
  const filteredStudios =
    selectedCategory === "All"
      ? allStudios
      : allStudios.filter(
          (s) =>
            s.category?.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim(),
        );

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available Spaces</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Explore All Studios
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              Browse world-class soundstages, acoustic suites, and daylight
              photography lofts ready for your next production.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-xl border border-border/50">
              Showing{" "}
              <strong className="text-foreground">
                {filteredStudios.length}
              </strong>{" "}
              spaces
            </span>
          </div>
        </div>

        {/* Category Filter Chips (Pre-selected based on URL) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isSelected =
              tab === "All"
                ? selectedCategory === "All"
                : selectedCategory.toLowerCase() === tab.toLowerCase();

            const href =
              tab === "All"
                ? "/studios"
                : `/studios?category=${encodeURIComponent(tab)}`;

            return (
              <Link
                key={tab}
                href={href}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-card text-muted-foreground border-border/70 hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{tab}</span>
              </Link>
            );
          })}
        </div>

        {/* Studios Grid */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStudios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          /* Empty Filter State */
          <div className="text-center py-20 border border-dashed border-border/70 rounded-3xl bg-card p-6 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-foreground">
              {`No studios found for "${selectedCategory}"`}
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              There are currently no spaces listed under this category. Try
              browsing other categories.
            </p>
            <div className="pt-2">
              <Link
                href="/studios"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
              >
                Clear Category Filter
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
