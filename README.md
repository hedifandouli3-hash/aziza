# AZIZA Tunisie — Frontend-Only UI/UX Prototype

A complete, responsive, modern frontend-only web prototype for **AZIZA Tunisia** supermarkets, faithfully recreated based on the official AZIZA UI/UX design board reference.

---

## ⚡ Strict Frontend-Only Architecture

This project is built as a pure, zero-backend, client-side web application:
- **No Backend / No API Server:** All data is packaged statically and queried in the browser.
- **No Database:** Demonstrative data resides in typed TypeScript modules.
- **No Authentication Required:** Instant access to all sections.
- **No External Services or Secrets Needed:** Runs out of the box with `npm run dev` or `npm run preview`.
- **Transparent Demonstration Labeling:** Product prices in DT, store availability indicators, flyer contents, and contact form validations are clearly marked as illustrative demonstration data.

---

## 🗂️ Centralized Data Architecture

All application data is cleanly decoupled from the UI components in `src/data/`:
- [`products.ts`](file:///c:/Users/hedi/Desktop/aziza/src/data/products.ts) — Tunisian grocery items, realistic prices in Dinars (DT), package formats, and categories.
- [`categories.ts`](file:///c:/Users/hedi/Desktop/aziza/src/data/categories.ts) — Supermarket rayons with localized French & Arabic titles.
- [`catalogues.ts`](file:///c:/Users/hedi/Desktop/aziza/src/data/catalogues.ts) — Promotional campaigns (Current, Upcoming, Past) with validity periods.
- [`flyerPages.ts`](file:///c:/Users/hedi/Desktop/aziza/src/data/flyerPages.ts) — 16-page interactive flyer reader spreads with interactive product hotspots.
- [`stores.ts`](file:///c:/Users/hedi/Desktop/aziza/src/data/stores.ts) — AZIZA store locations across Tunisian governorates with GPS coordinates, phone numbers, and service tags.
- [`banners.ts`](file:///c:/Users/hedi/Desktop/aziza/src/data/banners.ts) — Hero carousel slides and promotional card copy.
- [`navigation.ts`](file:///c:/Users/hedi/Desktop/aziza/src/data/navigation.ts) — Main navigation menus, footer category links, and corporate contact details.

---

## 🖥️ Pages & Interactive Features

1. **Header & Navigation:**
   - Bilingual AZIZA branding with Arabic typography (`AZIZA عزيزة`).
   - Desktop horizontal nav & mobile touch drawer menu.
   - Live browser search modal with instant keyword autocomplete.
   - Language selector (**FR / AR**) dynamically updating page directions (`ltr`/`rtl`) and labels.
   - **Shopping list drawer (*Ma liste de courses*)** utilizing `localStorage` to save items, adjust quantities, calculate estimated totals in DT, and format for printing.

2. **Homepage:**
   - Red promotional hero banner with multi-slide carousel and animated stickers.
   - Grocery category shortcuts with high-resolution imagery.
   - *"Nos offres du moment"* product cards with discounts and favorite toggles.
   - Promotional banners for catalogues and stores.
   - AZIZA commitments section and informative footer.

3. **Catalogues Page:**
   - Status filters (**Tous**, **En cours**, **À venir**, **Précédents**).
   - Flyer cards with validity dates and interactive reader launch buttons.

4. **Interactive Catalogue Reader:**
   - Two-page spread book layout on desktop; single-page layout on mobile.
   - Interactive product hotspots: click on any product in the flyer to add it directly to your shopping list or inspect its details.
   - 16-page thumbnail navigation bar.
   - Keyboard arrows (`←`, `→`) and fullscreen toggle.

5. **Product Detail Page:**
   - High-resolution gallery with thumbnail switcher.
   - Pricing in DT, packaging sizes, and key attributes table.
   - **In-Store Availability Checker (*Disponibilité en magasin*):** City selector with simulated store stock indicators clearly labeled as demonstration data.
   - Similar product recommendations.

6. **Store Locator (*Nos magasins*):**
   - Interactive OpenStreetMap map with custom branded red AZIZA pins + schematic view toggle.
   - Governorate filter pills (Tunis, Ariana, Sousse, Sfax, Nabeul, Bizerte, Monastir, etc.) and search input.
   - Detailed store cards with addresses, phone numbers, distances in km, opening hours, and direct Google Maps links.

7. **About Us & Contact:**
   - **About Us (*À propos*):** The AZIZA Tunisia story, +400 stores, +3,500 employees, 4 core pillars.
   - **Contact:** Verified company contact details, client-side validated contact form with demonstration confirmation state, and customer FAQ accordion.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Development
```bash
npm run dev
```
Runs the Vite development server with Hot Module Replacement at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Type-checks with `tsc` and builds optimized static assets into `dist/`.

### Preview Static Production Build
```bash
npm run preview
```
Serves the built static frontend locally.

### Linting
```bash
npm run lint
```
Checks code quality with Oxlint.
