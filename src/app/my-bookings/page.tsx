"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  CalendarDays,
  Clock,
  DollarSign,
  MapPin,
  AlertCircle,
  Building2,
  Loader2,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CancelBookingModal from "@/components/shared/CancelBookingModal";

interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  userEmail: string;
  bookingDate: string;
  startTime?: string;
  endTime?: string;
  durationHours: number;
  totalPrice: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt?: string;
}

// 24-hour time string ("10:00") কে 12-hour format ("10:00 AM") এ রূপান্তর
const formatDisplayTime = (timeStr?: string) => {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length < 2) return timeStr;
  const h = Number(parts[0]);
  const m = parts[1];
  const period = h >= 12 ? "PM" : "AM";
  const adjustedHour = h % 12 || 12;
  return `${adjustedHour.toString().padStart(2, "0")}:${m} ${period}`;
};

export default function MyBookingsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/show-bookings?email=${encodeURIComponent(user.email)}`,
          { cache: "no-store" },
        );
        if (!res.ok) throw new Error("Failed to load your reservations.");
        const data = await res.json();
        setBookings(data);
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Failed to load bookings";
        toast.error("Error", { description: msg });
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [user?.email]);

  const handleCancelSuccess = (cancelledId: string) => {
    setBookings((prev) =>
      prev.map((item) =>
        item._id === cancelledId ? { ...item, status: "Cancelled" } : item,
      ),
    );
  };

  const handleConfirmBooking = async (bookingId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${bookingId}/confirm`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to confirm reservation.");

      toast.success("Reservation Confirmed!", {
        description:
          "Status is now Confirmed. Collision check will now block this slot.",
      });

      // পেজ রিলোড ছাড়াই সাথে সাথে UI স্টেট আপডেট
      setBookings((prev) =>
        prev.map((item) =>
          item._id === bookingId ? { ...item, status: "Confirmed" } : item,
        ),
      );
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Error confirming booking";
      toast.error("Action Failed", { description: msg });
    }
  };

  const renderStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "Pending":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Pending
          </span>
        );
      case "Confirmed":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Confirmed
          </span>
        );
      case "Completed":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            Completed
          </span>
        );
      case "Cancelled":
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  if (!user && !isPending) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Access Restricted</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Please sign in to view and track your studio bookings.
        </p>
        <Link href="/signin?callbackUrl=/my-bookings">
          <Button className="rounded-xl px-6 font-semibold cursor-pointer">
            Sign In to Continue
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-4 pb-12 sm:pt-8 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-border/60 pb-6 space-y-1">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            My Studio Bookings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Track and manage your upcoming creative workspace reservations.
          </p>
        </div>

        {/* Loading State */}
        {loading || isPending ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <p className="text-xs text-muted-foreground font-medium">
              Loading your bookings...
            </p>
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-3xl bg-background border border-border/80 shadow-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-indigo-500/30 transition-colors"
              >
                {/* Details */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-muted shrink-0">
                    <Image
                      src={booking.studioImage || "/placeholder.jpg"}
                      alt={booking.studioTitle}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-foreground truncate">
                        {booking.studioTitle}
                      </h3>
                      {renderStatusBadge(booking.status)}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{booking.studioLocation}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5 text-indigo-500" />
                        {booking.bookingDate}
                      </span>

                      {/* Start Time - End Time display */}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {booking.startTime && booking.endTime
                          ? `${formatDisplayTime(booking.startTime)} - ${formatDisplayTime(booking.endTime)} (${booking.durationHours} hrs)`
                          : `${booking.durationHours} hrs`}
                      </span>

                      <span className="flex items-center font-bold text-emerald-600 dark:text-emerald-400">
                        <DollarSign className="w-3.5 h-3.5 stroke-[2.5]" />
                        {booking.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="w-full sm:w-auto flex items-center justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-border/60">
                  <Link href={`/studios/${booking.studioId}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl text-xs font-semibold gap-1.5 cursor-pointer hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/30"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Studio</span>
                    </Button>
                  </Link>

                  {/* Pending থাকলে Confirm এবং Cancel দুটি বাটনই দেখাবে */}
                  {booking.status === "Pending" && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfirmBooking(booking._id)}
                        className="rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/30 gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm</span>
                      </Button>

                      <CancelBookingModal
                        bookingId={booking._id}
                        studioTitle={booking.studioTitle}
                        onCancelSuccess={handleCancelSuccess}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border/80 rounded-3xl bg-background p-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              No Bookings Found
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              You haven&apos;t reserved any studios yet. Explore our creative
              spaces to book photo lofts, podcast suites, or sound stages.
            </p>
            <div className="pt-2">
              <Link href="/studios">
                <Button className="h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 cursor-pointer shadow-md">
                  Explore Studios
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
