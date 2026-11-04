import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

// ছবির মতো ক্লিন ও প্রফেশনাল টাইপোগ্রাফির জন্য Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudioSpace | Peer-to-Peer Creative Workspaces & Production Studios",
  description:
    "Discover and book premium sound stages, photo cyc walls, podcast lounges, and recording suites directly from creative hosts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${inter.className} min-h-full flex flex-col bg-background text-foreground transition-colors duration-200 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
