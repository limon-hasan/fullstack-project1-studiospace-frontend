export default function Loading() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-muted/20 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-2">
            <div className="h-5 w-28 bg-muted rounded-full" />
            <div className="h-9 w-60 bg-muted rounded-2xl" />
            <div className="h-4 w-72 bg-muted rounded-lg" />
          </div>
          <div className="h-11 w-36 bg-muted rounded-2xl" />
        </div>

        {/* Studio Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-background border border-border/80 overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-16/10 w-full bg-muted" />
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-muted rounded-md" />
                  <div className="h-5 w-48 bg-muted rounded-md" />
                </div>
                <div className="h-12 bg-muted/50 rounded-2xl" />
                <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                  <div className="h-8 flex-1 bg-muted rounded-xl" />
                  <div className="h-8 w-20 bg-muted rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
