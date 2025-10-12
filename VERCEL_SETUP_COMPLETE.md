# ✅ Configuration Vercel Terminée

## 🎉 Résumé

Votre projet Atlas Dream est maintenant configuré pour le déploiement sur Vercel avec gestion automatique des environnements.

## 📋 Ce qui a été fait

### 1. Variables d'environnement configurées sur Vercel ✅

| Variable | Statut | Environnement |
|----------|--------|---------------|
| `DATABASE_URL` | ✅ Configurée | Production, Preview, Development |
| `PAYLOAD_SECRET` | ✅ Configurée | Production, Preview, Development |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ✅ Configurée | Production |
| `NEXT_PUBLIC_PHONE_NUMBER` | ✅ Configurée | Production |
| `NEXT_PUBLIC_CALENDLY_URL` | ✅ Configurée | Production |

### 2. Gestion automatique des URLs ✅

**Fichier créé** : `src/lib/env.ts`

Ce fichier gère automatiquement :
- ✅ Détection de l'environnement (dev/prod)
- ✅ Passage automatique de `localhost` → `VERCEL_URL`
- ✅ Support des domaines personnalisés
- ✅ Utilitaires pratiques (`getServerUrl()`, `getPublicUrl()`, etc.)

### 3. Scripts et documentation ✅

| Fichier | Description |
|---------|-------------|
| `scripts/setup-vercel-env.sh` | Script pour reconfigurer toutes les variables |
| `.env.production.example` | Exemple de configuration production avec commentaires |
| `docs/DEPLOYMENT.md` | Guide complet de déploiement |

## 🚀 Comment Déployer

### Déploiement Preview (test)
```bash
vercel
```
Crée un déploiement de test avec URL unique.

### Déploiement Production
```bash
vercel --prod
```
Déploie en production sur votre domaine principal.

## 🔄 Comment ça marche ?

### En Développement (localhost)
```
http://localhost:3000
```

### En Production (Vercel)
Vercel injecte automatiquement `VERCEL_URL`, et le code dans `src/lib/env.ts` l'utilise :

```
https://atlas-dream-xyz123.vercel.app
```

**Aucune modification de code nécessaire !** 🎉

## 📝 Utilisation dans le Code

```typescript
// Importer les utilitaires
import { env } from '@/lib/env';

// Utiliser les URLs (auto-détectées)
console.log(env.serverUrl);    // http://localhost:3000 en dev
                                // https://vercel-url en prod

console.log(env.publicUrl);    // Même chose pour le front-end

// Vérifier l'environnement
if (env.isProduction) {
  // Code spécifique à la production
}

// Accéder aux variables de contact
console.log(env.whatsappNumber);  // 212774885461
console.log(env.phoneNumber);     // +212774885461
console.log(env.calendlyUrl);     // URL Calendly
```

## ⚠️ Important à Retenir

1. **Ne jamais commiter le fichier `.env`** - Il est déjà dans `.gitignore` ✅
2. **Les URLs localhost sont automatiquement remplacées** - Pas besoin de les changer manuellement ✅
3. **Variables `NEXT_PUBLIC_*`** - Sont exposées au client (normal pour les numéros de contact) ✅
4. **Mettre à jour l'URL Calendly** - Pensez à remplacer par votre vraie URL :
   ```bash
   echo 'https://calendly.com/VOTRE-LIEN' | vercel env add NEXT_PUBLIC_CALENDLY_URL production
   ```

## 🔧 Commandes Utiles

```bash
# Lister les variables
vercel env ls

# Télécharger les variables en local
vercel env pull

# Voir les logs de production
vercel logs

# Voir les déploiements
vercel ls

# Ouvrir le dashboard
vercel
```

## 🌐 Ajouter un Domaine Personnalisé

1. Allez dans le dashboard Vercel : https://vercel.com/dashboard
2. Sélectionnez votre projet `atlas_dream`
3. Settings > Domains
4. Ajoutez votre domaine (ex: `www.atlas-dream.com`)
5. Suivez les instructions DNS

**Optionnel** : Forcer l'utilisation du domaine personnalisé :
```bash
vercel env add PAYLOAD_PUBLIC_SERVER_URL production
# Entrez: https://www.atlas-dream.com

vercel env add NEXT_PUBLIC_URL production
# Entrez: https://www.atlas-dream.com
```

## 📚 Documentation

- Voir `docs/DEPLOYMENT.md` pour le guide complet
- Voir `.env.production.example` pour les exemples de configuration

## 🐛 Besoin d'aide ?

Si vous rencontrez des problèmes :

1. Vérifiez les logs : `vercel logs`
2. Vérifiez les variables : `vercel env ls`
3. Consultez `docs/DEPLOYMENT.md` section "Dépannage"

---

**Prêt à déployer !** 🚀

```bash
vercel --prod
```
