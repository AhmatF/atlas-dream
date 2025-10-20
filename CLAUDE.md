# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Saphir Travel** is a luxury travel platform for Marrakech featuring car rentals, villa bookings, and concierge services. This is an MVP with bilingual support (EN/FR) focused on lead generation without online payments.

**Key Architecture:**
- **CMS Backend:** Payload CMS v3 with TypeScript collections
- **Database:** Supabase (PostgreSQL) with `@payloadcms/db-postgres` adapter
- **Content Management:** Bilingual content (EN/FR) with localized fields
- **Lead Capture:** WhatsApp, phone calls, and Calendly integration
- **Design System:** Token-based design defined in `/atlas-dream-starter/design/design.json`

## Core Business Rules

### Non-negotiables (from `/atlas-dream-starter/docs/Agents.md`)
- **No payment processing** in MVP - collect leads only
- **Browser-based language detection** with EN fallback, never lock users
- **Lead forms are always one-screen** with WhatsApp, Call, and Submit CTAs visible
- **Accessibility:** WCAG 2.2 AA compliance required
- **Performance budgets:** LCP < 2.5s, CLS < 0.1, TBT < 200ms on mobile
- **SEO:** i18n URLs (`/en/*`, `/fr/*`), `hreflang` tags, structured data (JSON-LD)
- **Voice & Tone:** British English, native French, editorial magazine style

## Payload CMS Structure

### Collections (`/atlas-dream-starter/cms/payload/collections/`)

**Core entities:**
- `Cars` - Vehicles with driver options, airport meet, pricing notes
- `Villas` - Properties with districts, amenities, concierge inclusion
- `ConciergePacks` - Tiered service packages (Essential/Signature/Prestige)
- `ConciergeAlaCarte` - Individual services by category
- `BlogPosts` - Editorial content with SEO fields
- `Pages` - Site pages with localized content
- `Leads` - Contact submissions with type, status, source tracking
- `Media` - Asset uploads
- `Users` - Admin authentication

**Localization setup:**
- Config: `/atlas-dream-starter/cms/payload/payload.config.ts`
- Locales: `['en', 'fr']` with `fallback: true`
- Fields marked `localized: true` must have EN/FR content
- Display "EN only" badge when FR content missing

**Slug generation:**
All collections with slugs use a `slugify` function in `beforeValidate` hook that:
- Normalizes NFKD
- Removes diacritics
- Lowercases
- Replaces non-alphanumeric with hyphens

## Design System

**Location:** `/atlas-dream-starter/design/design.json`

**Brand colors:**
- Ivory: `#F7F0E6` (background)
- Tadelakt: `#E7DCCD` (surface)
- Ebony: `#1D232A` (text)
- Brass: `#C49A58` (accent)
- Majorelle: `#2A3B8F` (secondary)

**Typography:**
- Headings: Cormorant Garamond (600/700, -1px tracking)
- Body: Inter (400/500/600, 16px, 1.65 leading)

**Motion:**
- Easing: `cubic-bezier(0.22,1,0.36,1)`
- Durations: fast 160ms, base 240ms, slow 420ms
- Parallax strength: 0.06

**Components:**
- Card radius: 24px (`radii.xl`)
- Brass border on hover: `box-shadow: 0 0 0 2px rgba(196,154,88,0.25)`
- Navbar height: 72px with backdrop blur

## User Journeys

### Car Lead Flow
1. Browse `/cars` → select model
2. One-screen form: dates, flight number, driver (yes/no), options (Wi-Fi, child seats 0-3/4-7, additional driver, extended insurance)
3. Delivery/return locations, contact info, budget band
4. Show estimated total (non-binding) with disclaimer
5. Submit → store lead, email confirmation, expose WhatsApp & Call CTAs

### Villa Lead Flow
Similar to car, with additional fields:
- Adults/children count
- District preference (Palmeraie, Hivernage, Agdal, Guéliz, Route de l'Ourika, Amelkis, Al Maaden, Médina, Targa)
- Concierge needs
- Flexible dates toggle

### Concierge Lead Flow
- Select pack (Essential/Signature/Prestige) or à-la-carte services
- Date range, preferences, budget band

## Contact Integration

**WhatsApp:** `https://wa.me/212774885461?text=<encoded message>`
**Call:** `tel:+212774885461`
**Calendly:** Embed URL in header with "Book a call" CTA

All three options must be visible on mobile navbar.

## SEO Requirements

**Structured Data (JSON-LD):**
- Cars: `Product` or `Service` schema
- Villas: `Accommodation` (or `VacationRental`)
- Concierge: `Service` schema
- Blog: `BlogPosting` schema
- All pages: `BreadcrumbList`

**i18n URLs:**
- Format: `/en/*` and `/fr/*`
- Render `hreflang` alternate tags
- Separate canonical per locale
- Never force hard redirects

**Image optimization:**
- General images: < 200KB
- Hero images: < 350KB
- Formats: AVIF/WebP with fallbacks
- Lazy loading except above-fold

## Analytics Events

Track these events:
- `lead_open` - Form opened
- `lead_submit` - Form submitted
- `whatsapp_click` - WhatsApp CTA clicked
- `call_click` - Call CTA clicked
- `calendly_open` - Calendly modal opened
- `view_item` - Car/Villa/Pack viewed
- `blog_read` - Blog post engagement

## Content Seeds

**Location:** `/atlas-dream-starter/content/seeds/`

Seed data organized by locale (`en/`, `fr/`) containing:
- `home.json` - Homepage content
- `cars.json` - Car inventory
- `villas.json` - Villa listings
- `concierge-packs.json` - Service packages
- `copy.md` - Shared copy strings
- Blog posts as markdown files

## Definition of Done

Before considering any feature complete:
- ✓ Performance budgets met on mobile (LCP < 2.5s, CLS < 0.1, TBT < 200ms)
- ✓ EN & FR content present (or FR content flagged with "EN only" badge)
- ✓ All contact CTAs functional (WhatsApp, Call, Calendly)
- ✓ Structured data validates in Rich Results Test
- ✓ Lighthouse scores ≥ 90 for Performance, SEO, Accessibility, Best Practices

## PR Checklist

Include in every pull request:
- Screenshots (mobile & desktop)
- Lighthouse report
- i18n verification (URLs, hreflang tags)
- Form validation tested with error states
- WhatsApp deep link tested with sample payloads
- OG images render correctly in both locales
