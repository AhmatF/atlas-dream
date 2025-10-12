# Configuration Supabase Storage - TERMINÉE ✅

## ✅ Ce qui a été fait

J'ai configuré automatiquement Supabase Storage pour votre projet :

### 1. Fichiers créés/modifiés

- ✅ **`src/payload/plugins/supabaseStorage.ts`** - Plugin Supabase Storage
- ✅ **`src/payload/payload.config.ts`** - Ajout du plugin
- ✅ **`src/payload/collections/Media.ts`** - Suppression de staticDir
- ✅ **`next.config.js`** - Ajout du pattern Supabase Storage
- ✅ **`add-supabase-storage-env.sh`** - Script pour ajouter les variables d'environnement

### 2. Dépendances

Les dépendances sont déjà installées dans package.json :
- ✅ `@payloadcms/plugin-cloud-storage@^3.59.1`
- ✅ `@supabase/supabase-js@^2.75.0`

---

## 🔧 Actions requises de votre part

### Étape 1 : Obtenir la clé SERVICE_ROLE

1. Allez sur : https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/settings/api
2. Scrollez jusqu'à **Project API keys**
3. Copiez la clé **`service_role`** (gardez-la secrète !)

⚠️ **IMPORTANT** : Ne partagez JAMAIS cette clé publiquement !

### Étape 2 : Ajouter les variables d'environnement sur Vercel

**Option A : Via le script automatique (recommandé)**

```bash
./add-supabase-storage-env.sh
```

Le script vous demandera votre `service_role` key et ajoutera automatiquement toutes les variables.

**Option B : Manuellement via l'interface Vercel**

1. Allez sur : https://vercel.com/ai-ads/atlas_dream/settings/environment-variables

2. Ajoutez ces 3 variables (pour Production, Preview, et Development) :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://zbywcmcsktsjyithyvre.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieXdjbWNza3RzanlpdGh5dnJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMzE2MDksImV4cCI6MjA3NTcwNzYwOX0.gFKRzcTvwRbxsYqAtiZ5cqoi37KM4YLv5RnSxLENpoQ

SUPABASE_SERVICE_ROLE_KEY=<votre_clé_service_role_ici>
```

### Étape 3 : Vérifier le bucket Supabase

1. Allez sur : https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/storage/buckets
2. Vérifiez que le bucket **`media`** existe
3. **Assurez-vous qu'il est PUBLIC** :
   - Cliquez sur le bucket `media`
   - Settings (icône engrenage)
   - Cochez "Public bucket" si ce n'est pas déjà fait
   - Sauvegardez

### Étape 4 : Déployer

```bash
# Commiter les changements
git add .
git commit -m "feat: configure Supabase Storage for media files"
git push

# Attendre ~2 minutes que Vercel déploie
```

### Étape 5 : Tester

Une fois déployé :

1. Allez sur l'admin Payload : `https://atlasdream.vercel.app/admin`
2. Connectez-vous
3. Allez dans **Media** > **Create New**
4. Uploadez une image de test
5. Vérifiez que l'image s'affiche correctement

Les nouvelles images seront automatiquement stockées dans Supabase Storage au lieu du système de fichiers local.

---

## 🔍 Vérification de la configuration

### Check 1 : Variables d'environnement

```bash
# Via Vercel CLI
vercel env ls
```

Vous devriez voir :
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY  
- ✅ SUPABASE_SERVICE_ROLE_KEY

### Check 2 : Bucket Supabase

URL publique du bucket : 
```
https://zbywcmcsktsjyithyvre.supabase.co/storage/v1/object/public/media/
```

### Check 3 : Après le déploiement

Testez que les images se chargent sans erreur 502 :
```bash
# Ouvrez votre site et vérifiez les images dans les pages cars/villas
```

---

## ❓ FAQ

### Q: Les anciennes images vont-elles fonctionner ?

**Non**, les images uploadées avant cette configuration ne fonctionneront pas car elles sont stockées localement. Vous devrez :
1. Les télécharger depuis le dossier `media/`
2. Les re-uploader via Payload Admin (elles seront automatiquement dans Supabase)

### Q: Puis-je migrer les anciennes images automatiquement ?

Oui, mais vous devrez d'abord les uploader dans Supabase Storage manuellement ou via un script, puis mettre à jour les références dans la base de données.

### Q: Combien d'espace de stockage ai-je ?

Supabase Free Tier :
- 1 GB de stockage
- 2 GB de bande passante par mois

Si vous dépassez, vous devrez upgrader à un plan payant.

### Q: Les images sont-elles optimisées ?

Oui, Next.js Image Optimization optimise automatiquement les images servies depuis Supabase Storage.

---

## 🆘 En cas de problème

### Erreur : "Invalid endpoint"

→ Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` est correct et se termine par `.supabase.co`

### Erreur : "Invalid API key"

→ Vérifiez que vos clés sont correctes :
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` doit être la clé `anon`
- `SUPABASE_SERVICE_ROLE_KEY` doit être la clé `service_role`

### Erreur 403 lors de l'upload

→ Vérifiez que le bucket `media` est configuré en **public**

### Erreur 502 persiste

→ Vérifiez que :
1. Les variables d'environnement sont bien ajoutées sur Vercel
2. Le déploiement est terminé
3. Le bucket est public
4. Vous uploadez de nouvelles images (pas d'anciennes)

---

## 📚 Ressources

- [Payload Cloud Storage Plugin](https://payloadcms.com/docs/plugins/cloud-storage)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## ✅ Checklist finale

- [ ] Bucket `media` créé sur Supabase
- [ ] Bucket configuré en public
- [ ] SERVICE_ROLE_KEY obtenue
- [ ] Variables d'environnement ajoutées sur Vercel
- [ ] Code commité et pushé
- [ ] Déploiement terminé
- [ ] Image de test uploadée et affichée correctement

Une fois ces étapes terminées, les images fonctionneront parfaitement ! 🎉

