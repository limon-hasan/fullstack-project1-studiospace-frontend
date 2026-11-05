import Link from "next/link";
import { Sparkles, Home, ArrowLeft, Film, Camera, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
        {/* Studio Themed Creative Illustration / Icon Cluster */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 rotate-6 transition-transform hover:rotate-12 duration-300" />
          <div className="absolute inset-0 rounded-3xl bg-card border border-border shadow-xl -rotate-3 flex items-center justify-center">
            <span className="text-5xl font-black text-foreground tracking-tighter">
              4<span className="text-indigo-600 dark:text-indigo-400">0</span>4
            </span>
          </div>

          {/* Floating Studio Props Icons */}
          <div className="absolute -top-2 -left-2 w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-md animate-bounce duration-1000">
            <Camera className="w-5 h-5" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-md animate-pulse">
            <Film className="w-5 h-5" />
          </div>
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm">
            <Music className="w-4 h-4" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workspace Not Found</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Stage Is Dark & Empty
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            The creative studio workspace or page you are looking for has been
            moved, unlisted, or does not exist in our production database.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button className="h-11 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer transition-all">
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Button>
          </Link>
          <Link href="/studios">
            <Button
              variant="outline"
              className="h-11 rounded-2xl text-xs font-semibold px-6 gap-2 border-border hover:bg-muted/50 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse All Studios</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
