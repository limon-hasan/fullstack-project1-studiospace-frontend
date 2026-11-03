import { ShieldCheck, Lock, Clock, Sparkles } from "lucide-react";

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "100% Verified Production Spaces",
    description:
      "Every studio undergoes acoustic isolation checks, power load verification, and live gear audits before listing.",
  },
  {
    icon: Lock,
    title: "Secure Escrow Booking",
    description:
      "Your payment is held securely in escrow until check-in is complete and verified by both creator and host.",
  },
  {
    icon: Clock,
    title: "Transparent Hourly Rates",
    description:
      "No surprise cleaning fees, electricity surcharges, or hidden gear access costs. What you see is what you pay.",
  },
  {
    icon: Sparkles,
    title: "$1M Host Protection",
    description:
      "Both creators and studio owners are backed by comprehensive liability and equipment protection policies.",
  },
];

export default function HostGuarantee() {
  return (
    // bg-background/40 er poriborte solid bg-background
    <section className="py-16 sm:py-20 bg-background border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Container */}
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-8 sm:p-12 shadow-xs">
          {/* Header */}
          <div className="max-w-2xl mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>StudioSpace Creator & Host Pledge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Production-Grade Reliability Guaranteed
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We eliminate the friction and uncertainty of renting creative
              venues so your shoot runs flawlessly.
            </p>
          </div>

          {/* 4 Feature Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUARANTEES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl border border-border/60 bg-muted/20 hover:border-primary/40 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
