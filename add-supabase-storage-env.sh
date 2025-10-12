#!/bin/bash

# Script pour ajouter les variables d'environnement Supabase Storage sur Vercel

set -e

echo "🔧 Adding Supabase Storage environment variables to Vercel"
echo "============================================================"
echo ""

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Error: Vercel CLI is not installed"
    echo "   Install with: npm i -g vercel"
    exit 1
fi

# Variables Supabase
SUPABASE_URL="https://zbywcmcsktsjyithyvre.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieXdjbWNza3RzanlpdGh5dnJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMzE2MDksImV4cCI6MjA3NTcwNzYwOX0.gFKRzcTvwRbxsYqAtiZ5cqoi37KM4YLv5RnSxLENpoQ"

echo "📋 Getting Supabase Service Role Key..."
echo ""
echo "⚠️  IMPORTANT: You need to get your SERVICE_ROLE_KEY from Supabase"
echo "   1. Go to: https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/settings/api"
echo "   2. Copy the 'service_role' key (keep it secret!)"
echo ""

read -p "Enter your SUPABASE_SERVICE_ROLE_KEY: " SERVICE_ROLE_KEY

if [[ -z "$SERVICE_ROLE_KEY" ]]; then
    echo "❌ Error: SERVICE_ROLE_KEY cannot be empty"
    exit 1
fi

echo ""
echo "📤 Adding variables to Vercel..."
echo ""

# Fonction pour ajouter une variable
add_env_var() {
    local name=$1
    local value=$2
    local env=$3
    
    echo "   → Adding $name to $env..."
    
    # Supprimer l'ancienne si elle existe
    vercel env rm "$name" "$env" --yes 2>/dev/null || true
    
    # Ajouter la nouvelle
    echo "$value" | vercel env add "$name" "$env"
}

# Ajouter pour tous les environnements
for env in production preview development; do
    echo ""
    echo "Adding variables for: $env"
    add_env_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL" "$env"
    add_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY" "$env"
    add_env_var "SUPABASE_SERVICE_ROLE_KEY" "$SERVICE_ROLE_KEY" "$env"
done

echo ""
echo "✅ All variables added successfully!"
echo ""
echo "📦 Next steps:"
echo "  1. Install dependencies: npm install @payloadcms/plugin-cloud-storage @supabase/supabase-js"
echo "  2. Commit and push changes"
echo "  3. Wait for deployment"
echo "  4. Test by uploading an image in Payload Admin"
echo ""

