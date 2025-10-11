# Atlas Dream

A luxury travel platform for Marrakech featuring car rentals, villa bookings, and concierge services. Built with Next.js, Payload CMS, and bilingual support (EN/FR).

## Project Overview

Atlas Dream is an MVP focused on lead generation without online payments. It features:

- **Car Rentals**: Luxury vehicles with driver options and airport meet service
- **Villa Bookings**: Premium properties across Marrakech districts
- **Concierge Services**: Tiered packages (Essential/Signature/Prestige) and à-la-carte options
- **Blog**: Editorial content with SEO optimization
- **Bilingual**: Full EN/FR support with i18n routing

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **CMS**: Payload CMS v3 with MongoDB
- **Styling**: Design tokens (see `/atlas-dream-starter/design/design.json`)
- **Deployment**: Vercel
- **Version Control**: GitHub

## Repository

🔗 **GitHub**: https://github.com/AhmatF/atlas-dream

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Vercel account
- GitHub account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AhmatF/atlas-dream.git
   cd atlas-dream
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your configuration:
   - `DATABASE_URI`: Your MongoDB connection string
   - `PAYLOAD_SECRET`: Generate a secure secret
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Your WhatsApp business number
   - `NEXT_PUBLIC_CALENDLY_URL`: Your Calendly booking link

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

### Vercel Deployment

1. **Log in to Vercel**:
   ```bash
   vercel login
   ```

2. **Link the project**:
   ```bash
   vercel link
   ```

3. **Add environment variables** in Vercel dashboard:
   - Go to your project settings
   - Add all variables from `.env.example`
   - Don't forget to add them for Production, Preview, and Development environments

4. **Deploy**:
   ```bash
   vercel --prod
   ```

## Project Structure

```
atlas-dream/
├── atlas-dream-starter/
│   ├── cms/payload/          # Payload CMS configuration
│   │   ├── collections/      # Data models (Cars, Villas, etc.)
│   │   └── payload.config.ts
│   ├── content/seeds/        # Initial content (EN/FR)
│   ├── design/              # Design system tokens
│   └── docs/                # Project documentation
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── lib/                 # Utilities
│   └── styles/              # Global styles
├── public/                  # Static assets
└── package.json
```

## Key Features

### Non-negotiables
- ✅ No payment processing (lead generation only)
- ✅ Browser-based language detection with EN fallback
- ✅ One-screen lead forms with WhatsApp, Call, and Submit CTAs
- ✅ WCAG 2.2 AA accessibility compliance
- ✅ Performance budgets: LCP < 2.5s, CLS < 0.1, TBT < 200ms
- ✅ SEO: i18n URLs, hreflang tags, JSON-LD structured data

### Contact Integration
- **WhatsApp**: `https://wa.me/212774885461`
- **Phone**: `tel:+212774885461`
- **Calendly**: Embedded booking modal

### Design System
- **Colors**: Ivory (#F7F0E6), Tadelakt (#E7DCCD), Ebony (#1D232A), Brass (#C49A58), Majorelle (#2A3B8F)
- **Typography**: Cormorant Garamond (headings), Inter (body)
- **Motion**: Cubic bezier easing, 160-420ms durations

## Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run payload      # Access Payload CLI
npm run generate:types    # Generate TypeScript types
```

### Collections

- **Cars**: Luxury vehicles with pricing and options
- **Villas**: Properties by district with amenities
- **ConciergePacks**: Service tiers (Essential/Signature/Prestige)
- **ConciergeAlaCarte**: Individual services by category
- **BlogPosts**: Editorial content
- **Pages**: Site pages with localized content
- **Leads**: Contact submissions
- **Media**: Asset uploads
- **Users**: Admin authentication

## Documentation

- **Specifications**: See `CLAUDE.md` for project guidelines
- **Agents**: See `atlas-dream-starter/docs/Agents.md` for AI agent instructions
- **Design**: See `atlas-dream-starter/design/design.json` for design tokens
- **Content Seeds**: See `atlas-dream-starter/content/seeds/` for initial content

## Definition of Done

Before considering any feature complete:
- ✅ Performance budgets met (LCP < 2.5s, CLS < 0.1, TBT < 200ms)
- ✅ EN & FR content present (or flagged with "EN only" badge)
- ✅ All contact CTAs functional (WhatsApp, Call, Calendly)
- ✅ Structured data validates in Rich Results Test
- ✅ Lighthouse scores ≥ 90 for all categories

## License

Private project - All rights reserved

## Contact

- **WhatsApp**: +212 774 885461
- **Repository**: https://github.com/AhmatF/atlas-dream
