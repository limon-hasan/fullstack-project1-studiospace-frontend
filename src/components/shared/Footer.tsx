"use client";

import Link from "next/link";
import { Aperture, Mail, ArrowRight } from "lucide-react";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const CATEGORIES = [
  { name: "Photo Studios & Cyc Walls", href: "/studios?category=photo" },
  { name: "Cinema Sound Stages", href: "/studios?category=sound-stage" },
  { name: "Podcast Lounges", href: "/studios?category=podcast" },
  { name: "Music Recording Suites", href: "/studios?category=music" },
  { name: "Creative Art Workshops", href: "/studios?category=art" },
];

const QUICK_LINKS = [
  { name: "Explore All Studios", href: "/studios" },
  { name: "How Booking Works", href: "/#how-it-works" },
  { name: "Host Protection Guarantee", href: "/#guarantee" },
  { name: "About StudioSpace", href: "/about" },
  { name: "List Your Creative Space", href: "/add-studio" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/60 text-card-foreground transition-colors">
      {/* Standard compact container width: max-w-6xl */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center shadow-xs">
                <Aperture className="w-4 h-4 text-background" />
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg tracking-tight text-foreground font-sans">
                  Studio<span className="text-primary font-black">Space</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block mb-1" />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              A high-performance peer-to-peer workspace marketplace empowering
              filmmakers, photographers, musicians, and podcasters to reserve
              professional production environments on demand.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground">
              Studio Categories
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {CATEGORIES.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground">
              Stay in the Loop
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Subscribe for newly listed sound stages and discount shoot hours.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="creator@studio.com"
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1.5 px-3 text-xs sm:text-sm font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                Join Creator Network
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Dynamic Safe Date */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            StudioSpace Platform Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/trust"
              className="hover:text-foreground transition-colors"
            >
              Host Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
