# Guide de Migration des Images vers Supabase 🖼️

Ce guide vous aide à migrer les 17 images existantes du dossier `media/` vers Supabase Storage.

---

## 📦 Images à migrer

Nous avons **17 images** prêtes à être migrées :

**Voitures (8) :**
- audi-a8.jpg
- audi-q7.jpg
- bmw-7-series.jpg
- bmw-x7.jpg
- mercedes-benz-g-class-amg.jpg
- mercedes-benz-s-class.jpg
- range-rover-sport.jpg
- range-rover-vogue.jpg

**Villas (9) :**
- riad-authentique-medina.jpg
- riad-luxury-hivernage.jpg
- villa-golf-amelkis.jpg
- villa-majorelle-gueliz.jpg
- villa-moderne-hivernage.jpg
- villa-oasis-palmeraie.jpg
- villa-paradise-palmeraie.jpg
- villa-prestige-al-maaden.jpg
- villa-serenity-agdal.jpg

---

## 🚀 Migration Automatique (5 minutes)

### Prérequis

Assurez-vous d'avoir :
1. ✅ Le bucket `media` créé sur Supabase (et PUBLIC)
2. ✅ La variable `SUPABASE_SERVICE_ROLE_KEY` configurée

### Étape 1 : Installer les dépendances

```bash
npm install
```

Cela installera `tsx` nécessaire pour exécuter le script.

### Étape 2 : Configurer la clé Supabase

Vous avez deux options :

**Option A : Variable d'environnement temporaire**

```bash
export SUPABASE_SERVICE_ROLE_KEY="votre_service_role_key_ici"
```

**Option B : Utiliser .env.local**

Si vous avez un fichier `.env.local`, ajoutez :
```
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici
```

Pour obtenir la clé :
1. https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/settings/api
2. Copiez la clé `service_role`

### Étape 3 : Exécuter la migration

```bash
npm run migrate:images
```

Le script va :
1. 📦 Lire toutes les images du dossier `media/`
2. 📤 Les uploader vers Supabase Storage (bucket `media`)
3. ✅ Afficher l'URL publique de chaque image
4. 📊 Afficher un résumé

### Sortie attendue

```
🚀 Migration des images vers Supabase Storage
================================================

📦 17 images trouvées

📤 Uploading audi-a8.jpg...
   ✅ Uploadé: https://zbywcmcsktsjyithyvre.supabase.co/storage/v1/object/public/media/media/audi-a8.jpg
📤 Uploading audi-q7.jpg...
   ✅ Uploadé: https://zbywcmcsktsjyithyvre.supabase.co/storage/v1/object/public/media/media/audi-q7.jpg
...

📊 Résumé de la migration
========================
✅ Réussis: 17
❌ Échecs: 0
📦 Total: 17

🎉 Migration terminée avec succès!
```

---

## 🔍 Vérification

### Dans Supabase

1. Allez sur : https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/storage/buckets/media
2. Vous devriez voir un dossier `media/` avec les 17 images
3. Cliquez sur une image pour voir son URL publique

### Tester une URL

Copiez une URL et ouvrez-la dans votre navigateur :
```
https://zbywcmcsktsjyithyvre.supabase.co/storage/v1/object/public/media/media/audi-a8.jpg
```

Elle devrait s'afficher immédiatement !

---

## 🔗 Lier les images aux voitures/villas

Maintenant que les images sont dans Supabase, vous devez les lier aux voitures et villas dans Payload Admin.

### Option 1 : Via Payload Admin (Recommandé)

1. Allez sur https://atlasdream.vercel.app/admin
2. **Media** > **Create New**
3. Au lieu d'uploader, créez manuellement des entrées media avec les URLs Supabase
4. Ensuite, **Cars** ou **Villas** > Éditez chaque item > Ajoutez la media correspondante

### Option 2 : Script de liaison automatique (Avancé)

Si vous voulez lier automatiquement les images, je peux créer un script qui :
1. Crée les entrées Media dans Payload pour chaque image Supabase
2. Associe automatiquement les images aux voitures/villas par nom de fichier

Dites-moi si vous voulez cette option !

---

## 🆘 Dépannage

### Erreur : "SUPABASE_SERVICE_ROLE_KEY is required"

**Solution :** Exportez la variable :
```bash
export SUPABASE_SERVICE_ROLE_KEY="your_key"
```

### Erreur : "Bucket not found"

**Solution :** Le bucket `media` n'existe pas. Créez-le :
1. https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/storage/buckets
2. **New bucket** > Nom : `media` > **Public** ✅ > Create

### Erreur : "Access denied"

**Solutions :**
1. Vérifiez que le bucket est PUBLIC
2. Vérifiez que votre SERVICE_ROLE_KEY est correcte
3. Vérifiez que le bucket existe bien

### Images uploadées mais pas visibles

**Solution :** Le bucket n'est probablement pas public :
1. Cliquez sur le bucket `media`
2. Settings (engrenage) ⚙️
3. Cochez **Public bucket**
4. Save

---

## 📝 Après la migration

Une fois les images migrées et liées :

1. ✅ Les pages /cars et /villas afficheront les images
2. ✅ Les images seront servies depuis Supabase CDN
3. ✅ Plus de problèmes 502 !
4. ✅ Site 100% fonctionnel

---

## 🔄 Re-migration

Si vous devez re-migrer (par exemple après avoir modifié des images) :

Le script utilise `upsert: true`, donc il remplacera les fichiers existants. Vous pouvez le relancer sans problème :

```bash
npm run migrate:images
```

---

## 💡 Conseils

- **Backup** : Les images originales restent dans `media/`, donc pas de risque de perte
- **URLs** : Notez les URLs générées, elles seront utiles pour Payload
- **Batch** : Le script traite toutes les images d'un coup
- **Logs** : Gardez les logs pour référence

---

## ✅ Checklist

- [ ] Dépendances installées (`npm install`)
- [ ] SUPABASE_SERVICE_ROLE_KEY configurée
- [ ] Bucket `media` créé et PUBLIC sur Supabase
- [ ] Script exécuté (`npm run migrate:images`)
- [ ] 17/17 images uploadées avec succès
- [ ] Images vérifiées dans Supabase Storage
- [ ] URLs testées dans le navigateur
- [ ] Images liées aux voitures/villas dans Payload Admin

---

**Prêt ? Exécutez : `npm run migrate:images` 🚀**

