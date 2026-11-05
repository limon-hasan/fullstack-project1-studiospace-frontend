"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  Sparkles,
  ArrowLeft,
  Building2,
  DollarSign,
  Shield,
  Users,
  MapPin,
  ImageIcon,
  FileText,
  User,
  Mail,
  Loader2,
  Check,
  UploadCloud,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Dance Studios",
  "Sound Stages",
];

const availableAmenities = [
  "Professional Lighting",
  "Sound Isolation",
  "Seamless Backdrops",
  "Wireless Microphones",
  "4K Camera Rigs",
  "Climate Control",
  "High-Speed Wi-Fi",
  "Dressing Room",
  "Lounge Area",
  "Free Parking",
];

interface EditStudioProps {
  id: string;
}

export default function EditStudio({ id }: EditStudioProps) {
  const router = useRouter();

  // Form States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [hourlyRate, setHourlyRate] = useState<number | string>("");
  const [securityDeposit, setSecurityDeposit] = useState<number | string>("");
  const [maxCapacity, setMaxCapacity] = useState<number | string>("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Existing Data Fetching Logic
  useEffect(() => {
    if (!id) return;

    const fetchStudioDetails = async () => {
      try {
        setIsFetching(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to load studio details.");
        }

        const data = await res.json();

        // Populate Form States with fetched data
        setTitle(data.title || "");
        setCategory(data.category || categories[0]);
        setHourlyRate(data.hourlyRate ?? "");
        setSecurityDeposit(data.securityDeposit ?? "");
        setMaxCapacity(data.maxCapacity ?? "");
        setLocation(data.location || "");
        setImageUrl(data.image || data.imageUrl || "");
        setAmenities(data.amenities || []);
        setDescription(data.description || "");
        setOwnerName(data.ownerName || "");
        setOwnerEmail(data.ownerEmail || "");
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Failed to load studio";
        toast.error("Error", { description: msg });
      } finally {
        setIsFetching(false);
      }
    };

    fetchStudioDetails();
  }, [id]);

  const handleAmenityToggle = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  };

  // Direct ImgBB File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please upload an image file (PNG, JPG, WEBP).",
      });
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      toast.error("ImgBB Key Missing", {
        description: "Add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file.",
      });
      return;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.data?.display_url) {
        setImageUrl(data.data.display_url);
        toast.success("Image Uploaded", {
          description: "Studio cover updated via ImgBB.",
        });
      } else {
        throw new Error(data.error?.message || "Failed to upload image.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      toast.error("Image Upload Failed", { description: msg });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Image Missing", {
        description: "Please provide or upload a studio image.",
      });
      return;
    }

    setLoading(true);

    const updatePayload = {
      title,
      category,
      hourlyRate: Number(hourlyRate),
      securityDeposit: Number(securityDeposit || 0),
      maxCapacity: Number(maxCapacity || 1),
      location,
      image: imageUrl,
      amenities,
      description,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/edit-studios/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatePayload),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update studio details.");
      }

      toast.success("Studio Updated", {
        description: `"${title}" has been successfully updated.`,
      });

      router.push("/my-listings");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Update failed";
      toast.error("Error", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-5">
          <div className="space-y-1">
            <Link
              href="/my-listings"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to My Listings</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Update Studio Workspace
            </h1>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Edit Mode</span>
          </div>
        </div>

        {/* Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-background border border-border/80 shadow-md p-6 sm:p-8 space-y-6"
        >
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-500" />
              Studio Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          {/* Category & Hourly Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                Hourly Rate ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          {/* Security Deposit & Max Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                Security Deposit ($)
              </label>
              <input
                type="number"
                min="0"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-500" />
                Max Capacity (People) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Location Address *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          {/* Image Upload with Preview (ImgBB & Direct URL) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
              Studio Image (ImgBB Upload or URL) *
            </label>

            {imageUrl ? (
              <div className="relative aspect-16/8 w-full rounded-2xl overflow-hidden border border-border shadow-sm bg-muted">
                <Image
                  src={imageUrl}
                  alt="Studio preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-emerald-400 border border-white/10">
                    Active Image
                  </span>
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="w-8 h-8 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Change image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-border/80 hover:border-indigo-500/60 rounded-2xl p-6 flex flex-col items-center justify-center gap-2.5 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {uploadingImage ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <UploadCloud className="w-5 h-5" />
                  )}
                </div>
                <div className="text-center space-y-0.5">
                  <p className="text-xs font-bold text-foreground">
                    {uploadingImage
                      ? "Uploading image to ImgBB..."
                      : "Click to upload a new cover image"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Supports PNG, JPG, or WEBP (ImgBB Integration)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingImage}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}

            {/* Direct URL input */}
            <input
              type="url"
              placeholder="Or paste direct image URL (https://...)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-border/70 bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          {/* Amenities Multi-Select */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">
              Amenities & Equipment
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableAmenities.map((amenity) => {
                const selected = amenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                      selected
                        ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "border-border/70 bg-background text-muted-foreground hover:bg-muted/40"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                        selected
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-border"
                      }`}
                    >
                      {selected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="truncate">{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              Detailed Overview / Description *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none"
            />
          </div>

          {/* Read-Only Host Information */}
          <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Host Information (Read-Only)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="w-4 h-4 shrink-0 text-foreground/70" />
                <span className="truncate font-semibold text-foreground">
                  {ownerName || "Host Name"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0 text-foreground/70" />
                <span className="truncate font-semibold text-foreground">
                  {ownerEmail || "host@email.com"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Link href="/my-listings">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              disabled={loading || uploadingImage}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
