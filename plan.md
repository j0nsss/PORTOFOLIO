# 🕷️ PORTFOLIO WEBSITE — SPIDER-MAN DARK THEME
## Blueprint & Rencana Kerja Pengembangan

**Project Owner:** [Nama Anda]
**Role:** Senior Full-Stack Developer & Creative UI/UX Engineer
**Tema Visual:** Dark Mode — Spider-Man Inspired (Deep Charcoal, Black, Neon Red, Spider-Web Silver)
**Target Audiens:** Klien UMKM, Rekruter Tech, Calon Partner Bisnis

---

## 📋 Daftar Isi
1. [Arsitektur Projek & Struktur Folder](#1-arsitektur-projek--struktur-folder)
2. [Breakdown Fitur & Seksi Portofolio](#2-breakdown-fitur--seksi-portofolio)
3. [Timeline & Fase Pengembangan](#3-timeline--fase-pengembangan-milestones)
4. [Strategi Optimasi Performa Mobile](#4-strategi-optimasi-performa-mobile)

---

## 1. Arsitektur Projek & Struktur Folder

### 1.1 Tech Stack Overview

#### Frontend (Client-Side)

| Layer | Teknologi | Alasan Pemilihan |
|---|---|---|
| Core Framework | React 18 + TypeScript | Type-safety, scalable component architecture |
| Build Tool | Vite | Dev server cepat, HMR instan, bundle ringan |
| Styling | Tailwind CSS v3 + custom design tokens | Utility-first, konsisten, mudah maintain dark theme |
| Animasi | Framer Motion (utama) + GSAP (efek kompleks/SVG path) | Framer Motion untuk micro-interaction React-native; GSAP untuk animasi jaring laba-laba & timeline kompleks |
| Routing | React Router v6 | SPA navigation dengan page transition |
| State Management | Zustand | Global state ringan (theme, modal, cursor state) tanpa boilerplate |
| Form Handling | React Hook Form + Zod | Validasi form kontak yang type-safe & performant |
| Canvas/3D (opsional) | React Three Fiber / Canvas API native | Efek web parallax, particle background |
| Icon | Lucide React | Icon set modern, ringan, konsisten |

#### Backend / API Layer

Backend dibuat ringan namun tetap dirancang sebagai **bukti hidup kapabilitas full-stack**, bukan sekadar form handler statis.

| Layer | Teknologi | Fungsi |
|---|---|---|
| Runtime | Node.js + Express.js (atau Serverless Function Vercel/Netlify) | Handle contact form, serve project data |
| Validasi | Zod (shared schema dengan frontend) | Validasi input konsisten FE-BE |
| Email Service | Nodemailer + SMTP, atau Resend/SendGrid API | Notifikasi email saat form disubmit |
| Database | PostgreSQL + Prisma ORM (hosted di Supabase/Neon) | Menyimpan data project secara dinamis (CMS-like) |
| Hosting Backend | Railway / Render / Vercel Serverless Functions | Deployment ringan, auto-scaling |
| Security | Helmet.js, CORS whitelist, express-rate-limit | Mencegah spam/abuse pada contact form |

> 💡 **Strategi Showcase:** Data project (judul, deskripsi, tech stack, gambar) sebaiknya di-*fetch* dari API/database milik sendiri — bukan hardcoded JSON statis. Dengan begitu, portofolio ini sendiri menjadi *living proof*: frontend React yang berkomunikasi dengan backend Node.js/Express yang terhubung ke database sungguhan.

### 1.2 Struktur Folder (Clean / Feature-Based Architecture)

```
spiderman-portfolio/
│
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── projects/
│   │   └── icons/
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   │   ├── svg/                     # web-pattern.svg, logo, dll
│   │   └── lottie/                  # animasi lottie (opsional)
│   │
│   ├── components/
│   │   ├── ui/                      # Button, Card, Badge, Tooltip (atomic)
│   │   ├── layout/                  # Navbar, Footer, PageWrapper, CustomCursor
│   │   ├── effects/                 # SpiderWebCanvas, SpiderSenseHover, WebShooter
│   │   └── shared/                  # SectionTitle, Container, AnimatedText
│   │
│   ├── features/                    # Fitur per-section
│   │   ├── hero/
│   │   │   ├── Hero.tsx
│   │   │   └── hero.types.ts
│   │   ├── skills/
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── SkillGrid.tsx
│   │   │   └── skills.data.ts
│   │   ├── projects/
│   │   │   ├── ProjectShowcase.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectCarousel.tsx
│   │   │   └── ProjectDetailModal.tsx
│   │   ├── services/
│   │   │   ├── ServicesSection.tsx
│   │   │   └── ServiceCard.tsx
│   │   └── contact/
│   │       ├── ContactForm.tsx
│   │       ├── SignalSentModal.tsx
│   │       └── contact.schema.ts
│   │
│   ├── hooks/
│   │   ├── useScrollSpy.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useSpiderSense.ts        # custom hook efek hover/touch
│   │   └── useSwipeGesture.ts
│   │
│   ├── lib/
│   │   ├── api.ts                   # instance fetch/axios ke backend
│   │   ├── utils.ts
│   │   └── animations.ts            # variants Framer Motion reusable
│   │
│   ├── store/
│   │   └── useUIStore.ts            # Zustand store
│   │
│   ├── types/
│   │   └── index.d.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── ProjectDetailPage.tsx
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── server/                          # Backend (monorepo atau repo terpisah)
│   ├── src/
│   │   ├── routes/
│   │   │   └── contact.route.ts
│   │   ├── controllers/
│   │   │   └── contact.controller.ts
│   │   ├── services/
│   │   │   ├── email.service.ts
│   │   │   └── project.service.ts
│   │   ├── middlewares/
│   │   │   ├── rateLimiter.ts
│   │   │   └── errorHandler.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── server.ts
│   └── package.json
│
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 2. Breakdown Fitur & Seksi Portofolio

### 2.1 🕸️ Hero Section

**Goal:** Dalam 3 detik pertama, pengunjung (klien/rekruter) harus paham value proposition Anda.

**Konsep Konten:**
- Headline utama mereframe filosofi *"With great power comes great responsibility"* ke konteks teknologi:
  > *"With Great Code, Comes Great Responsibility — I Build Digital Solutions That Move Your Business Forward."*
- Sub-headline berorientasi nilai bisnis (bukan jargon teknis semata):
  > "Full-Stack Developer yang membangun website & sistem digital yang scalable, cepat, dan dirancang untuk meningkatkan konversi bisnis Anda."

**Elemen Interaktif:**
- **Custom cursor "Web-Shooter"** — cursor berubah menjadi efek jaring kecil saat hover di atas tombol CTA.
- **Background animasi jaring laba-laba** halus (SVG path animation via GSAP), bergerak parallax mengikuti gerakan mouse (desktop) / gyroscope tilt (mobile, opsional).
- **Reveal/stagger animation** pada headline (Framer Motion `staggerChildren`).
- **Dual CTA:** "Lihat Project Saya →" (primary, neon red) & "Hubungi Saya" (secondary, outline silver).
- Versi mobile: animasi background di-*downgrade* ke variasi yang lebih ringan (lihat bagian 4).

**Layout Mobile-First:**
Stack vertikal — Badge status ("Available for Project") → Headline → Sub-headline → CTA Buttons → Scroll indicator (animasi "spider-sense ping").

---

### 2.2 🧰 Full-Stack Skill Tech-Stack (Interactive Grid)

**Goal:** Menunjukkan jelas kapabilitas Frontend & Backend, terpisah secara visual namun tetap estetik dalam satu kesatuan tema.

**Struktur Visual:**
- Section dibagi 2 kolom besar di desktop (stack vertikal di mobile): **"Frontend Web"** (kiri) dan **"Backend Architecture"** (kanan), dihubungkan garis jaring di tengah — melambangkan "full-stack = jaring yang menyatukan semua layer".

**Interaksi:**
- Setiap skill ditampilkan sebagai **"web node"** (kartu bulat/hexagon kecil) dalam grid.
- **Hover/Tap = efek "Spider-Sense":** node memancarkan ripple/glow neon-red + sedikit scale animation + tooltip level kemahiran (Beginner/Intermediate/Advanced/Expert).
- Mobile: interaksi *tap-to-reveal* (karena tidak ada hover state), dengan feedback visual scale + glow sebagai pengganti haptic.
- Garis penghubung antar skill yang berelasi (misal React ↔ TypeScript ↔ Tailwind) digambar sebagai "jaring" tipis via SVG/Canvas, dengan animasi *draw-in* saat section masuk viewport (`whileInView`).

**Kategori Skill:**
- **Frontend Web:** React.js, TypeScript, Tailwind CSS, Framer Motion/GSAP, Next.js (jika relevan)
- **Backend Architecture:** Node.js, Express.js, REST API/GraphQL, PostgreSQL/MongoDB, Prisma/ORM, Docker (jika relevan)
- **Tools & Lainnya:** Git, Figma, Vercel/AWS, CI/CD basic

---

### 2.3 🎬 Project Showcase (Interactive Gallery)

**Goal:** Bukan sekadar galeri gambar — tapi bukti arsitektur teknis dan dampak bisnis nyata dari tiap project.

**Layout:**
- **Desktop:** Grid masonry atau carousel horizontal dengan navigasi arrow.
- **Mobile:** Swipeable carousel (touch-drag via `useSwipeGesture` + Framer Motion `drag="x"` dengan snap), dilengkapi dot-indicator dan progress bar tipis bertema "web-line".

**Konten Project Card (Preview):**
- Thumbnail/screenshot project (lazy-loaded, blur-up placeholder)
- Nama project + 1 baris tagline berorientasi bisnis (misal: "Meningkatkan konversi checkout sebesar 30%")
- Badge tech stack singkat
- Tombol "Lihat Detail Arsitektur"

**Project Detail Modal/Page:**
- **Overview:** Masalah bisnis klien → solusi yang dibangun → hasil/impact (gunakan angka bila tersedia)
- **Full-Stack Architecture Diagram** sederhana (SVG custom) menunjukkan flow: Frontend (React) → API (Express/Node) → Database (PostgreSQL) → Deployment (Vercel/Railway)
- Galeri screenshot tambahan (swipeable di mobile)
- Link "Live Demo" & "Source Code" (GitHub)
- Transisi modal menggunakan Framer Motion `layoutId` (shared element transition) agar terasa smooth seperti "swing" dari card ke detail.

---

### 2.4 💼 Services Offered (Sales-Oriented Cards)

**Goal:** Klien UMKM/bisnis langsung paham apa yang bisa mereka beli — gunakan bahasa solusi bisnis, bukan jargon teknis.

**Contoh Kartu Layanan:**
1. **Website Bisnis & Landing Page** — *"Tampil profesional, cepat diakses, dan dirancang untuk mengubah pengunjung jadi pelanggan."*
2. **Full-Stack Web Application** — *"Dari sistem booking, dashboard admin, hingga marketplace — dibangun end-to-end dengan arsitektur yang scalable."*
3. **Optimasi & Maintenance Website** — *"Website lambat menurunkan penjualan. Perbaikan performa & SEO teknikal."*
4. **API & Integrasi Sistem** — *"Hubungkan website dengan payment gateway, WhatsApp API, atau sistem internal lainnya."*

**Desain Kartu:**
- Hover effect: border kartu "merentang jaring" tipis (border-gradient animation neon-red → silver).
- Icon line-art khas per layanan (bukan emoji, agar tetap profesional).
- CTA kecil di setiap kartu: "Diskusikan Project Anda →" yang men-*scroll* ke contact form.

---

### 2.5 📨 Contact Form — "Signal Sent"

**Goal:** Interaksi submit form terasa premium & memorable, namun tetap terasa *reliable* — bukan gimmick semata.

**Form Fields:**
- Nama, Email, Jenis Kebutuhan (dropdown: Landing Page / Full-Stack App / Konsultasi / Lainnya), Pesan
- Validasi real-time (React Hook Form + Zod) — error message muncul dengan animasi *shake* halus.

**Flow Interaksi:**
1. User mengisi form → tombol submit berlabel **"Kirim Sinyal"** dengan icon kecil mirip sinyal jaring.
2. Saat diklik: tombol berubah jadi loading state (animasi garis jaring berputar/pulsing, bukan spinner generik).
3. Request dikirim ke backend (Express API) → validasi ulang di server (Zod) → kirim email via Nodemailer/Resend.
4. **Sukses:** Tampilkan modal/overlay **"Signal Sent"** — garis-garis neon merah menjalar dari tengah ke tepi layar membentuk pola jaring (mirip radar/spider-sense ping), disertai teks: *"Sinyal Terkirim! Saya akan segera menghubungi Anda kembali."*
5. **Gagal:** Pesan error tetap tenang & solutif (misal: "Sinyal terputus, coba lagi atau hubungi via WhatsApp" dengan link alternatif).

**Aksesibilitas:** form tetap accessible — label terhubung dengan benar, focus-visible state jelas, kontras warna AA-compliant meski dark mode.

---

## 3. Timeline & Fase Pengembangan (Milestones)

### 🔹 Fase 1 — Setup & Arsitektur (Minggu 1)
- [ ] Inisialisasi project (Vite + React + TypeScript)
- [ ] Setup Tailwind CSS + design token (warna, spacing, font scale tema Spider-Man)
- [ ] Setup struktur folder (feature-based architecture)
- [ ] Setup ESLint, Prettier, Husky (pre-commit hook)
- [ ] Setup backend skeleton (Express + TypeScript) + struktur folder server
- [ ] Setup database schema (Prisma) untuk data project
- [ ] Setup environment variable & pipeline CI/CD dasar

### 🔹 Fase 2 — Integrasi Konten & Data (Minggu 2)
- [ ] Bangun komponen layout dasar (Navbar, Footer, PageWrapper)
- [ ] Implementasi Hero Section (versi statis dulu, tanpa animasi penuh)
- [ ] Implementasi Skills Section dengan data skill (hardcoded/dari API)
- [ ] Implementasi Project Showcase — hubungkan ke backend API (fetch data project dari database)
- [ ] Implementasi Services Section
- [ ] Bangun Contact Form + endpoint backend (validasi + email service)
- [ ] Testing integrasi FE-BE (Postman/Thunder Client)

### 🔹 Fase 3 — Pemolesan Animasi & Tema Visual (Minggu 3)
- [ ] Implementasi custom cursor & efek spider-sense hover
- [ ] Animasi background jaring laba-laba (GSAP/Canvas) di Hero
- [ ] Page transition & scroll-triggered animation (Framer Motion `whileInView`)
- [ ] Swipeable carousel project showcase (gesture mobile)
- [ ] Modal "Signal Sent" dengan animasi penuh
- [ ] Dark theme detailing: shadow, glow, gradient border konsisten di semua section
- [ ] QA visual cross-browser & cross-device

### 🔹 Fase 4 — Optimasi & Deployment (Minggu 4)
- [ ] Audit performa (Lighthouse/PageSpeed Insights) — target skor 90+
- [ ] Implementasi lazy loading, code-splitting, image optimization
- [ ] Reduce-motion fallback untuk accessibility (`prefers-reduced-motion`)
- [ ] Setup SEO dasar (meta tag, OG image, sitemap, structured data)
- [ ] Deploy frontend (Vercel) & backend (Railway/Render)
- [ ] Setup custom domain + SSL
- [ ] Final testing: form submission end-to-end, mobile real-device test
- [ ] Soft launch & feedback round dari 3–5 orang (teman/klien)

---

## 4. Strategi Optimasi Performa Mobile

### 4.1 Loading & Bundle Performance
- **Code splitting per route/section** menggunakan `React.lazy()` + `Suspense`, terutama untuk Project Detail Modal dan section di bawah fold.
- **Image optimization:** format WebP/AVIF, `srcset` responsive, `loading="lazy"` native + blur-up placeholder (LQIP).
- **Font optimization:** subset font, `font-display: swap`, preload hanya font utama (maksimal 1–2 weight).
- **Tree-shaking GSAP/Framer Motion:** import hanya plugin yang dipakai (misal `gsap/ScrollTrigger` saja, bukan full bundle).
- **Minify & compress** asset (gzip/brotli) di level hosting — otomatis di Vercel/Netlify.

### 4.2 Animasi Mulus di Smartphone (Hardware Acceleration)
- Animasikan **hanya properti `transform` dan `opacity`** (hindari animasi `width`, `height`, `top/left`, `box-shadow` langsung) agar browser memakai GPU compositing, bukan repaint/reflow CPU.
- Tambahkan `will-change: transform` pada elemen yang sering dianimasikan (cursor, web-line, card hover) — secukupnya saja, jangan diterapkan ke semua elemen agar tidak membebani memori.
- Gunakan trik *forcing GPU layer* (`transform: translateZ(0)` / `backface-visibility: hidden`) pada elemen kompleks (canvas/SVG animasi jaring).
- **Downgrade animasi berat di mobile:** deteksi via `matchMedia`/lebar viewport — animasi background jaring parallax mouse-follow hanya aktif di desktop; di mobile diganti versi statis atau animasi sekali jalan berbasis `IntersectionObserver` saat masuk viewport (bukan animasi berkelanjutan).
- Hormati preferensi sistem **`prefers-reduced-motion: reduce`** — matikan/kurangi animasi non-esensial untuk pengguna yang mengaktifkan setting tersebut (accessibility + battery saving).

### 4.3 Gesture & Touch Responsiveness
- Gunakan Framer Motion `drag`, `dragConstraints`, dan `dragElastic` untuk carousel swipe yang terasa natural (bukan custom touch-event manual yang rawan *jank*).
- Tambahkan `touch-action: pan-y` pada elemen swipeable horizontal agar tidak konflik dengan scroll vertikal halaman.
- Target sentuh (tombol, kartu interaktif) minimal **44×44px**, sesuai standar mobile usability.

### 4.4 Core Web Vitals Checklist

| Metric | Target | Strategi |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | Preload hero image/font, hindari render-blocking script, gunakan CDN |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Set `width`/`height` (aspect-ratio) eksplisit di semua image/video, hindari konten yang inject dinamis tanpa reserved space |
| **INP** (Interaction to Next Paint) | < 200ms | Hindari long task JS, debounce event scroll/resize, gunakan `requestAnimationFrame` untuk animasi custom |
| **TTFB** (Time to First Byte) | < 600ms | Gunakan edge hosting (Vercel Edge) & caching API response data project yang jarang berubah |

### 4.5 Monitoring Berkelanjutan
- Setup **Lighthouse CI** di pipeline deployment agar setiap perubahan kode otomatis diaudit performanya.
- Gunakan **Vercel Analytics / Google Search Console** untuk memonitor real-user metrics setelah live.

---

## ✅ Definition of Done
Portofolio dianggap selesai dan siap "swing live" jika:
- [ ] Semua section responsif sempurna di breakpoint mobile (360px), tablet (768px), desktop (1280px+)
- [ ] Skor Lighthouse Mobile: Performance 90+, Accessibility 95+, SEO 95+
- [ ] Form kontak berhasil mengirim email end-to-end di production
- [ ] Animasi tetap smooth (60fps) di mid-range smartphone (tes di device asli, bukan hanya DevTools emulation)
- [ ] Tidak ada console error/warning di production build

---

*Dokumen ini adalah living document — perbarui sesuai progress dan temuan baru selama development.*
