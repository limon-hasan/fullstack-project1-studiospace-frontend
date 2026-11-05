import { Sparkles } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        {/* Animated Branded Spinner */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Outer Pulsing Rings */}
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping opacity-75" />
          <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/30 animate-pulse" />

          {/* Inner Rotating Ring */}
          <div className="w-12 h-12 rounded-xl border-2 border-indigo-600 border-t-transparent animate-spin flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center justify-center gap-1.5">
            <span>StudioSpace</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          </h3>
          <p className="text-xs text-muted-foreground font-medium animate-pulse">
            Setting up creative workspace...
          </p>
        </div>
      </div>
    </div>
  );
}
