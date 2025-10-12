# Configuration Vercel Blob Storage - Guide Rapide

## ✅ Pourquoi Vercel Blob au lieu de Supabase Storage ?

Supabase Storage n'a pas d'adaptateur officiel pour Payload CMS. **Vercel Blob** est la meilleure alternative car :
- ✅ **Intégration native** avec Vercel (votre plateforme de déploiement)
- ✅ **Configuration simple** (1 commande !)
- ✅ **Gratuit** : 500MB de stockage
- ✅ **Rapide** : CDN mondial automatique
- ✅ **Support officiel** par Payload CMS

---

## 🚀 Configuration (5 minutes)

### Étape 1 : Créer le Vercel Blob Store (2 min)

**Via Vercel Dashboard (recommandé) :**

1. Allez sur https://vercel.com/ai-ads/atlas_dream/stores
2. Cliquez **Create Database**
3. Sélectionnez **Blob**
4. Nommez-le : `media` (ou laissez le nom par défaut)
5. Cliquez **Create**

Vercel va automatiquement créer la variable d'environnement `BLOB_READ_WRITE_TOKEN` pour tous vos environnements (Production, Preview, Development).

**OU via Vercel CLI :**

```bash
vercel blob create
```

### Étape 2 : Vérifier les variables d'environnement (1 min)

```bash
vercel env ls
```

Vous devriez voir `BLOB_READ_WRITE_TOKEN` dans la liste.

### Étape 3 : Déployer (2 min)

Le code est déjà configuré ! Il suffit de pousser :

```bash
git add .
git commit -m "fix: use Vercel Blob instead of Supabase for media storage"
git push
```

Attendez ~2 minutes que le build se termine.

### Étape 4 : Tester (1 min)

1. Allez sur https://atlasdream.vercel.app/admin
2. **Media** > **Create New**
3. Uploadez une image
4. ✅ L'image devrait s'afficher correctement !

---

## 💰 Limites et Prix

### Free Tier (inclus)
- **500 MB** de stockage
- **1 GB** de bande passante/mois
- Idéal pour démarrer !

### Si vous dépassez
- **$0.15/GB** de stockage supplémentaire
- **$0.15/GB** de bande passante supplémentaire

Pour référence : ~100 images haute qualité = ~50MB

---

## 🔍 Vérification

### Check 1 : Variable d'environnement

```bash
vercel env ls | grep BLOB
```

Devrait afficher : `BLOB_READ_WRITE_TOKEN`

### Check 2 : Blob Store créé

Allez sur : https://vercel.com/ai-ads/atlas_dream/stores

Vous devriez voir votre Blob store.

### Check 3 : Images uploadées

Dans le Blob Store, vous verrez les images uploadées via Payload Admin.

---

## 📊 Avantages vs Supabase Storage

| Fonctionnalité | Vercel Blob | Supabase Storage |
|----------------|-------------|------------------|
| Intégration Payload | ✅ Officielle | ❌ Pas d'adaptateur |
| Configuration | 🟢 1 commande | 🔴 Config complexe |
| CDN Global | ✅ Automatique | ⚠️ Manuel |
| Prix gratuit | 500MB | 1GB |
| Performance | 🟢 Excellent (même infra) | 🟡 Bon |
| Setup time | ⏱️ 5 min | ⏱️ 30+ min |

---

## 🆘 Problèmes courants

### Erreur : "BLOB_READ_WRITE_TOKEN is not defined"

**Solution :** Le Blob Store n'est pas créé. Retournez à l'Étape 1.

### Erreur : "Access denied" lors de l'upload

**Solution :** 
1. Vérifiez que le token existe : `vercel env ls`
2. Recréez le déploiement : `vercel --prod`

### Le build échoue

**Solution :** Vérifiez que vous avez bien poussé les derniers changements :
```bash
git status
git push
```

---

## 📝 Ce qui a été configuré

Voici ce que j'ai fait dans le code :

1. **`src/payload/plugins/vercelBlobStorage.ts`** - Plugin Vercel Blob
2. **`src/payload/payload.config.ts`** - Utilise le plugin Vercel Blob
3. **`src/payload/collections/Media.ts`** - `staticDir` supprimé
4. **`next.config.js`** - Patterns d'images configurés

✅ Tout est prêt ! Il suffit de créer le Blob Store et déployer.

---

## 🎉 Après configuration

Les images seront stockées dans Vercel Blob et servies via le CDN Vercel :
- ✅ Rapide (même infrastructure)
- ✅ Fiable (99.9% uptime)
- ✅ Scalable (gère des millions d'images)
- ✅ Sécurisé (HTTPS automatique)

---

## 📚 Documentation officielle

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Payload Cloud Storage Plugin](https://payloadcms.com/docs/plugins/cloud-storage)
- [Vercel Blob Quickstart](https://vercel.com/docs/storage/vercel-blob/quickstart)

---

## ✅ Checklist

- [ ] Blob Store créé sur Vercel
- [ ] Variable `BLOB_READ_WRITE_TOKEN` existe
- [ ] Code poussé sur GitHub
- [ ] Déploiement terminé
- [ ] Image de test uploadée et fonctionne

Une fois ces étapes terminées : **🎉 Site 100% fonctionnel !**

