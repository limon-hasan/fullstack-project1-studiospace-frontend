"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarCheck,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UserDropdownProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onLogout: () => void;
}

export default function UserDropdown({ user, onLogout }: UserDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Base UI-তে PopoverTrigger নিজেই বাটন, তাই আলাদা <button> বা asChild প্রয়োজন নেই */}
      <PopoverTrigger
        className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-border/80 bg-card hover:bg-accent text-foreground transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
        aria-label="User account options"
      >
        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center overflow-hidden border border-border">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name}
              width={28}
              height={28}
              unoptimized
              className="w-full h-full object-cover"
            />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </div>
        <span className="text-xs font-medium max-w-[100px] truncate hidden sm:inline-block">
          {user.name.split(" ")[0]}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </PopoverTrigger>

      {/* Popover Floating Menu */}
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-64 p-2 rounded-2xl border border-border bg-card text-card-foreground shadow-xl backdrop-blur-md"
      >
        {/* User Info Header */}
        <div className="px-3 py-2.5 border-b border-border/60 mb-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {user.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>

        {/* Navigation Action Links */}
        <div className="space-y-0.5 text-sm">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-accent transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/add-studio"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-accent transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-muted-foreground" />
            <span>Add New Studio</span>
          </Link>

          <Link
            href="/my-listings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-accent transition-colors"
          >
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <span>My Studio Listings</span>
          </Link>

          <Link
            href="/my-bookings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-accent transition-colors"
          >
            <CalendarCheck className="w-4 h-4 text-muted-foreground" />
            <span>My Bookings</span>
          </Link>
        </div>

        {/* Logout Action */}
        <div className="pt-1 mt-1 border-t border-border/60">
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
