#!/bin/bash

# Atlas Dream - Vercel Environment Variables Setup Script
# This script helps you set up all required environment variables in Vercel

echo "🚀 Atlas Dream - Vercel Environment Variables Setup"
echo "=================================================="
echo ""
echo "This script will help you add environment variables to your Vercel project."
echo "You'll need to provide values for the following:"
echo ""
echo "  1. DATABASE_URL - Supabase PostgreSQL connection string"
echo "  2. PAYLOAD_SECRET - Secret key for Payload CMS (min 32 characters)"
echo "  3. NEXT_PUBLIC_URL - Your production URL (will be auto-set by Vercel)"
echo ""
echo "Note: NEXT_PUBLIC_WHATSAPP_NUMBER, NEXT_PUBLIC_PHONE_NUMBER, and"
echo "NEXT_PUBLIC_CALENDLY_URL are already defined in the code and can be"
echo "added later if they change."
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

# Function to add environment variable
add_env_var() {
  local var_name=$1
  local var_description=$2
  local environments=$3

  echo "Adding $var_name ($var_description)..."
  echo "Environments: $environments"
  echo ""

  vercel env add "$var_name" "$environments"

  if [ $? -eq 0 ]; then
    echo "✅ $var_name added successfully"
  else
    echo "❌ Failed to add $var_name"
  fi
  echo ""
}

# Add DATABASE_URL for all environments
echo "📦 Setting up DATABASE_URL..."
echo "This should be your Supabase PostgreSQL connection string"
echo "Get it from: Supabase Dashboard > Project Settings > Database > Connection string (URI)"
echo "Format: postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres"
add_env_var "DATABASE_URL" "Supabase PostgreSQL connection string" "production preview development"

# Add PAYLOAD_SECRET for all environments
echo "🔐 Setting up PAYLOAD_SECRET..."
echo "This should be a secure random string (min 32 characters)"
echo "You can generate one with: openssl rand -base64 32"
add_env_var "PAYLOAD_SECRET" "Payload CMS secret key" "production preview development"

# Add NEXT_PUBLIC_URL for production
echo "🌐 Setting up NEXT_PUBLIC_URL..."
echo "This will be your production URL (e.g., https://atlas-dream.vercel.app)"
echo "You can skip this and Vercel will auto-populate it"
read -p "Do you want to set NEXT_PUBLIC_URL now? (y/n): " set_url
if [ "$set_url" = "y" ] || [ "$set_url" = "Y" ]; then
  add_env_var "NEXT_PUBLIC_URL" "Production URL" "production"
fi

echo ""
echo "=================================================="
echo "✅ Environment variables setup complete!"
echo ""
echo "Next steps:"
echo "  1. Connect your GitHub account in Vercel dashboard if not done"
echo "  2. Run 'vercel --prod' to deploy"
echo "  3. Visit your Vercel dashboard to verify environment variables"
echo ""
echo "Optional environment variables you can add later:"
echo "  - NEXT_PUBLIC_GA_ID (Google Analytics)"
echo "  - NEXT_PUBLIC_GTM_ID (Google Tag Manager)"
echo ""
