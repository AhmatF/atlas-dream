# Guide Supabase S3 Storage avec Payload CMS 🚀

Configuration suivant le guide officiel de Payload CMS pour Supabase.

---

## ✅ Ce qui est fait

J'ai configuré le code selon le guide officiel Payload CMS :

1. ✅ **Plugin `@payloadcms/storage-s3` installé**
2. ✅ **Configuration S3 créée** → `src/payload/plugins/s3Storage.ts`
3. ✅ **Payload config mis à jour** → Utilise le plugin S3
4. ✅ **Collection Media configurée** → `upload: true`
5. ✅ **Script automatique créé** → `setup-supabase-s3.sh`

---

## 🎯 CE QU'IL VOUS RESTE À FAIRE (10 minutes)

### Étape 1 : Créer/Vérifier le bucket Supabase (2 min)

1. Allez sur : https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/storage/buckets
2. Si le bucket `media` n'existe pas, créez-le :
   - Cliquez **New bucket**
   - Nom : `media`
   - **Public bucket** : ✅ Coché (important !)
   - Cliquez **Create**

### Étape 2 : Obtenir les credentials S3 (3 min)

1. Allez sur : https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/settings/storage
2. Scrollez jusqu'à **S3 Access Keys**
3. Si aucune clé n'existe :
   - Cliquez **Generate new key**
   - Nommez-la : `payload-cms`
   - Copiez les deux clés (elles ne seront affichées qu'une fois !)

**Vous aurez besoin de :**
- `S3_ACCESS_KEY_ID` (format : `4d0ff69b-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
- `S3_SECRET_ACCESS_KEY` (une longue chaîne aléatoire)

### Étape 3 : Configurer Vercel (3 min)

**Option A : Script automatique (recommandé)**

```bash
./setup-supabase-s3.sh
```

Le script vous demandera les deux clés et configurera automatiquement Vercel.

**Option B : Manuellement**

Allez sur https://vercel.com/ai-ads/atlas_dream/settings/environment-variables

Ajoutez ces 5 variables pour **Production, Preview ET Development** :

```bash
S3_BUCKET=media

S3_ACCESS_KEY_ID=<votre_access_key_id>

S3_SECRET_ACCESS_KEY=<votre_secret_access_key>

S3_REGION=us-east-1

S3_ENDPOINT=https://zbywcmcsktsjyithyvre.supabase.co/storage/v1/s3
```

### Étape 4 : Déployer (2 min)

```bash
git add .
git commit -m "feat: configure Supabase S3 storage with official Payload plugin"
git push
```

Attendez ~2 minutes que Vercel déploie.

### Étape 5 : Tester 🧪

1. Allez sur https://atlasdream.vercel.app/admin
2. Connectez-vous
3. **Media** > **Create New**
4. Uploadez une image
5. ✅ L'image devrait être uploadée dans Supabase et affichée correctement !

---

## 🔍 Vérification

### Vérifier que le bucket est public

1. Allez dans Supabase Storage
2. Cliquez sur le bucket `media`
3. Settings (engrenage) ⚙️
4. **Public bucket** doit être ✅ coché

### Vérifier les variables Vercel

```bash
vercel env ls
```

Vous devriez voir :
- ✅ S3_BUCKET
- ✅ S3_ACCESS_KEY_ID
- ✅ S3_SECRET_ACCESS_KEY
- ✅ S3_REGION
- ✅ S3_ENDPOINT

### Vérifier l'upload

Après upload dans Payload Admin, vérifiez dans Supabase :
1. Storage > Buckets > media
2. Vous devriez voir vos fichiers dans le dossier `media/`

---

## 📊 Comment ça fonctionne ?

```
Upload dans Payload Admin
         ↓
Plugin @payloadcms/storage-s3
         ↓
API S3 de Supabase
         ↓
Stockage dans le bucket "media"
         ↓
URL publique générée
         ↓
Image affichée sur le site
```

---

## 🆘 Problèmes courants

### Erreur : "AccessDenied"

**Solution :** Vérifiez que :
1. Le bucket est **public**
2. Les credentials S3 sont corrects
3. La clé S3 a les permissions nécessaires

### Erreur : "SignatureDoesNotMatch"

**Solution :** Votre `S3_SECRET_ACCESS_KEY` est probablement incorrecte. Régénérez une nouvelle clé S3 dans Supabase.

### L'image n'apparaît pas

**Solution :**
1. Vérifiez que le bucket est **public**
2. Vérifiez l'URL dans Payload Admin (elle doit commencer par `https://zbywcmcsktsjyithyvre.supabase.co/`)
3. Testez l'URL directement dans votre navigateur

### Le build échoue

**Solution :** Vérifiez que le plugin est bien installé :
```bash
npm install @payloadcms/storage-s3 --legacy-peer-deps
```

---

## 💡 Pourquoi cette approche ?

✅ **Solution officielle** : Plugin supporté par Payload CMS  
✅ **Compatible S3** : Supabase Storage implémente l'API S3  
✅ **Testé et documenté** : Guide officiel Payload + Supabase  
✅ **Scalable** : Fonctionne en serverless (Vercel)  
✅ **Gratuit** : 1GB de stockage Supabase gratuit  

---

## 📚 Ressources

- [Guide officiel Payload + Supabase](https://payloadcms.com/posts/guides/setting-up-payload-with-supabase-for-your-nextjs-app-a-step-by-step-guide)
- [Plugin @payloadcms/storage-s3](https://payloadcms.com/docs/upload/overview)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Supabase S3 API](https://supabase.com/docs/guides/storage/s3/authentication)

---

## ✅ Checklist finale

- [ ] Bucket `media` créé et public sur Supabase
- [ ] Clés S3 générées (ACCESS_KEY_ID et SECRET_ACCESS_KEY)
- [ ] 5 variables d'environnement ajoutées sur Vercel
- [ ] Code commité et pushé
- [ ] Déploiement terminé
- [ ] Image de test uploadée via Payload Admin
- [ ] Image visible sur le site

Une fois tout ça fait : **🎉 Site 100% fonctionnel avec images Supabase !**

