"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Building2,
  Plus,
  Trash2,
  ExternalLink,
  MapPin,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  ownerEmail: string;
}

export default function MyListingsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  // User-er nijer studio fetch kora
  useEffect(() => {
    if (!user?.email) return;

    const fetchMyStudios = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          // `http://localhost:8000/my-studios?email=${encodeURIComponent(user.email)}`,
          `http://localhost:8000/my-studios?email=${encodeURIComponent(user.email)}`,
          {
            cache: "no-store",
          },
        );
        if (!res.ok) throw new Error("Failed to load your listings.");
        const data = await res.json();
        setStudios(data);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Something went wrong";
        toast.error("Error fetching listings", { description: msg });
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudios();
  }, [user?.email]);

  // Studio Delete Handler
  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"?`,
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      const res = await fetch(`http://localhost:8000/studios/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete workspace.");

      setStudios((prev) => prev.filter((s) => s._id !== id));

      toast.success("Studio Deleted", {
        description: `"${title}" has been successfully removed.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Deletion failed";
      toast.error("Delete Error", { description: msg });
    } finally {
      setDeletingId(null);
    }
  };

  if (isPending || (loading && user?.email)) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Auth Protection Fallback
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center shadow-xs">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Access Restricted</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Please sign in to view and manage your hosted studio workspaces.
        </p>
        <Link href="/signin">
          <Button className="rounded-xl px-6 font-semibold cursor-pointer">
            Sign In to Continue
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Host Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              My Studio Listings
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage, monitor, and update all the creative studio spaces you
              have published.
            </p>
          </div>

          <Link href="/add-studio">
            <Button className="h-11 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-2 shadow-md cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Add New Studio</span>
            </Button>
          </Link>
        </div>

        {/* Listings Grid */}
        {studios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="group rounded-3xl bg-background border border-border/80 shadow-md overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                  <Image
                    src={studio.image}
                    alt={studio.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-background/90 backdrop-blur-md text-foreground border border-border/60 shadow-xs">
                      {studio.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{studio.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {studio.title}
                    </h3>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-muted/30 border border-border/60 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Rate
                      </span>
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                        ${studio.hourlyRate}/hr
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Deposit
                      </span>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        ${studio.securityDeposit}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Capacity
                      </span>
                      <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                        {studio.maxCapacity} ppl
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                    <Link href={`/studios/${studio._id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full rounded-xl text-xs font-semibold gap-1.5 cursor-pointer hover:bg-indigo-500/10 hover:text-indigo-600 hover:border-indigo-500/30"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Button>
                    </Link>

                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deletingId === studio._id}
                      onClick={() => handleDelete(studio._id, studio.title)}
                      className="rounded-xl text-xs font-semibold gap-1.5 cursor-pointer px-3"
                    >
                      {deletingId === studio._id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 border border-dashed border-border/80 rounded-3xl bg-background p-8 space-y-4 shadow-xs">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              No Studio Listings Found
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              You haven&apos;t published any workspaces yet. List your
              production stages, photo lofts, or sound suites to start earning.
            </p>
            <div className="pt-2">
              <Link href="/add-studio">
                <Button className="h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-2 cursor-pointer shadow-md">
                  <Plus className="w-4 h-4" />
                  <span>List Your First Studio</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
