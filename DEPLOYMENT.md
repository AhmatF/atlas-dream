# Atlas Dream - Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- ✅ Git repository created (Done)
- ✅ Vercel account logged in (Done)
- ✅ Vercel project linked (Done)
- ⏳ Environment variables configured (Next step)
- ⏳ Supabase database setup (Required)

## Environment Variables Setup

You need to configure the following environment variables in Vercel:

### Required Variables

1. **DATABASE_URL** (Required for all environments)
   - Your Supabase PostgreSQL connection string
   - Example: `postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres`
   - Get this from:
     - Supabase Dashboard > Project Settings > Database > Connection string (URI)
     - Use the "URI" tab, not the "Session pooler" tab

2. **PAYLOAD_SECRET** (Required for all environments)
   - A secure random string (minimum 32 characters)
   - Generate one with: `openssl rand -base64 32`
   - Example: `your-super-secure-secret-key-here-min-32-chars`

3. **NEXT_PUBLIC_URL** (Optional - Vercel auto-sets this)
   - Your production URL
   - Vercel will automatically set this to your deployment URL
   - You can override it if using a custom domain

### Optional Variables (Already set in code, can override)

4. **NEXT_PUBLIC_WHATSAPP_NUMBER**
   - Default: `212774885461`
   - WhatsApp business number for contact

5. **NEXT_PUBLIC_PHONE_NUMBER**
   - Default: `+212774885461`
   - Phone number for contact

6. **NEXT_PUBLIC_CALENDLY_URL**
   - Your Calendly booking link
   - Example: `https://calendly.com/your-name/consultation`

7. **NEXT_PUBLIC_GA_ID**
   - Google Analytics tracking ID
   - Example: `G-XXXXXXXXXX`

8. **NEXT_PUBLIC_GTM_ID**
   - Google Tag Manager ID
   - Example: `GTM-XXXXXXX`

## Method 1: Using Vercel Dashboard (Recommended)

1. Visit your project dashboard:
   ```
   https://vercel.com/ai-ads/atlas_dream/settings/environment-variables
   ```

2. Add each variable:
   - Click "Add New"
   - Enter variable name (e.g., `DATABASE_URI`)
   - Enter value
   - Select environments: Production, Preview, Development
   - Click "Save"

3. Repeat for all required variables

## Method 2: Using Vercel CLI

Run the setup script:
```bash
./setup-vercel-env.sh
```

Or manually add each variable:
```bash
# Add DATABASE_URL
vercel env add DATABASE_URL production preview development

# Add PAYLOAD_SECRET
vercel env add PAYLOAD_SECRET production preview development

# Add NEXT_PUBLIC_URL (optional)
vercel env add NEXT_PUBLIC_URL production
```

## Method 3: Using .env file (Development only)

For local development:
```bash
cp .env.example .env
# Edit .env with your values
```

**⚠️ Never commit .env file to git!**

## Supabase Setup (PostgreSQL Database)

### Create a Supabase Project

1. **Sign up for Supabase**
   - Go to https://supabase.com
   - Create a free account
   - Click "New Project"

2. **Configure your project**
   - Organization: Select or create one
   - Name: `atlas-dream` (or your preferred name)
   - Database Password: Create a strong password (save this!)
   - Region: Choose closest to your users (e.g., `eu-central-1` for Europe)
   - Click "Create new project" (takes ~2 minutes)

3. **Get your connection string**
   - Once the project is ready, go to **Project Settings** (gear icon in sidebar)
   - Click **Database** in the left menu
   - Scroll to **Connection string** section
   - Select **URI** tab (not Session pooler)
   - Copy the connection string (it looks like):
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.abc123def456.supabase.co:5432/postgres
     ```
   - Replace `[YOUR-PASSWORD]` with the password you created in step 2

4. **Add to environment variables**
   - Add this connection string as `DATABASE_URL` in Vercel
   - Also add it to your local `.env` file for development

### Enable Required Extensions (Optional)

Payload CMS may need certain PostgreSQL extensions. To enable them:

1. In Supabase Dashboard, go to **Database** > **Extensions**
2. Search for and enable:
   - `uuid-ossp` (for UUID generation)
   - `pg_trgm` (for text search - optional)

### Local Development with Supabase

You can use the same Supabase database for local development, or set up a separate project:

**Option 1: Use same database (simpler)**
```bash
# In .env file
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.abc123def456.supabase.co:5432/postgres
```

**Option 2: Separate dev database**
- Create a second Supabase project named `atlas-dream-dev`
- Use its connection string for local development
- Keep production database separate

## Deployment Steps

### 1. Set Environment Variables

Choose one of the methods above to set your environment variables.

### 2. Deploy to Production

```bash
vercel --prod
```

This will:
- Build your Next.js application
- Deploy to Vercel's global CDN
- Provide you with a production URL

### 3. Connect GitHub Repository (Optional but recommended)

To enable automatic deployments on git push:

1. Visit: https://vercel.com/ai-ads/atlas_dream/settings/git-integration
2. Click "Connect Git Repository"
3. Select "GitHub"
4. Authenticate and select `AhmatF/atlas-dream`

Once connected:
- Every push to `main` → Production deployment
- Every PR → Preview deployment

## Post-Deployment

### 1. Create Admin User

After first deployment, visit:
```
https://your-deployment-url.vercel.app/admin
```

Create your first admin user.

### 2. Seed Content

You can manually add content through the admin panel, or create a seed script.

### 3. Test Lead Forms

Test all three contact methods:
- WhatsApp link
- Phone call link
- Lead form submission

### 4. Verify SEO

Check that all pages have:
- Correct meta tags
- hreflang tags for EN/FR
- Structured data (JSON-LD)

### 5. Run Performance Tests

```bash
# Run Lighthouse
npx lighthouse https://your-url.vercel.app --view

# Check Web Vitals
# Visit https://pagespeed.web.dev
```

Ensure you meet the performance budgets:
- LCP < 2.5s
- CLS < 0.1
- TBT < 200ms

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Ensure Supabase connection string is valid
4. Check that `DATABASE_URL` format is correct (starts with `postgresql://`)

### Can't Access Admin Panel

1. Verify `PAYLOAD_SECRET` is set
2. Check Supabase connection (test in Supabase dashboard)
3. Look for errors in Vercel logs
4. Ensure database migrations ran successfully

### 404 Errors

1. Check your `next.config.js` i18n configuration
2. Verify routes match the expected pattern (`/en/*`, `/fr/*`)

### Environment Variables Not Working

1. Ensure variables starting with `NEXT_PUBLIC_` for client-side access
2. Rebuild after adding new environment variables
3. Check variable names match exactly (case-sensitive)

## Custom Domain Setup

After deployment:

1. Go to: https://vercel.com/ai-ads/atlas_dream/settings/domains
2. Click "Add Domain"
3. Enter your domain (e.g., `atlas-dream.com`)
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_URL` to your custom domain

## Monitoring

### Vercel Analytics

Vercel provides built-in analytics:
- Visit: https://vercel.com/ai-ads/atlas_dream/analytics

### Custom Analytics

Add Google Analytics:
1. Create GA4 property
2. Get tracking ID
3. Add as `NEXT_PUBLIC_GA_ID` in Vercel

## Backup Strategy

### Database Backups

Supabase automatically backs up your database daily (free tier: 7 days retention).

For manual backups:
1. In Supabase Dashboard, go to **Database** > **Backups**
2. Click "Create backup" for an instant backup
3. Or use `pg_dump` for local backups:
   ```bash
   pg_dump "your-supabase-connection-string" > backup.sql
   ```

### Code Backups

Your code is backed up in GitHub:
- https://github.com/AhmatF/atlas-dream

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Payload CMS Docs**: https://payloadcms.com/docs
- **Project Issues**: https://github.com/AhmatF/atlas-dream/issues

## Quick Reference

```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Pull environment variables to local
vercel env pull

# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Open project in browser
vercel open
```
