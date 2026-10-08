# BRIEF — BangHeri AI Agensi
> Revised: Oktober 2026. Menggantikan brief lama sepenuhnya.

---

## Vibe
Dark luxury editorial dengan identitas lokal NTB yang kuat.
References: bali-realestate.sites.spideriq.ai/home
Tiga kata: Trusted. Local. Capable.

---

## Palette
- Background utama : #0d0b09 (deep charcoal)
- Accent           : #c9a96e (champagne gold)
- Teks utama       : #f0ece4 (warm white)
- Teks muted       : #6b6458
- Surface subtle   : #111009

## Typography
- Display/headline : Cormorant Garamond (serif) — italic gold untuk emphasis
- Body/label       : Inter (sans-serif)
- Label style      : UPPERCASE · letter-spacing 0.15em · 0.7rem · gold
- Body             : Inter 16px · line-height 1.7 · color muted

---

## Assets
| File | Digunakan di |
|---|---|
| assets/mandalika_tall.webp  | Hero bg + Section 02 parallax |
| assets/tas_umkm_2k.webp     | Section 03 zoom |
| assets/kain_tenun_panoramic.webp | Section 04 pan |
| assets/gerabah_isolated.webp | Section 05 rotate |
| assets/photo.jpg            | Section 06 about |
| assets/hero-bg.mp4          | DEPRECATED — tidak dipakai |
| assets/hero-fallback.jpg    | DEPRECATED — tidak dipakai |

---

## Scroll Journey

### 01 / HERO — Static Cinematic
- Background: mandalika_tall.webp, full viewport
- Overlay gradient gelap kanan
- Badge: "• AGENSI AI INDONESIA"
- Headline serif besar kiri: "Masih Kerjakan Hal Sama Berulang?"
- Stat chips bawah: 48 JAM · 3× · 30 HARI
- Scroll indicator animated bawah

### 02 / IDENTITY — Mandalika Vertical Parallax
- background-attachment: fixed
- Langit di atas → landasan di bawah seiring scroll
- Konten: "Otomasi Dimulai dari Sini"
- HUD kanan bawah: koordinat Lombok 08°35'S 116°12'E

### 03 / THESIS — Tas UMKM Zoom In/Out
- scale(1.0) → scale(1.15) driven by scroll position
- 6 service cards grid di atas overlay
- "Ada Cara Lebih Cerdas"

### 04 / FEATURED — Kain Tenun Horizontal Pan
- background-position-x: 0% → 100% driven by scroll
- Stats: 48 jam · 3× · 0 karyawan · 30 hari
- Process steps 01–04

### 05 / COLLECTION — Gerabah Rotate Y
- rotateY(0deg) → rotateY(180deg) driven by scroll
- Front: 3 testimonial cards
- Back: CTA "Siap Otomasi Bisnis Anda?"

### 06 / PROOF — About Split Layout
- Static dark #0d0b09
- Kiri: photo.jpg dengan gold border
- Kanan: credentials + badges

### 07 / CONTACT — WhatsApp Close
- Static dark #111009
- Split: advisory teks kiri + underline form kanan
- CTA: "KIRIM VIA WHATSAPP →"

---

## Global UI Elements
- Scroll progress bar: fixed bottom, 2px, gold, width = scroll%
- Section HUD: fixed bottom-right, format "0N %", Inter 11px gold
- Navbar: transparan, blur backdrop, CTA outlined pill gold dot
- Fade-in: IntersectionObserver, translateY(30px→0), 0.8s ease
- Mobile 768px: stack vertikal, disable rotateY → fade, headline 48px

---

## Feeling Curve
1. Hero        → Attention — sinematik, berat, lokal
2. Mandalika   → Grounded — "ini tim yang paham NTB"
3. Tas UMKM    → Curious — layanan terasa nyata
4. Kain Tenun  → Competent — angka dan proses konkret
5. Gerabah     → Convinced — testimonial + CTA dramatis
6. About       → Trust — muka asli, sertifikat asli
7. Contact     → Ease — satu tombol, langsung WhatsApp

## Peak Moment
Section 05 Gerabah — saat rotasi selesai dan CTA muncul dari balik.
Kalimat yang dibawa pulang visitor:
> "Ini tim lokal NTB yang serius dan sudah terbukti 
>  bangun sistem AI untuk bisnis nyata."

---

## Yang Tidak Boleh Diubah
- Semua copy/teks konten yang ada
- Semua href (WhatsApp, Portfolio, LinkedIn, Email)
- Struktur section (urutan tetap sama)
- File photo.jpg (foto founder asli)
