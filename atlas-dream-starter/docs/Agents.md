
# Agents.md — Atlas Dream (MVP, EN/FR)

**Last updated:** 2025-10-11

## 0) Mission
Build a fast, bilingual (EN/FR) luxury site for Atlas Dream (Marrakech): lead gen for **Car Rental**, **Villas**, **Concierge**.  
No online payments in MVP. Admin via **Payload CMS**. Contact via **WhatsApp**, **Call**, **Calendly**.

## 1) Non‑negotiables
- No payments (collect lead only).
- Default language = browser; fallback EN. Visible language switch (EN/FR).
- Lead forms are **one screen**. Always offer **WhatsApp**, **Call**, **Submit**.
- Accessibility: WCAG 2.2 AA. Perf budgets: **LCP < 2.5s**, **CLS < 0.1**, **TBT < 200ms** (mobile).
- SEO: clean i18n URLs `/en/*`, `/fr/*` + `hreflang` + `alternate`. Never force hard redirects.
- Structured data: Cars = Product/Service; Villas = Accommodation (Vacation Rental if relevant); Concierge = Service; Blog = BlogPosting; BreadcrumbList.
- Voice: **British English**; French native; tone = **editorial magazine**.

## 2) Entities (Payload Collections)
- Cars(name, brand, year, images[], seats, transmission, color, priceDayNote, priceWithDriverNote, depositNote, included[], options[], airportMeet, availabilityNote, districts[], slug, published)
- Villas(name, district, bedrooms, bathrooms, guests, pricePerNightNote, minNights, highlights[], amenities[], images[], mapCoords, conciergeIncluded, slug, published)
- ConciergePacks(tier, name, whatsIncluded[], description, priceFromNote, images[], slug)
- ConciergeAlaCarte(category, name, detail, priceFromNote, images[], slug)
- BlogPosts(title, excerpt, cover, body, tags[], slug, seo{title,desc})
- Pages(key, title, hero, usps[], content)
- Leads(type, payloadJSON, status, source, createdAt)
- Users(auth)

Fields that are public‑facing text should be **localized** (EN/FR). The global config enables localization with `locales: ['en', 'fr']`.

## 3) User journeys
### Car lead
/cars → pick model → one‑screen form: dates/arrival time, flight number; driver yes/no; options (Wi‑Fi, child seats 0–3/4–7, additional driver, extended insurance); delivery/return; contact (name, email, phone), preferred contact; **Budget** (band). Show **estimated total** (non‑binding) with disclaimer “on quotation”. Submit → store lead, email confirmation, WhatsApp & Call CTAs visible.

### Villa lead
Similar to Car; add adults/children, flexible dates?, **district** (Palmeraie/Hivernage/Agdal/Guéliz/Route de l’Ourika/Amelkis/Al Maaden/Médina), concierge needs, **Budget**.

### Concierge lead
Choose **pack** (Essential/Signature/Prestige) or à‑la‑carte → dates, preferences, **Budget**.

## 4) Contact integrations
- WhatsApp: `https://wa.me/212774885461?text=<encoded message>`  
- Call: `tel:+212774885461`  
- Calendly: embed URL (to be provided), also use a CTA in header “Book a call”.

## 5) Layout & components
- Navbar: EN/FR switch; WhatsApp & Call visible on mobile.
- Hero: editorial image, H1, sub, two primary CTAs (Cars/Villas).
- Bento: 3 offer cards with tilt/fade.
- Cards: radius 24px; thin brass border on hover.
- Lead forms: one screen; server‑side validate; keep data on errors.
- Sticky summary (car/villa) on desktop.
- Blog: article TOC sticky; FAQ accordions; interlinks to offers.

## 6) Styles (tokens)
Use `/design/design.json`.  
Colors: Ivory `#F7F0E6`, Tadelakt `#E7DCCD`, Ebony `#1D232A`, Brass `#C49A58`, Majorelle `#2A3B8F`.  
Fonts: Headings **Cormorant Garamond** 600/700; Body **Inter** 400/500/600.  
Motion: easing `cubic-bezier(0.22,1,0.36,1)`, durations 160–420ms; subtle parallax layers in hero.

## 7) i18n
- Routes: `/en/*`, `/fr/*`.
- Detect browser language and store a cookie; if unknown, default EN. Never lock the user.
- Render correct `hreflang` pairs; canonical per locale.
- Only fall back to EN content if FR missing and display a small “EN only” badge.

## 8) SEO essentials
- Dynamic meta per locale; OG/Twitter images.
- JSON‑LD per type; BreadcrumbList.
- Internal links between Cars/Villas/Concierge/Blog.
- Image weights < 200KB (hero < 350KB); AVIF/WebP; lazy.

## 9) Analytics events
`lead_open`, `lead_submit`, `whatsapp_click`, `call_click`, `calendly_open`, `view_item`, `blog_read`.

## 10) Definition of Done
- Perf & a11y budgets met (mobile).
- EN & FR content present (or FR flagged as “EN only”). 
- All contact CTAs functional.
- Schemas validated (Rich Results Test).
- Lighthouse ≥ 90 across Perf/SEO/Accessibility/Best Practices.

## 11) PR checklist
- Screenshots (mobile/desktop) + Lighthouse report.
- i18n verified (URLs, hreflang).
- Forms: validation + error copy.
- WhatsApp deep link tested with sample payloads.
- OG images render in both locales.
