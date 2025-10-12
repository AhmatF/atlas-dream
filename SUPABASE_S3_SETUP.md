# Configuration Supabase S3 Storage pour Payload CMS

## Problème résolu

L'intégration Payload CMS + Supabase Storage (S3) + Vercel ne fonctionnait pas à cause de:
1. **Politiques RLS manquantes** sur le bucket Supabase Storage
2. **Variables d'environnement Vercel avec des caractères de nouvelle ligne** (`\n`)
3. **Configuration S3 incomplète** dans le plugin Payload

## Solution appliquée

### 1. Politiques RLS Supabase Storage

Les politiques suivantes ont été créées sur le bucket `media`:

```sql
-- Lecture publique pour tous
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Upload pour utilisateurs authentifiés
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Mise à jour pour utilisateurs authentifiés
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Suppression pour utilisateurs authentifiés
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Accès complet pour service_role (API S3)
CREATE POLICY "Service role can do everything"
ON storage.objects
FOR ALL
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');
```

### 2. Configuration du plugin S3 Storage

Fichier: `src/payload/plugins/s3Storage.ts`

```typescript
import { s3Storage } from '@payloadcms/storage-s3';

const supabaseS3StoragePlugin = s3Storage({
  clientUploads: true, // ✅ Important pour l'upload depuis l'admin UI
  collections: {
    media: {
      prefix: 'media',
    },
  },
  bucket: process.env.S3_BUCKET || 'media',
  config: {
    forcePathStyle: true, // ✅ Obligatoire pour Supabase
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || 'eu-central-1',
    endpoint: process.env.S3_ENDPOINT || '',
  },
});

export default supabaseS3StoragePlugin;
```

### 3. Variables d'environnement Vercel

Les variables suivantes doivent être configurées sur Vercel (Production, Preview, Development):

```bash
S3_BUCKET=media
S3_REGION=eu-central-1
S3_ENDPOINT=https://zbywcmcsktsjyithyvre.supabase.co/storage/v1/s3
S3_ACCESS_KEY_ID=<votre_access_key_id>
S3_SECRET_ACCESS_KEY=<votre_secret_access_key>
```

**Important**: Les variables doivent être ajoutées **sans caractères de nouvelle ligne**. Si vous utilisez `vercel env add`, utilisez:

```bash
echo "media" | vercel env add S3_BUCKET production
```

### 4. Obtenir les credentials S3 Supabase

1. Allez sur: https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/settings/storage
2. Scrollez jusqu'à **"S3 Access Keys"**
3. Copiez:
   - `S3_ACCESS_KEY_ID`
   - `S3_SECRET_ACCESS_KEY`

### 5. Configuration Payload

Fichier: `src/payload/payload.config.ts`

```typescript
import supabaseS3StoragePlugin from './plugins/s3Storage';

export default buildConfig({
  // ... autres configs
  plugins: [
    supabaseS3StoragePlugin,
  ],
  // ...
});
```

### 6. Collection Media

Fichier: `src/payload/collections/Media.ts`

```typescript
const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  access: {
    read: () => true, // Public read
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  upload: true, // ✅ Active l'upload
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true }
  ]
};
```

## Test de la configuration

### 1. Test en local

```bash
npm run dev
```

Ouvrez http://localhost:3000/admin et essayez d'uploader une image dans la collection **Media**.

### 2. Test en production

1. Déployez sur Vercel: `git push origin main`
2. Attendez le déploiement (~2 min)
3. Ouvrez https://atlasdream.vercel.app/admin
4. Connectez-vous et testez l'upload d'image

### 3. Vérifier les images uploadées

Les images sont accessibles publiquement via:
```
https://zbywcmcsktsjyithyvre.supabase.co/storage/v1/object/public/media/media/<filename>
```

Ou via l'interface Supabase:
https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/storage/buckets/media

## Troubleshooting

### Erreur "Access denied"
- Vérifiez que les politiques RLS sont bien créées
- Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est définie

### Upload ne fonctionne pas
- Vérifiez `clientUploads: true` dans le plugin S3
- Vérifiez les variables d'environnement Vercel
- Consultez les logs Vercel: https://vercel.com/ai-ads/atlas_dream/logs

### Images ne s'affichent pas
- Vérifiez que le bucket est **public**
- Vérifiez la politique "Public Access" RLS
- Testez l'URL directe de l'image

## Liens utiles

- **Supabase Storage Dashboard**: https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/storage/buckets
- **Vercel Deployments**: https://vercel.com/ai-ads/atlas_dream
- **Payload Admin**: https://atlasdream.vercel.app/admin
- **Payload S3 Storage Docs**: https://payloadcms.com/docs/upload/overview#s3-storage

## Commit associé

Commit: `6b70114` - fix: Configure Supabase S3 storage with proper RLS policies
