"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface CancelBookingModalProps {
  bookingId: string;
  studioTitle: string;
  onCancelSuccess: (id: string) => void;
}

export default function CancelBookingModal({
  bookingId,
  studioTitle,
  onCancelSuccess,
}: CancelBookingModalProps) {
  const [open, setOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const handleConfirmCancel = async () => {
    try {
      setCancelling(true);
      const res = await fetch(
        `http://localhost:8000/my-bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Cancelled" }),
        },
      );

      if (!res.ok) throw new Error("Failed to cancel the booking.");

      toast.success("Reservation Cancelled", {
        description: `Booking for "${studioTitle}" is now marked as Cancelled.`,
      });

      onCancelSuccess(bookingId);
      setOpen(false);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Could not cancel booking";
      toast.error("Cancellation Failed", { description: msg });
    } finally {
      setCancelling(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 hover:border-destructive/30 border-destructive/20 gap-1.5 cursor-pointer"
      >
        <XCircle className="w-3.5 h-3.5" />
        <span>Cancel Booking</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[92vw] max-w-md rounded-3xl border border-border bg-background p-6 shadow-2xl">
          <DialogHeader className="space-y-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Cancel Studio Reservation?
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to cancel your reservation for{" "}
              <span className="font-bold text-foreground">{studioTitle}</span>?
              This reservation will be marked as{" "}
              <span className="font-semibold text-rose-500">Cancelled</span>. It
              will remain in your booking records for future reference.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4 flex flex-row items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              disabled={cancelling}
              onClick={() => setOpen(false)}
              className="rounded-xl text-xs font-semibold cursor-pointer flex-1 sm:flex-initial"
            >
              Keep Booking
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={cancelling}
              onClick={handleConfirmCancel}
              className="rounded-xl text-xs font-bold gap-1.5 cursor-pointer flex-1 sm:flex-initial"
            >
              {cancelling ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Cancelling...</span>
                </>
              ) : (
                <span>Confirm Cancel</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
