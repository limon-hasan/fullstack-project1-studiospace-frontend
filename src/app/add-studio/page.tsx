"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  Sparkles,
  Building2,
  DollarSign,
  Shield,
  Users,
  MapPin,
  Image as ImageIcon,
  CheckSquare,
  FileText,
  User,
  Mail,
  Loader2,
  ArrowRight,
  AlertCircle,
  Tag,
  Check,
  UploadCloud,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

// এক্সপ্লোর পেজের ফিল্টার ট্যাবের সাথে মেলানো ক্যাটাগরি তালিকা
const CATEGORIES = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
  "Dance Studios",
];

const AVAILABLE_AMENITIES = [
  "Soundproofing",
  "Motorized Cyclorama",
  "4K Camera Rig",
  "SSL Console",
  "Dressing Room",
  "Lighting Grid",
  "High-Speed Wi-Fi",
  "Lounge Area",
  "Kitchenette",
  "Air Conditioning",
  "Free Parking",
  "Equipment Rental",
];

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Form States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [hourlyRate, setHourlyRate] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  // Loading States
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAmenityToggle = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((item) => item !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  // Direct ImgBB File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File type validation
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please upload an image file (PNG, JPG, WEBP).",
      });
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      toast.error("ImgBB API Key Missing", {
        description:
          "Please configure NEXT_PUBLIC_IMGBB_API_KEY in your .env.local file.",
      });
      return;
    }

    try {
      setUploadingImage(true);
      setError("");

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.data?.display_url) {
        setImageUrl(data.data.display_url);
        toast.success("Image Uploaded Successfully", {
          description: "Studio image hosted via ImgBB.",
        });
      } else {
        throw new Error(
          data.error?.message || "Failed to upload image to ImgBB.",
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Image upload failed";
      console.error("ImgBB upload error:", err);
      toast.error("Upload Error", { description: msg });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getTokenFromClient();
    setError("");

    if (!imageUrl) {
      setError("Please upload a studio image before submitting.");
      toast.error("Image Missing", {
        description: "Please upload an image for your studio.",
      });
      return;
    }

    setLoading(true);

    const studioPayload = {
      title,
      category,
      hourlyRate: Number(hourlyRate),
      securityDeposit: Number(securityDeposit || 0),
      maxCapacity: Number(maxCapacity || 1),
      rating: 5.0,
      location,
      image: imageUrl,
      amenities,
      description,
      ownerName: user?.name,
      ownerEmail: user?.email,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, // ব্যাকটিক ব্যবহার করা হয়েছে
        },
        body: JSON.stringify(studioPayload),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(
          responseData.message || "Failed to add studio workspace.",
        );
      }

      toast.success("Studio Workspace Published!", {
        description: `"${title}" is now live and ready for bookings.`,
        duration: 4000,
      });

      router.push("/my-listings");
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to add studio. Please try again.";
      console.error("Submission failed:", err);
      setError(errorMsg);
      toast.error("Error", { description: errorMsg });
    } finally {
      setLoading(false);
    }
  };
  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Access Restricted</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          You must be logged in to list a studio workspace on StudioSpace.
        </p>
        <Link href="/signin">
          <Button className="rounded-xl px-6 font-semibold">
            Sign In to Continue
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Host Workspace Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Add New Studio
          </h1>
          <p className="text-sm text-muted-foreground">
            List your creative workspace for photographers, filmmakers, and
            audio engineers.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5 shadow-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Workspace Details */}
          <div className="p-6 sm:p-8 rounded-3xl bg-background border border-border/80 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b border-border/60 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">
                  Workspace Details
                </h2>
                <p className="text-xs text-muted-foreground">
                  Basic information and category assignment
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Studio Title */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Studio Title
                </label>
                <Input
                  required
                  placeholder="e.g. Abbey Sound Stage & Dolby Atmos Suite"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-11 bg-muted/30 border-border/80 focus:border-indigo-500 focus:ring-indigo-500/20 font-medium"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Category</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-3 text-xs sm:text-sm font-medium rounded-xl border border-border/80 bg-muted/30 text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      className="bg-background text-foreground"
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Location / Address</span>
                </label>
                <Input
                  required
                  placeholder="e.g. 450 West 31st St, New York, NY"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-11 bg-muted/30 border-border/80 focus:border-indigo-500 focus:ring-indigo-500/20 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Capacity */}
          <div className="p-6 sm:p-8 rounded-3xl bg-background border border-border/80 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b border-border/60 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">
                  Rates & Capacity
                </h2>
                <p className="text-xs text-muted-foreground">
                  Financial breakdown and studio attendance limits
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Hourly Rate */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Hourly Rate ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-emerald-600">
                    $
                  </span>
                  <Input
                    type="number"
                    min="1"
                    required
                    placeholder="120"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="h-11 pl-8 bg-muted/30 border-border/80 focus:border-emerald-500 focus:ring-emerald-500/20 font-semibold"
                  />
                </div>
              </div>

              {/* Security Deposit */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  <span>Security Deposit ($)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-amber-600">
                    $
                  </span>
                  <Input
                    type="number"
                    min="0"
                    required
                    placeholder="250"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(e.target.value)}
                    className="h-11 pl-8 bg-muted/30 border-border/80 focus:border-amber-500 focus:ring-amber-500/20 font-semibold"
                  />
                </div>
              </div>

              {/* Max Capacity */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-500" />
                  <span>Max Capacity</span>
                </label>
                <Input
                  type="number"
                  min="1"
                  required
                  placeholder="15"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                  className="h-11 bg-muted/30 border-border/80 focus:border-sky-500 focus:ring-sky-500/20 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Media & Amenities (ImgBB Integration) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-background border border-border/80 shadow-md space-y-6">
            <div className="flex items-center gap-3 border-b border-border/60 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-500/20">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">
                  Media & Workspace Amenities
                </h2>
                <p className="text-xs text-muted-foreground">
                  Upload studio cover image (via ImgBB) and choose equipment
                </p>
              </div>
            </div>

            {/* ImgBB Direct File Upload Dropzone */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Studio Image (ImgBB Upload)
              </label>

              {!imageUrl ? (
                <label className="border-2 border-dashed border-border/80 hover:border-violet-500/60 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {uploadingImage ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <UploadCloud className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-bold text-foreground">
                      {uploadingImage
                        ? "Uploading to ImgBB..."
                        : "Click to upload image file"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PNG, JPG, or WEBP (Direct ImgBB integration)
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
              ) : (
                <div className="relative aspect-16/8 w-full rounded-3xl overflow-hidden border border-border shadow-md bg-muted">
                  <Image
                    src={imageUrl}
                    alt="Uploaded studio preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-emerald-400 border border-white/10">
                      Uploaded to ImgBB
                    </span>
                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="w-8 h-8 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Remove and upload different image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Optional Direct URL Fallback */}
              <div className="pt-1">
                <p className="text-[11px] text-muted-foreground font-medium">
                  Or paste direct hosted image URL:
                </p>
                <Input
                  type="url"
                  placeholder="https://i.ibb.co/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="mt-1 h-9 text-xs bg-muted/20 border-border/70 font-medium"
                />
              </div>
            </div>

            {/* Amenities Checkboxes */}
            <div className="space-y-3 pt-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-violet-500" />
                <span>Select Amenities</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const isChecked = amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`text-xs px-3.5 py-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isChecked
                          ? "bg-violet-600 text-white border-violet-600 font-bold shadow-md scale-[1.02]"
                          : "bg-muted/40 border-border/80 text-foreground hover:bg-muted/80 hover:border-violet-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] shrink-0 transition-colors ${
                          isChecked
                            ? "border-white bg-white text-violet-700"
                            : "border-muted-foreground/40 bg-background"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="truncate">{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-violet-500" />
                <span>Detailed Overview</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe equipment lists, acoustical isolation levels, load-in access, and workspace rules..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3.5 text-xs sm:text-sm font-medium rounded-2xl border border-border/80 bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>
          </div>

          {/* Section 4: Read-only Host Information */}
          <div className="p-6 sm:p-8 rounded-3xl bg-background border border-border/80 shadow-md space-y-5">
            <div className="flex items-center gap-3 border-b border-border/60 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">
                  Host Identity (Read-Only)
                </h2>
                <p className="text-xs text-muted-foreground">
                  Automatically verified from active login session
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Host Name</span>
                </label>
                <Input
                  readOnly
                  disabled
                  value={user.name || ""}
                  className="h-11 bg-muted/60 border-border/60 text-foreground font-semibold cursor-not-allowed opacity-90"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Host Email</span>
                </label>
                <Input
                  readOnly
                  disabled
                  value={user.email || ""}
                  className="h-11 bg-muted/60 border-border/60 text-foreground font-semibold cursor-not-allowed opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
          <Button
            type="submit"
            disabled={loading || uploadingImage}
            className="w-full h-13 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Publishing Studio Workspace...</span>
              </>
            ) : (
              <>
                <span>Publish Studio Workspace</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
