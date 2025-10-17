
import type { CollectionConfig } from 'payload';
import { compressImage } from '../hooks/compressImage';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'Images are automatically compressed to < 200KB before upload to meet performance requirements.',
  },
  access: {
    read: () => true, // Allow public read access to all media
    create: ({ req: { user } }) => !!user, // Only authenticated users can create
    update: ({ req: { user } }) => !!user, // Only authenticated users can update
    delete: ({ req: { user } }) => !!user, // Only authenticated users can delete
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  },
  hooks: {
    beforeOperation: [compressImage],
  },
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true }
  ]
};

export default Media;
