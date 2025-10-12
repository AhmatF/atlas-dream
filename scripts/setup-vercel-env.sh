#!/bin/bash

# ==========================================
# Script de configuration des variables Vercel
# ==========================================
# Ce script configure toutes les variables d'environnement sur Vercel

set -e

echo "🚀 Configuration des variables d'environnement sur Vercel..."
echo ""

# Vérifier que le projet est lié à Vercel
if [ ! -d ".vercel" ]; then
  echo "❌ Le projet n'est pas lié à Vercel. Exécutez 'vercel link' d'abord."
  exit 1
fi

# Fonction pour ajouter une variable d'environnement
add_env_var() {
  local name=$1
  local value=$2
  local env=${3:-production}

  echo "📝 Ajout de $name pour l'environnement $env..."
  echo "$value" | vercel env add "$name" "$env" 2>&1 | grep -v "Overwrite" || true
}

# Configuration des variables principales
echo ""
echo "=== Variables de base de données ==="
add_env_var "DATABASE_URL" "postgresql://postgres:Rz7z3%21%2Bp.W%23YFKZ@db.zbywcmcsktsjyithyvre.supabase.co:5432/postgres" "production"

echo ""
echo "=== Variables Payload CMS ==="
add_env_var "PAYLOAD_SECRET" "pWfA6CxGAJKSBRyEJ+NoAO4Aek14P80bTnIiCoipbRY=" "production"

echo ""
echo "=== Variables de contact ==="
add_env_var "NEXT_PUBLIC_WHATSAPP_NUMBER" "212774885461" "production"
add_env_var "NEXT_PUBLIC_PHONE_NUMBER" "+212774885461" "production"

echo ""
echo "⚠️  IMPORTANT: Pensez à mettre à jour l'URL Calendly !"
echo "Exécutez manuellement:"
echo "  echo 'https://calendly.com/VOTRE-LIEN' | vercel env add NEXT_PUBLIC_CALENDLY_URL production"

echo ""
echo "✅ Configuration terminée !"
echo ""
echo "📋 Vérifiez vos variables avec:"
echo "  vercel env ls"
echo ""
echo "🔧 Les URLs (PAYLOAD_PUBLIC_SERVER_URL et NEXT_PUBLIC_URL) seront"
echo "   automatiquement gérées par VERCEL_URL lors du déploiement."
echo ""
echo "🚀 Pour déployer:"
echo "  vercel --prod"
