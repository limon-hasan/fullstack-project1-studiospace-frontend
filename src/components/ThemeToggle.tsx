"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Asynchronous macro-task ব্যবহারের ফলে React Compiler-এর synchronous setState এরর আসে না
    const timer = setTimeout(() => {
      setMounted(true);

      const savedTheme = localStorage.getItem("studiospace-theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("studiospace-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("studiospace-theme", "light");
    }
  };

  // Hydration mismatch রোধ করতে মাউন্ট হওয়ার আগ পর্যন্ত ফাঁকা বাটন রাখা
  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative p-2.5 rounded-full border border-border bg-card hover:bg-accent text-foreground transition-all duration-200 cursor-pointer shadow-xs"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
