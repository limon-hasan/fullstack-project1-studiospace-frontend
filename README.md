# 🎬 StudioSpace — Client Web Application

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Auth-Better_Auth-purple?style=for-the-badge)](https://www.better-auth.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel)](https://fullstack-project1-studiospace-clie.vercel.app)

A modern full-stack web application designed for filmmakers, photographers, and audio engineers to discover, list, and book creative production spaces. Features zero-friction hourly reservations, collision-free slot protection, and token-verified host submissions.

---

## 🌐 Live Deployments

- **Production Client:** [https://fullstack-project1-studiospace-clie.vercel.app](https://fullstack-project1-studiospace-clie.vercel.app)
- **Production API:** [https://fullstack-project1-studiospace-back.vercel.app](https://fullstack-project1-studiospace-back.vercel.app)

---

## 🚀 Key Features

- **Dynamic Studio Discovery:** Filter through specialized workspaces (Photo Studios, Sound Stages, Music Suites, Podcast Rooms, Art Workshops) with responsive category pills.
- **Collision-Resistant Booking Engine:** Real-time date and hourly interval selection preventing schedule overlap across verified studios.
- **Host Workspace Management:** Complete studio publishing pipeline including multi-field spec configurations, hourly pricing, security deposits, and amenity selection.
- **Direct Cloud Media Hosting:** High-speed direct image upload integrated with ImgBB REST APIs with live client-side preview and validation.
- **Cross-Platform Responsive Architecture:** Adaptive flex-box and grid layouts fine-tuned for high-density mobile screens, tablets, and wide monitors.
- **Session & Token Synchronization:** Better Auth client-side session hooks with automatic JSON Web Token extraction for protected mutation requests.
- **Cinematic Theme Switcher:** Persistent system-aware Dark/Light mode toggle synchronized across localStorage and DOM root.

---

## 🛠️ Tech Stack & Dependencies

- **Framework:** Next.js 15 (App Router, Server Components & Client Boundaries)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS, PostCSS, Lucide React Icons
- **Authentication:** Better Auth Client SDK (`better-auth/client`)
- **Interactive UI Components:** Radix UI primitives, Popovers, Swiper.js, Sonner (Toasts)
- **Media CDN:** ImgBB API

---

## 📂 Project Architecture

```
studiospace-client/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   ├── add-studio/          # Protected studio submission form
│   │   ├── my-bookings/         # User reservation management
│   │   ├── my-listings/         # Host workspace dashboard
│   │   ├── studios/             # Exploration & catalog routes
│   │   │   └── [id]/            # Individual studio profile & booking modal
│   │   ├── layout.tsx
│   │   └── page.tsx             # Cinematic hero & platform overview
│   ├── components/
│   │   ├── home/                # HeroSlider, HowItWorks, HostGuarantee
│   │   ├── shared/              # Navbar, Footer, CancelBookingModal
│   │   └── ui/                  # Reusable UI primitives
│   └── lib/
│       ├── auth-client.ts       # Better Auth instance & JWT plugins
│       ├── getTokenFromClient.ts# Safe client session token extractor
│       └── utils.ts
├── public/
└── tailwind.config.ts
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=https://fullstack-project1-studiospace-back.vercel.app

# Better Auth Base URL
NEXT_PUBLIC_BETTER_AUTH_URL=https://fullstack-project1-studiospace-clie.vercel.app

# ImgBB API Key (For Studio Workspace Images)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_v1_key
```

---

## 💻 Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/limon-hasan/fullstack-project1-studiospace-client.git
   cd fullstack-project1-studiospace-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Author

- **Maksudul Hasan Limon** — Computer Science & Engineering Undergraduate
- GitHub: [@limon-hasan](https://github.com/limon-hasan)
