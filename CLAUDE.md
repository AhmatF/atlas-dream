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

### Programmatic Media Upload (API)

**Important:** Payload CMS 3 has specific requirements for uploading media via the REST API. The admin UI may not always work reliably, so use the API approach below for batch uploads or automation.

**Media Collection Access Control:**
In development mode, the Media collection (`/src/payload/collections/Media.ts`) allows unauthenticated CRUD:
```typescript
access: {
  read: () => true,
  create: () => process.env.NODE_ENV === 'development' ? true : false,
  update: () => process.env.NODE_ENV === 'development' ? true : false,
  delete: () => process.env.NODE_ENV === 'development' ? true : false,
}
```

**Required Package:**
```bash
npm install formdata-node
```

**Working Upload Pattern:**
```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FormData, File } from 'formdata-node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const API_URL = 'http://localhost:3000/api';

async function uploadImage(imagePath, altText) {
  const fullPath = path.join(__dirname, '..', imagePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Image not found: ${imagePath}`);
    return null;
  }

  // Read file as buffer
  const imageBuffer = fs.readFileSync(fullPath);
  const fileName = path.basename(imagePath);
  const mimeType = 'image/jpeg'; // or 'image/png', 'image/webp', etc.

  // Create FormData with File object
  const formData = new FormData();
  const file = new File([imageBuffer], fileName, { type: mimeType });
  formData.append('file', file);

  // CRITICAL: Use _payload field for additional collection data (Payload CMS 3 requirement)
  // For localized fields, send simple string with ?locale=en parameter
  const payloadData = {
    alt: altText  // Simple string, not { en: text, fr: text }
  };
  formData.append('_payload', JSON.stringify(payloadData));

  // Upload with locale parameter (IMPORTANT: Do NOT set Content-Type header!)
  const response = await fetch(`${API_URL}/media?locale=en`, {
    method: 'POST',
    body: formData,
    // Don't set headers - FormData handles Content-Type automatically
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ Upload failed (${response.status}): ${errorText}`);
    return null;
  }

  const result = await response.json();
  const mediaId = result.doc?.id || result.id;

  console.log(`✅ Uploaded: ${fileName} (ID: ${mediaId})`);
  return mediaId;
}
```

**Updating Blog Post with Cover Image:**
```javascript
async function updateArticleCover(articleId, mediaId) {
  const response = await fetch(`${API_URL}/blog-posts/${articleId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cover: mediaId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ Failed to update article ${articleId}: ${errorText}`);
    return false;
  }

  console.log(`✅ Article ${articleId} updated with cover image`);
  return true;
}
```

**Complete Example Script:**
See `/scripts/upload-covers-fixed.mjs` for a working example that:
1. Uploads multiple images to Media collection
2. Associates them with blog posts as cover images
3. Handles errors gracefully

**Common Pitfalls:**
- ❌ **Don't** set `Content-Type` header manually - FormData handles this
- ❌ **Don't** send localized fields as `{ en: text, fr: text }` - use simple string with `?locale=en`
- ❌ **Don't** use `form-data` npm package - use `formdata-node` for proper File object support
- ❌ **Don't** forget the `_payload` field for collection-specific data
- ✅ **Do** use `File` constructor from `formdata-node` to create proper file objects
- ✅ **Do** add `?locale=en` (or `?locale=fr`) to the upload URL for localized fields
- ✅ **Do** check file exists before attempting upload
- ✅ **Do** wait between uploads (500-1000ms) to avoid rate limiting

**Reference Scripts:**
- `/scripts/upload-covers-fixed.mjs` - Working image upload with blog post association
- `/scripts/upload-covers-curl.sh` - Bash alternative using curl (for reference)

## Design System

**Location:** `/atlas-dream-starter/design/design.json`

**Brand colors (Saphir Travel):**
- **Sapphire palette (primary):**
  - Deep: `#0F1E3D` (backgrounds premium, hero overlays)
  - Rich: `#1A3A6B` (primary buttons, active links)
  - Medium: `#2E5090` (hover states, accents)
  - Bright: `#4A6FA5` (highlights)
  - Glow: `#6B8FC7` (soft accents)
- **Gold palette (enriched):**
  - Deep: `#B08847` (rich gold for depth)
  - Brass: `#C49A58` (logo, accents)
  - Shimmer: `#D4AF69` (light gold for gradients)
- **Neutral palette:**
  - Ivory: `#F7F0E6` (background - maintained for warmth)
  - Tadelakt: `#E7DCCD` (surface - maintained for warmth)
  - Sapphire Mist: `#E8EDF5` (subtle sapphire backgrounds)
  - Ice Blue: `#F0F4F9` (cool surfaces)
- **Legacy colors (maintained):**
  - Ebony: `#1D232A` (text)
  - Majorelle: `#2A3B8F` (Marrakech accent, secondary)

**Gradients:**
- Sapphire-Gold: `linear-gradient(135deg, #1A3A6B 0%, #C49A58 100%)`
- Hero Sapphire: `radial-gradient(circle at 30% 50%, #2E5090 0%, #0F1E3D 100%)`
- Gold Shimmer: `linear-gradient(135deg, #B08847 0%, #D4AF69 100%)`
- Sapphire Subtle: `linear-gradient(180deg, rgba(15,30,61,0.0) 0%, rgba(15,30,61,0.12) 100%)`

**Typography:**
- Headings: Cormorant Garamond (600/700, -1px tracking)
- Body: Inter (400/500/600, 16px, 1.65 leading)

**Motion:**
- Easing: `cubic-bezier(0.22,1,0.36,1)`
- Durations: fast 160ms, base 240ms, slow 420ms
- Parallax strength: 0.06

**Components:**
- Card radius: 24px (`radii.xl`)
- Card hover: Gem glow shadow + gold border
- Button Primary: Sapphire Rich background with gold shimmer on hover
- Button Secondary: Gold Brass background with sapphire text
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
