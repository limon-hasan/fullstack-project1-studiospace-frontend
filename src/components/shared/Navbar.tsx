"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Aperture,
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarCheck,
  LogOut,
} from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import UserDropdown from "./UserDropDown";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authenticated State টেস্ট করার জন্য একটি স্টেট (পরবর্তীতে BetterAuth hook যুক্ত হবে)
  //   const [user, setUser] = useState<{
  //     name: string;
  //     email: string;
  //     avatarUrl?: string;
  //   } | null>({
  //     name: "Alex Rivera",
  //     email: "alex.creative@studiospace.com",
  //     avatarUrl:
  //       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  //   });
  // By default user logged out thakbe (null)

  
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatarUrl?: string;
  } | null>(null);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ১. Brand Logo with Aperture Icon */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105">
              <Aperture className="w-4 h-4 text-background" />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg tracking-tight text-foreground">
                Studio<span className="text-primary font-black">Space</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block mb-1" />
            </div>
          </Link>

          {/* ২. Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/50 px-3 py-1.5 rounded-full border border-border/60">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ৩. Right Desktop Actions (Theme Switcher + Auth / Profile) */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs sm:text-sm font-medium px-3.5 py-2 rounded-lg text-foreground hover:bg-accent transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-all shadow-xs"
                >
                  Sign Up
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </div>

          {/* ৪. Mobile Header Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-border text-foreground hover:bg-accent cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ৫. Mobile Responsive Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-accent text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-border">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-muted/40 rounded-xl">
                  <p className="text-sm font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex flex-col space-y-1 text-sm">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent"
                  >
                    <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/add-studio"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent"
                  >
                    <PlusCircle className="w-4 h-4 text-muted-foreground" />
                    <span>Add New Studio</span>
                  </Link>
                  <Link
                    href="/my-listings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent"
                  >
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span>My Studio Listings</span>
                  </Link>
                  <Link
                    href="/my-bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent"
                  >
                    <CalendarCheck className="w-4 h-4 text-muted-foreground" />
                    <span>My Bookings</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-destructive hover:bg-destructive/10 rounded-lg text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-lg border border-border text-foreground font-medium hover:bg-accent text-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
