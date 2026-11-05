"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface DeleteStudiosGridProps {
  studioId: string;
  studioTitle: string;
  onDeleteSuccess: (id: string) => void;
}

export default function DeleteStudiosGrid({
  studioId,
  studioTitle,
  onDeleteSuccess,
}: DeleteStudiosGridProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const token = await getTokenFromClient();
    try {
      setIsDeleting(true);
      const res = await fetch(`http://localhost:8000/studios/${studioId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete workspace.");
      }

      toast.success("Studio Deleted", {
        description: `"${studioTitle}" has been successfully removed.`,
      });

      onDeleteSuccess(studioId);
      setOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Deletion failed";
      toast.error("Delete Error", { description: msg });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
            className="rounded-xl text-xs font-semibold gap-1.5 cursor-pointer px-3"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </Button>
        }
      />

      <AlertDialogContent className="w-[90vw] max-w-sm rounded-3xl border border-border bg-background p-5 sm:p-6 shadow-2xl">
        <AlertDialogHeader className="space-y-2 text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0 border border-destructive/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <AlertDialogTitle className="text-base font-bold text-foreground">
                Delete Studio?
              </AlertDialogTitle>
              <p className="text-xs font-medium text-muted-foreground truncate">
                `{studioTitle}`
              </p>
            </div>
          </div>

          <AlertDialogDescription className="text-xs text-muted-foreground pt-1 text-left">
            This action cannot be undone. This listing will be permanently
            removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-5 flex items-center justify-end gap-2.5 sm:gap-2.5">
          <AlertDialogCancel
            disabled={isDeleting}
            className="rounded-xl text-xs font-semibold cursor-pointer m-0"
          >
            Cancel
          </AlertDialogCancel>

          <Button
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            onClick={handleDelete}
            className="rounded-xl text-xs font-semibold gap-1.5 cursor-pointer px-4"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm</span>
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
