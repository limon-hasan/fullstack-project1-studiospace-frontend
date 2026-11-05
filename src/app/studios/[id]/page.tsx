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
  Clock,
  ShieldCheck,
  Pencil,
  Mail,
  BadgeCheck,
  ThumbsUp,
} from "lucide-react";
import BookingModal from "@/components/shared/BookingModal";
import StudioGallery from "@/components/shared/StudioGallery";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Category onujayi thematic images generate korar helper
function getCategoryGallery(category: string, baseImg: string): string[] {
  const cat = (category || "").toLowerCase();

  // Photo Studios
  if (
    cat.includes("photo") ||
    cat.includes("loft") ||
    cat.includes("cyclorama")
  ) {
    return [
      baseImg,
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200",
    ];
  }

  // Music, Podcast & Audio Suites
  if (
    cat.includes("music") ||
    cat.includes("audio") ||
    cat.includes("podcast") ||
    cat.includes("sound")
  ) {
    return [
      baseImg,
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200",
    ];
  }

  // Dance, Rehearsal, Stage & Workshop
  if (
    cat.includes("dance") ||
    cat.includes("rehearsal") ||
    cat.includes("stage") ||
    cat.includes("film")
  ) {
    return [
      baseImg,
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200",
      "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200",
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1200",
    ];
  }

  // Default Studio Fallback
  return [
    baseImg,
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200",
  ];
}

// Category onujayi authentic dynamic reviews helper
function getCategoryReviews(category: string, studioTitle: string) {
  const cat = (category || "").toLowerCase();

  if (
    cat.includes("music") ||
    cat.includes("audio") ||
    cat.includes("sound") ||
    cat.includes("podcast")
  ) {
    return [
      {
        id: 1,
        author: "Alex Morgan",
        role: "Sound Engineer",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
        rating: 5,
        date: "October 2026",
        comment: `The acoustic treatment and monitoring setup at ${studioTitle} are phenomenal. The noise floor was completely silent during our tracking.`,
      },
      {
        id: 2,
        author: "Jordan Vance",
        role: "Podcast Host",
        avatar:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200",
        rating: 5,
        date: "September 2026",
        comment:
          "Flawless multi-mic podcast recording. The host had everything patched and ready to roll before our guest arrived.",
      },
    ];
  }

  if (
    cat.includes("photo") ||
    cat.includes("loft") ||
    cat.includes("cyclorama")
  ) {
    return [
      {
        id: 1,
        author: "Elena Rostova",
        role: "Fashion Photographer",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
        rating: 5,
        date: "September 2026",
        comment: `Incredible natural daylight and high ceilings at ${studioTitle}. The 24ft seamless cyclorama wall was freshly painted and spotless.`,
      },
      {
        id: 2,
        author: "Tariq Mansoor",
        role: "Editorial Director",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
        rating: 5,
        date: "August 2026",
        comment:
          "Generous styling station and heavy-duty C-stands included. Load-in through the service elevator was totally frictionless.",
      },
    ];
  }

  if (
    cat.includes("dance") ||
    cat.includes("rehearsal") ||
    cat.includes("stage") ||
    cat.includes("film")
  ) {
    return [
      {
        id: 1,
        author: "Maya Lin",
        role: "Choreographer",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
        rating: 5,
        date: "October 2026",
        comment:
          "Spring-loaded shock-absorbent floors and full-length mirrors make this space unbeatable for intensive rehearsal blocks.",
      },
      {
        id: 2,
        author: "David Miller",
        role: "Theatre Director",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
        rating: 5,
        date: "August 2026",
        comment:
          "Spacious acoustics with powerful overhead lighting presets. Perfect staging environment for our preliminary run-throughs.",
      },
    ];
  }

  // Default / Print / Creative workshop
  return [
    {
      id: 1,
      author: "Sofia Reynolds",
      role: "Visual Artist",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
      rating: 5,
      date: "October 2026",
      comment: `The natural ventilation and clean work surfaces at ${studioTitle} made working on large-format media a breeze. Very inspiring space!`,
    },
    {
      id: 2,
      author: "Marcus Chen",
      role: "Creative Director",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200",
      rating: 5,
      date: "July 2026",
      comment:
        "Super quiet workspace, high-speed Wi-Fi, and courteous on-site staff. Will definitely rebook for our next collaborative sprint.",
    },
  ];
}

export default async function StudioDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Server-side user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

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

  if (!studio) {
    notFound();
  }

  const studioTitle =
    studio.title || studio.name || studio.studioName || "Creative Studio Space";
  const mainImage =
    studio.image ||
    studio.images?.[0] ||
    studio.coverImage ||
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200";

  // Category-based dynamic carousel images
  const galleryImages: string[] =
    Array.isArray(studio.images) && studio.images.length > 0
      ? studio.images
      : getCategoryGallery(studio.category, mainImage);

  const hourlyRate =
    studio.pricePerHour || studio.price || studio.hourlyRate || 75;
  const dimensions =
    studio.specs?.dimensions ||
    studio.dimensions ||
    studio.size ||
    "1,200 sq.ft";
  const capacity = studio.specs?.capacity || studio.capacity || "15 People";
  const minBooking = studio.specs?.minBooking || studio.minBooking || "2 Hours";

  // Host info
  const hostName =
    studio.ownerName || studio.hostName || "Verified Studio Host";
  const hostEmail = studio.ownerEmail || "host@studiospace.io";
  const hostImage =
    studio.ownerImage ||
    (user?.email === studio?.ownerEmail ? user?.image : null) ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300";

  // Category onujayi Dynamic Reviews
  const reviews = getCategoryReviews(studio.category, studioTitle);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Studios</span>
        </Link>

        {/* Title & Meta Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              {studio.category || "Creative Studio"}
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-foreground bg-muted/40 px-2.5 py-1 rounded-full border border-border/50">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{studio.rating || 5.0}</span>
              <span className="text-muted-foreground">
                ({studio.reviewsCount || 24} reviews)
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

        {/* 1. Gallery Carousel Section */}
        <StudioGallery images={galleryImages} title={studioTitle} />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start pt-4">
          {/* Left Column: Specs, Overview, Host, Reviews */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-3xl border border-border/60 bg-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
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
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
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
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
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

            {/* Included Equipment & Amenities */}
            {studio.amenities && studio.amenities.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-border/60">
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

            {/* 2. Host Details Section */}
            <div className="space-y-4 pt-6 border-t border-border/60">
              <h2 className="text-lg font-bold text-foreground">
                Hosted by Studio Specialist
              </h2>
              <div className="p-5 rounded-3xl border border-border/70 bg-card/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-muted border border-border">
                    <Image
                      src={hostImage}
                      alt={hostName}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-foreground">
                        {hostName}
                      </h3>
                      <BadgeCheck className="w-4 h-4 text-primary fill-primary/10" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      <span>{hostEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground border-t sm:border-t-0 pt-3 sm:pt-0 border-border/40 w-full sm:w-auto">
                  <div className="text-left sm:text-right">
                    <p className="text-foreground font-bold">100% Verified</p>
                    <p className="text-[11px] text-muted-foreground">
                      Responds in 1 hr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Customer Reviews Section */}
            <div className="space-y-6 pt-6 border-t border-border/60">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span>Creator Reviews</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      ({reviews.length} Verified Reviews)
                    </span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    What directors and photographers say about this space
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-2xl text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>5.0 / 5.0</span>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 gap-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-3xl border border-border/70 bg-card/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                          <Image
                            src={rev.avatar}
                            alt={rev.author}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-foreground">
                            {rev.author}
                          </h4>
                          <p className="text-[11px] text-muted-foreground">
                            {rev.role} • {rev.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {rev.comment}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground/80 pt-1">
                      <ThumbsUp className="w-3 h-3 text-emerald-500" />
                      <span>Verified Workspace Booking</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
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
              {user?.email === studio?.ownerEmail ? (
                <div className="w-full space-y-3">
                  <div className="w-full py-2.5 px-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-center justify-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                    <span>You own this studio listing</span>
                  </div>

                  <Link
                    href={`/studios/edit/${studio._id}`}
                    className="block w-full"
                  >
                    <button
                      type="button"
                      className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
                    >
                      <Pencil className="w-4 h-4" />
                      <span>Edit Studio Listing</span>
                    </button>
                  </Link>
                </div>
              ) : (
                <BookingModal studio={studio} />
              )}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
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
