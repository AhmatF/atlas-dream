#!/bin/bash
# Script pour corriger les variables d'environnement Vercel (enlever les \n)

set -e

echo "🔧 Correction des variables d'environnement Vercel"
echo "=================================================="

# Variables S3 à corriger
declare -a vars=("S3_ACCESS_KEY_ID" "S3_SECRET_ACCESS_KEY" "S3_BUCKET" "S3_REGION" "S3_ENDPOINT")

for env in production preview development; do
    echo ""
    echo "📝 Environnement: $env"
    
    for var in "${vars[@]}"; do
        echo "  → Correction de $var..."
        
        # Récupérer la valeur actuelle
        current_value=$(vercel env ls --environment=$env | grep "^$var " | awk '{print $2}')
        
        if [ ! -z "$current_value" ]; then
            # Supprimer et recréer sans \n
            vercel env rm "$var" "$env" --yes 2>/dev/null || true
            
            # Re-créer proprement
            case $var in
                S3_BUCKET)
                    echo "media" | vercel env add "$var" "$env"
                    ;;
                S3_REGION)
                    echo "eu-central-1" | vercel env add "$var" "$env"
                    ;;
                S3_ENDPOINT)
                    echo "https://zbywcmcsktsjyithyvre.supabase.co/storage/v1/s3" | vercel env add "$var" "$env"
                    ;;
                S3_ACCESS_KEY_ID)
                    echo "b4a1cfdd0f170233c1f4b2d4a9c252c6" | vercel env add "$var" "$env"
                    ;;
                S3_SECRET_ACCESS_KEY)
                    echo "756c440fac50648119edb92c1bddb355c1cfce3431b15ad46b66ba1dea584840" | vercel env add "$var" "$env"
                    ;;
            esac
        fi
    done
done

echo ""
echo "✅ Correction terminée!"
