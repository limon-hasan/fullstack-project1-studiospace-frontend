"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const router = useRouter();

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Live Password Validation Rules
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError(
        "Please meet all the password requirements (uppercase, lowercase, 6+ characters).",
      );
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL || undefined,
      });
      console.log("Data : ", data);

      if (error) {
        setError(error.message || "Failed to create an account.");
        setLoading(false);
        return;
      }

      // Success hole signin page-e navigate korbe
      router.push("/signin?registered=true");
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMsg);
      setLoading(false);
    }
  };

    const handleGoogleSignIn = async () => {
      setError("");
      setGoogleLoading(true);
      try {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : "Google sign in failed.";
        setError(errorMsg);
        setGoogleLoading(false);
      }
    };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-primary/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glass Card */}
      <div className="relative w-full max-w-[460px] mx-auto z-10">
        <div className="p-7 sm:p-9 rounded-3xl bg-card/85 backdrop-blur-xl border border-border/80 shadow-2xl transition-all">
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creator Membership</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Unlock access to verified studios and instant bookings
            </p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive text-xs leading-relaxed animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Social Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-border/80 bg-background/60 hover:bg-muted/50 text-foreground text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/70" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="bg-card px-3 text-muted-foreground font-semibold">
                Or with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/90 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary" />
                <span>Full Name</span>
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 bg-background/50 border-border focus-visible:ring-primary/20 text-xs sm:text-sm"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/90 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>Email Address</span>
              </label>
              <Input
                type="email"
                required
                placeholder="alex@studiospace.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 bg-background/50 border-border focus-visible:ring-primary/20 text-xs sm:text-sm"
              />
            </div>

            {/* Photo URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/90 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-primary" />
                <span>Photo URL</span>
              </label>
              <Input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="h-10 bg-background/50 border-border focus-visible:ring-primary/20 text-xs sm:text-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/90 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span>Password</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 pr-10 bg-background/50 border-border focus-visible:ring-primary/20 text-xs sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Live Password Validation Indicators */}
              <div className="grid grid-cols-3 gap-1.5 pt-1.5">
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border transition-all ${
                    hasMinLength
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                      : "bg-muted/30 border-border/50 text-muted-foreground"
                  }`}
                >
                  <Check
                    className={`w-3 h-3 ${hasMinLength ? "opacity-100" : "opacity-30"}`}
                  />
                  <span>6+ chars</span>
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border transition-all ${
                    hasUppercase
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                      : "bg-muted/30 border-border/50 text-muted-foreground"
                  }`}
                >
                  <Check
                    className={`w-3 h-3 ${hasUppercase ? "opacity-100" : "opacity-30"}`}
                  />
                  <span>Uppercase</span>
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border transition-all ${
                    hasLowercase
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                      : "bg-muted/30 border-border/50 text-muted-foreground"
                  }`}
                >
                  <Check
                    className={`w-3 h-3 ${hasLowercase ? "opacity-100" : "opacity-30"}`}
                  />
                  <span>Lowercase</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-xs text-muted-foreground mt-5">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-bold text-foreground hover:text-primary transition-colors hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Terms note */}
        <p className="text-center text-[11px] text-muted-foreground/80 mt-4">
          By signing up, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
