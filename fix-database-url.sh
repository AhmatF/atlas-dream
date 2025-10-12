#!/bin/bash

# Script pour mettre à jour DATABASE_URL avec le Supabase Connection Pooler

set -e

echo "🔧 Script de mise à jour de DATABASE_URL pour Supabase Connection Pooler"
echo "================================================================="
echo ""

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Erreur: Vercel CLI n'est pas installé"
    echo "   Installez-le avec: npm i -g vercel"
    exit 1
fi

echo "📋 Étape 1: Obtenir l'URL du Connection Pooler"
echo ""
echo "Veuillez suivre ces étapes sur Supabase:"
echo "1. Allez sur: https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre"
echo "2. Settings > Database > Connection string"
echo "3. Sélectionnez l'onglet 'Transaction' (pas 'Direct connection')"
echo "4. Copiez l'URL complète"
echo ""
echo "⚠️  IMPORTANT: L'URL doit contenir ':6543' (pas ':5432')"
echo "   Format attendu: postgresql://postgres.PROJECT_ID:PASSWORD@....pooler.supabase.com:6543/postgres"
echo ""

read -p "Entrez l'URL du Connection Pooler: " POOLER_URL

# Vérifier que l'URL contient 6543 (port du pooler)
if [[ ! $POOLER_URL =~ :6543 ]]; then
    echo "⚠️  ATTENTION: L'URL ne contient pas le port 6543"
    echo "   Êtes-vous sûr d'avoir sélectionné l'onglet 'Transaction' ?"
    read -p "Continuer quand même ? (y/N): " confirm
    if [[ $confirm != "y" && $confirm != "Y" ]]; then
        echo "❌ Opération annulée"
        exit 1
    fi
fi

echo ""
echo "📤 Étape 2: Mise à jour de DATABASE_URL sur Vercel"
echo ""

# Fonction pour ajouter la variable à un environnement
add_env_var() {
    local env=$1
    echo "   → Mise à jour pour: $env"
    
    # Supprimer l'ancienne variable (ignorer les erreurs si elle n'existe pas)
    vercel env rm DATABASE_URL $env --yes 2>/dev/null || true
    
    # Ajouter la nouvelle variable
    echo "$POOLER_URL" | vercel env add DATABASE_URL $env
}

# Mettre à jour pour tous les environnements
add_env_var "production"
add_env_var "preview"
add_env_var "development"

echo ""
echo "✅ DATABASE_URL mis à jour avec succès !"
echo ""
echo "📦 Étape 3: Redéploiement"
echo ""
echo "Pour appliquer les changements, redéployez l'application:"
echo ""
echo "Option 1 - Push automatique (recommandé):"
echo "  git commit --allow-empty -m 'trigger redeploy with pooler URL'"
echo "  git push"
echo ""
echo "Option 2 - Déploiement manuel:"
echo "  vercel --prod"
echo ""

read -p "Voulez-vous redéployer maintenant ? (y/N): " deploy_now

if [[ $deploy_now == "y" || $deploy_now == "Y" ]]; then
    echo ""
    echo "🚀 Déploiement en cours..."
    git commit --allow-empty -m "fix: use Supabase Connection Pooler for database"
    git push
    
    echo ""
    echo "⏳ Attendez environ 2 minutes que le déploiement se termine..."
    echo "   Ensuite, testez avec:"
    echo "   curl -I https://atlasdream.vercel.app/en/cars"
else
    echo ""
    echo "⚠️  N'oubliez pas de redéployer pour appliquer les changements !"
fi

echo ""
echo "✅ Script terminé !"

