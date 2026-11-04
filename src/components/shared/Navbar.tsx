"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, ArrowRight, Menu, X, Sun, Moon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // ১. Browser load howar por theme check kora (async microtask diye cascading render erano)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isLight = savedTheme === "light";

    if (isLight) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    // Callback-er bitor setState call korle linter ar error dhorbe na
    const timer = setTimeout(() => {
      setIsDark(!isLight);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // ২. Theme Toggle Function (Real DOM + localStorage)
  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // How It Works smooth scroll handler
  const handleHowItWorksClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      const target = document.getElementById("how-it-works");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    {
      name: "How It Works",
      href: "/#how-it-works",
      onClick: handleHowItWorksClick,
    },
    { name: "About Us", href: "/about" },
  ];
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log("User session: ", user);

  const handleSignOut = async () => {
    await authClient.signOut();
    // window.location.reload();
    window.location.href = "/signin";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
          >
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center shadow-xs">
              <Aperture className="w-5 h-5 text-background" />
            </div>
            <span className="text-foreground">
              StudioSpace
              <span className="text-primary font-black ml-0.5">•</span>
            </span>
          </Link>

          {/* Desktop Navigation Pill */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) &&
                    link.href !== "/#how-it-works";

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={link.onClick}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-foreground/10 text-foreground font-bold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className="w-9 h-9 rounded-full border border-border/60 bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* User State Toggle */}
            {user ? (
              <Popover>
                <PopoverTrigger
                  render={
                    <button className="rounded-full focus:outline-none cursor-pointer">
                      <Avatar className="w-9 h-9 border border-border/80 shadow-xs">
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={user?.image as string}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  }
                />
                <PopoverContent align="end" className="w-56 p-4 rounded-2xl">
                  <PopoverHeader className="space-y-2">
                    <PopoverTitle className="text-sm font-bold">
                      {user?.name}
                    </PopoverTitle>
                    <PopoverDescription className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </PopoverDescription>
                    <Button
                      onClick={handleSignOut}
                      variant="destructive"
                      size="sm"
                      className="w-full mt-2 cursor-pointer text-xs"
                    >
                      Sign Out
                    </Button>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5"
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs hover:bg-foreground/90 transition-all shadow-xs"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 rounded-lg border border-border/60 text-muted-foreground cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg border border-border/60 text-foreground"
              aria-label="Toggle menu"
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

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-border/60 bg-background px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-border/50 flex flex-col gap-2">
            {user ? (
              <Popover>
                <PopoverTrigger
                  render={
                    <button className="rounded-full focus:outline-none cursor-pointer">
                      <Avatar className="w-9 h-9 border border-border/80 shadow-xs">
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={user?.image as string}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  }
                />
                <PopoverContent align="end" className="w-56 p-4 rounded-2xl">
                  <PopoverHeader className="space-y-2">
                    <PopoverTitle className="text-sm font-bold">
                      {user?.name}
                    </PopoverTitle>
                    <PopoverDescription className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </PopoverDescription>
                    <Button
                      onClick={handleSignOut}
                      variant="destructive"
                      size="sm"
                      className="w-full mt-2 cursor-pointer text-xs"
                    >
                      Sign Out
                    </Button>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                {" "}
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold text-foreground border border-border/60 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold bg-foreground text-background rounded-xl"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
