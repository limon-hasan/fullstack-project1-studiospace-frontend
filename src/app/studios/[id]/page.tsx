import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  MapPin,
  Users,
  Maximize2,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StudioDetailsPage({ params }: PageProps) {
  const { id } = await params;

  let studio = null;

  try {
    const res = await fetch(`http://localhost:8000/studios/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      studio = await res.json();
    }
  } catch (error) {
    console.error("Error fetching studio details:", error);
  }

  // ডাটাবেজে স্টুডিও না পাওয়া গেলে 404 পেজ ট্রিগার হবে
  if (!studio) {
    notFound();
  }

  const studioTitle =
    studio.title || studio.name || studio.studioName || "Creative Studio Space";
  const studioImage =
    studio.image ||
    studio.images?.[0] ||
    studio.coverImage ||
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200";
  const hourlyRate =
    studio.pricePerHour || studio.price || studio.hourlyRate || 75;
  const dimensions =
    studio.specs?.dimensions ||
    studio.dimensions ||
    studio.size ||
    "1,200 sq.ft";
  const capacity = studio.specs?.capacity || studio.capacity || "15 People";
  const minBooking = studio.specs?.minBooking || studio.minBooking || "2 Hours";

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Featured Spaces</span>
        </Link>

        {/* Studio Title & Meta Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              {studio.category || "Creative Studio"}
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-foreground bg-muted/40 px-2.5 py-1 rounded-full border border-border/50">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{studio.rating || 5.0}</span>
              <span className="text-muted-foreground">
                ({studio.reviewsCount || studio.reviews || 24} reviews)
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {studioTitle}
          </h1>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>
              {studio.location || studio.address || "Location unavailable"}
            </span>
          </div>
        </div>

        {/* Main Image Showcase */}
        <div className="relative w-full h-72 sm:h-96 md:h-[480px] rounded-3xl overflow-hidden border border-border/70 bg-card shadow-sm">
          <Image
            src={studioImage}
            alt={studioTitle}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Layout: Details + Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column (2 Cols): Overview & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl border border-border/60 bg-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Floor Area
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {dimensions}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Capacity
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {capacity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Min Booking
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {minBooking}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">
                About This Space
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {studio.description ||
                  "Fully equipped creative production space optimized for photography, cinematography, and sound production. Includes dedicated power drops and acoustic treatment."}
              </p>
            </div>

            {/* Amenities Grid */}
            {studio.amenities && studio.amenities.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border/50">
                <h2 className="text-lg font-bold text-foreground">
                  Included Equipment & Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {studio.amenities.map((item: string) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-xs text-foreground/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (1 Col): Sticky Booking Widget */}
          <div className="sticky top-24 p-6 rounded-3xl border border-border/80 bg-card shadow-sm space-y-6">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  ${hourlyRate}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {" "}
                  / hour
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                Instant Confirmation
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Reservation</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Zero cancellation fees up to 48 hrs before shoot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
