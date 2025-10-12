#!/bin/bash

# Script pour configurer Supabase S3 Storage avec Payload CMS

set -e

echo "🔧 Configuration de Supabase S3 Storage pour Payload CMS"
echo "========================================================"
echo ""

# Informations Supabase
PROJECT_ID="zbywcmcsktsjyithyvre"
BUCKET_NAME="media"

echo "📋 Étape 1 : Obtenir les credentials S3 de Supabase"
echo ""
echo "Pour obtenir vos credentials S3, suivez ces étapes :"
echo ""
echo "1. Allez sur : https://supabase.com/dashboard/project/$PROJECT_ID/settings/storage"
echo "2. Scrollez jusqu'à 'S3 Access Keys'"
echo "3. Copiez les informations suivantes :"
echo ""

read -p "S3_ACCESS_KEY_ID (ex: 4d0ff69b-xxxx-xxxx-xxxx-xxxxxxxxxxxx): " S3_ACCESS_KEY_ID
read -p "S3_SECRET_ACCESS_KEY (la longue clé secrète): " S3_SECRET_ACCESS_KEY

# Configuration par défaut pour Supabase
S3_REGION="us-east-1"
S3_ENDPOINT="https://$PROJECT_ID.supabase.co/storage/v1/s3"
S3_BUCKET="$BUCKET_NAME"

echo ""
echo "✅ Configuration détectée :"
echo "   Bucket: $S3_BUCKET"
echo "   Region: $S3_REGION"
echo "   Endpoint: $S3_ENDPOINT"
echo ""

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Erreur: Vercel CLI n'est pas installé"
    echo "   Installez-le avec: npm i -g vercel"
    exit 1
fi

echo "📤 Étape 2 : Ajout des variables d'environnement sur Vercel"
echo ""

# Fonction pour ajouter une variable
add_env_var() {
    local name=$1
    local value=$2
    local env=$3
    
    echo "   → Ajout de $name à $env..."
    
    # Supprimer l'ancienne si elle existe
    vercel env rm "$name" "$env" --yes 2>/dev/null || true
    
    # Ajouter la nouvelle
    echo "$value" | vercel env add "$name" "$env"
}

# Ajouter pour tous les environnements
for env in production preview development; do
    echo ""
    echo "Configuration de l'environnement: $env"
    add_env_var "S3_BUCKET" "$S3_BUCKET" "$env"
    add_env_var "S3_ACCESS_KEY_ID" "$S3_ACCESS_KEY_ID" "$env"
    add_env_var "S3_SECRET_ACCESS_KEY" "$S3_SECRET_ACCESS_KEY" "$env"
    add_env_var "S3_REGION" "$S3_REGION" "$env"
    add_env_var "S3_ENDPOINT" "$S3_ENDPOINT" "$env"
done

echo ""
echo "✅ Toutes les variables ont été ajoutées avec succès!"
echo ""
echo "📝 Résumé de la configuration :"
echo "   S3_BUCKET=$S3_BUCKET"
echo "   S3_REGION=$S3_REGION"
echo "   S3_ENDPOINT=$S3_ENDPOINT"
echo "   S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID:0:10}..."
echo "   S3_SECRET_ACCESS_KEY=***hidden***"
echo ""
echo "📦 Prochaines étapes :"
echo "  1. Commitez et pushez les changements de code"
echo "  2. Attendez que le déploiement se termine (~2 min)"
echo "  3. Testez en uploadant une image dans Payload Admin"
echo ""
echo "🔗 Liens utiles :"
echo "   - Supabase Storage : https://supabase.com/dashboard/project/$PROJECT_ID/storage/buckets"
echo "   - Vercel Deployments : https://vercel.com/ai-ads/atlas_dream"
echo "   - Payload Admin : https://atlasdream.vercel.app/admin"
echo ""

