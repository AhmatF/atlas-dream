# Atlas Dream - Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- ✅ Git repository created (Done)
- ✅ Vercel account logged in (Done)
- ✅ Vercel project linked (Done)
- ⏳ Environment variables configured (Next step)
- ⏳ MongoDB database setup (Required)

## Environment Variables Setup

You need to configure the following environment variables in Vercel:

### Required Variables

1. **DATABASE_URI** (Required for all environments)
   - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/atlas-dream?retryWrites=true&w=majority`
   - Get this from:
     - MongoDB Atlas: https://cloud.mongodb.com
     - Or use local MongoDB: `mongodb://localhost:27017/atlas-dream`

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
# Add DATABASE_URI
vercel env add DATABASE_URI production preview development

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

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended for production)

1. Go to https://cloud.mongodb.com
2. Create a free account
3. Create a new cluster (Free M0 tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Add this as `DATABASE_URI` in Vercel

### Option 2: Local MongoDB (Development only)

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/atlas-dream`

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
3. Ensure MongoDB connection string is valid

### Can't Access Admin Panel

1. Verify `PAYLOAD_SECRET` is set
2. Check MongoDB connection
3. Look for errors in Vercel logs

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

MongoDB Atlas automatically backs up your data.

For manual backups:
```bash
mongodump --uri="your-mongodb-connection-string"
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
