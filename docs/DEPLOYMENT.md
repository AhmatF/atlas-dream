# Guide de Déploiement - Atlas Dream

## Configuration des Variables d'Environnement

### 📋 Vue d'ensemble

Ce projet gère automatiquement le passage entre les environnements de développement (localhost) et production (Vercel) via le fichier `src/lib/env.ts`.

### 🔑 Variables Configurées sur Vercel

Les variables suivantes sont déjà configurées sur Vercel :

✅ **DATABASE_URL** - Connexion PostgreSQL Supabase
✅ **PAYLOAD_SECRET** - Secret Payload CMS
✅ **NEXT_PUBLIC_WHATSAPP_NUMBER** - Numéro WhatsApp
✅ **NEXT_PUBLIC_PHONE_NUMBER** - Numéro de téléphone
✅ **NEXT_PUBLIC_CALENDLY_URL** - URL Calendly
✅ **PAYLOAD_PUBLIC_SERVER_URL** - URL du serveur (auto-détectée)

### 🔄 Gestion Automatique des URLs

#### En Développement (localhost)
```bash
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000
```

#### En Production (Vercel)
Les URLs sont **automatiquement détectées** via `VERCEL_URL` :
```bash
# Vercel injecte automatiquement :
VERCEL_URL=atlas-dream-xyz123.vercel.app
VERCEL_ENV=production

# Le code utilise ensuite :
PAYLOAD_PUBLIC_SERVER_URL=https://atlas-dream-xyz123.vercel.app
NEXT_PUBLIC_URL=https://atlas-dream-xyz123.vercel.app
```

**Aucune configuration manuelle nécessaire !** 🎉

### 🌐 Utilisation d'un Domaine Personnalisé

Si vous configurez un domaine personnalisé (ex: `www.atlas-dream.com`) :

1. **Dans le dashboard Vercel** : Settings > Domains > Ajoutez votre domaine
2. **Optionnel** : Forcez l'utilisation de votre domaine au lieu de VERCEL_URL :

```bash
vercel env add PAYLOAD_PUBLIC_SERVER_URL production
# Entrez: https://www.atlas-dream.com

vercel env add NEXT_PUBLIC_URL production
# Entrez: https://www.atlas-dream.com
```

### 📝 Vérifier les Variables

```bash
# Lister toutes les variables
vercel env ls

# Télécharger les variables en local (pour dev)
vercel env pull
```

### 🚀 Déploiement

#### 1. Preview (pré-production)
```bash
vercel
```
Crée un déploiement de prévisualisation avec une URL unique.

#### 2. Production
```bash
vercel --prod
```
Déploie en production sur votre domaine principal.

### 🔧 Utilisation dans le Code

#### Importer les utilitaires d'environnement
```typescript
import { env } from '@/lib/env';

// Accès aux variables
console.log(env.serverUrl);      // URL du serveur (auto-détectée)
console.log(env.publicUrl);      // URL publique (auto-détectée)
console.log(env.isProduction);   // true/false
console.log(env.whatsappNumber); // 212774885461
console.log(env.phoneNumber);    // +212774885461
console.log(env.calendlyUrl);    // URL Calendly
```

#### Utilisation dans les composants
```typescript
import { getPublicUrl } from '@/lib/env';

export default function MyComponent() {
  const baseUrl = getPublicUrl();

  return (
    <a href={`${baseUrl}/api/download`}>
      Télécharger
    </a>
  );
}
```

### ⚙️ Configuration des Variables (Script Automatique)

Si vous devez reconfigurer toutes les variables :

```bash
chmod +x scripts/setup-vercel-env.sh
./scripts/setup-vercel-env.sh
```

### 🔒 Sécurité

- ✅ Le fichier `.env` est dans `.gitignore` (jamais commité)
- ✅ Les valeurs sont chiffrées sur Vercel
- ✅ Seuls les environnements configurés y ont accès
- ✅ Les variables `NEXT_PUBLIC_*` sont exposées au client (normal pour les numéros de contact)

### 🐛 Dépannage

#### Problème : Les URLs localhost apparaissent en production
**Solution** : Vérifiez que `VERCEL_URL` est bien injecté :
```bash
vercel env ls | grep VERCEL_URL
```

#### Problème : Variables manquantes après déploiement
**Solution** : Redéployez après avoir ajouté les variables :
```bash
vercel env pull  # Télécharger les nouvelles variables
vercel --prod    # Redéployer
```

#### Problème : Base de données inaccessible en production
**Solution** : Vérifiez que `DATABASE_URL` est bien configurée :
```bash
vercel env ls | grep DATABASE_URL
```

### 📚 Ressources

- [Documentation Vercel - Environment Variables](https://vercel.com/docs/environment-variables)
- [Payload CMS - Configuration](https://payloadcms.com/docs/configuration/overview)
- [Next.js - Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Dernière mise à jour** : 2025-10-12
