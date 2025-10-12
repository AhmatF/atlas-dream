# Résolution du problème d'images 502

## Problème

Les images retournent des erreurs 502 car Payload CMS est configuré pour stocker les fichiers localement (`staticDir: 'media'`), mais **Vercel Functions n'ont pas de système de fichiers persistant**.

## Solution : Utiliser Supabase Storage

Nous devons configurer Payload CMS pour utiliser **Supabase Storage** au lieu du stockage local.

### Étape 1 : Installer le plugin Supabase Storage pour Payload

```bash
npm install @payloadcms/plugin-cloud-storage @supabase/supabase-js
```

### Étape 2 : Obtenir les credentials Supabase Storage

1. Allez sur votre projet Supabase : https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre
2. Naviguez vers **Storage**
3. Créez un nouveau bucket nommé `media` (ou utilisez un existant)
4. **Configurez le bucket en public** :
   - Cliquez sur le bucket
   - Configuration > Make public
5. Obtenez l'URL du bucket :
   ```
   https://zbywcmcsktsjyithyvre.supabase.co/storage/v1/object/public/media
   ```

### Étape 3 : Ajouter les variables d'environnement sur Vercel

Ajoutez ces variables dans Vercel (Settings > Environment Variables):

```bash
# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL=https://zbywcmcsktsjyithyvre.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<votre_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<votre_service_role_key>
```

Pour obtenir les clés :
1. Settings > API
2. **anon public** : Copiez la clé `anon`
3. **service_role** : Copiez la clé `service_role` (gardez-la secrète !)

### Étape 4 : Configurer Payload avec Supabase Storage

Créez un nouveau fichier `src/payload/plugins/supabaseStorage.ts` :

```typescript
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { supabaseAdapter } from '@payloadcms/plugin-cloud-storage/supabase';

export const supabaseStoragePlugin = cloudStorage({
  collections: {
    media: {
      adapter: supabaseAdapter({
        bucket: 'media',
        config: {
          endpoint: process.env.NEXT_PUBLIC_SUPABASE_URL!,
          accessKeyId: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          secretAccessKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        },
      }),
    },
  },
});
```

### Étape 5 : Mettre à jour payload.config.ts

```typescript
import { supabaseStoragePlugin } from './plugins/supabaseStorage';

export default buildConfig({
  // ... autres configurations
  
  plugins: [
    supabaseStoragePlugin,
  ],
  
  // ... reste de la config
});
```

### Étape 6 : Mettre à jour la collection Media

Dans `src/payload/collections/Media.ts`, retirez `staticDir` :

```typescript
const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  upload: {
    // Retirez staticDir, le plugin cloud-storage s'en occupe
    mimeTypes: ['image/*']
  },
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true }
  ]
};
```

### Étape 7 : Migrer les images existantes (si vous en avez)

Si vous avez déjà des images dans le dossier `media/`, vous devez les migrer vers Supabase Storage :

1. **Upload manuel via l'interface Supabase** :
   - Allez dans Storage > media bucket
   - Upload tous les fichiers du dossier `media/`

2. **Ou utilisez le script de migration** :

```typescript
// migrate-images-to-supabase.ts
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function migrateImages() {
  const mediaDir = path.join(process.cwd(), 'media');
  const files = fs.readdirSync(mediaDir);

  for (const file of files) {
    const filePath = path.join(mediaDir, file);
    const fileBuffer = fs.readFileSync(filePath);

    const { error } = await supabase.storage
      .from('media')
      .upload(file, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.error(`Error uploading ${file}:`, error);
    } else {
      console.log(`✅ Uploaded ${file}`);
    }
  }
}

migrateImages();
```

### Étape 8 : Mettre à jour next.config.js

Ajoutez le domaine Supabase Storage aux remote patterns :

```javascript
{
  protocol: 'https',
  hostname: 'zbywcmcsktsjyithyvre.supabase.co',
  pathname: '/storage/v1/object/public/**',
},
```

### Étape 9 : Redéployer

```bash
git add .
git commit -m "feat: configure Supabase Storage for media files"
git push
```

## Alternative plus simple : Vercel Blob

Si Supabase Storage est trop complexe, vous pouvez utiliser **Vercel Blob** :

```bash
npm install @vercel/blob @payloadcms/plugin-cloud-storage
```

Documentation : https://vercel.com/docs/storage/vercel-blob

## Vérification

Une fois configuré, les images devraient se charger depuis Supabase Storage au lieu du système de fichiers local.

Testez en uploadant une nouvelle image dans Payload Admin et vérifiez qu'elle s'affiche correctement sur le site.

## Ressources

- [Payload Cloud Storage Plugin](https://payloadcms.com/docs/plugins/cloud-storage)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)

