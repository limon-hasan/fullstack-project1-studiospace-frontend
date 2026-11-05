"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Loader2,
  Timer,
} from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface BookingModalProps {
  studio: {
    _id: string;
    title: string;
    hourlyRate: number;
    image: string;
    location: string;
  };
}

export default function BookingModal({ studio }: BookingModalProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("14:00");
  const [loading, setLoading] = useState(false);

  // Start Time ebong End Time theke Duration (Hours) hishab kora
  const durationHours = useMemo(() => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const diffMinutes = endH * 60 + endM - (startH * 60 + startM);
    const hours = diffMinutes / 60;
    return hours > 0 ? Number(hours.toFixed(1)) : 0;
  }, [startTime, endTime]);

  // Total price calculation
  const totalPrice =
    Number(studio.hourlyRate || 0) * (durationHours > 0 ? durationHours : 1);

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (!user?.email) {
      e.preventDefault();
      toast.error("Authentication Required", {
        description: "Please sign in to book this studio workspace.",
      });

      const currentPath =
        typeof window !== "undefined" && window.location.pathname
          ? window.location.pathname
          : `/studios/${studio._id}`;

      router.push(`/signin?callbackUrl=${encodeURIComponent(currentPath)}`);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && !user?.email) {
      setOpen(false);
      return;
    }
    setOpen(isOpen);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Authentication Required", {
        description: "Please sign in to book this studio workspace.",
      });
      setOpen(false);
      const currentPath =
        typeof window !== "undefined" && window.location.pathname
          ? window.location.pathname
          : `/studios/${studio._id}`;
      router.push(`/signin?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    if (!bookingDate) {
      toast.error("Validation Error", {
        description: "Please select a reservation date.",
      });
      return;
    }

    if (durationHours <= 0) {
      toast.error("Invalid Time Range", {
        description: "End time must be later than start time.",
      });
      return;
    }

    setLoading(true);

    const bookingPayload = {
      studioId: studio._id,
      studioTitle: studio.title,
      studioImage: studio.image,
      studioLocation: studio.location,
      userEmail: user.email,
      userName: user.name || "Anonymous",
      bookingDate,
      startTime,
      endTime,
      durationHours,
      totalPrice,
      status: "Pending",
    };
    const token = await getTokenFromClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-my-bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingPayload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to reserve the workspace slot.",
        );
      }

      toast.success("Reservation Placed!", {
        description: `Your booking for "${studio.title}" (${startTime} - ${endTime}) is pending confirmation.`,
      });

      setOpen(false);
      router.push("/my-bookings");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Booking request failed";
      toast.error("Booking Error", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        onClick={handleTriggerClick}
        className="h-12 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Workspace Now</span>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-lg rounded-3xl border border-border bg-background p-6 shadow-2xl">
        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="text-xl font-extrabold text-foreground">
            Reserve Studio Slot
          </DialogTitle>
          <p className="text-xs text-muted-foreground">
            Choose your date and time window to request this creative space.
          </p>
        </DialogHeader>

        {/* Studio Quick Overview Card */}
        <div className="w-full flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border/60 overflow-hidden">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-muted">
            <Image
              src={studio.image}
              alt={studio.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-0.5">
            <h4
              className="text-sm font-bold text-foreground truncate"
              title={studio.title}
            >
              {studio.title}
            </h4>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground truncate">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="truncate">{studio.location}</span>
            </div>
            <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
              ${studio.hourlyRate}/hour
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
          {/* Booking Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              Reservation Date *
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground [color-scheme:light] dark:[color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          {/* Start Time and End Time Side-by-Side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                Start Time *
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground [color-scheme:light] dark:[color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                End Time *
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground [color-scheme:light] dark:[color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          {/* Duration info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span className="flex items-center gap-1">
              <Timer className="w-3.5 h-3.5 text-indigo-500" />
              Total Duration:
            </span>
            <span className="font-bold text-foreground">
              {durationHours > 0 ? `${durationHours} hours` : "Invalid window"}
            </span>
          </div>

          {/* Total Price Summary */}
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
              Estimated Total:
            </span>
            <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center">
              <DollarSign className="w-4 h-4 stroke-[3]" />
              {totalPrice}
            </span>
          </div>

          <DialogFooter className="pt-2 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => setOpen(false)}
              className="rounded-xl text-xs font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || durationHours <= 0}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Confirm Reservation</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
