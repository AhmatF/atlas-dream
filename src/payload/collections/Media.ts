
import type { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'Images are automatically compressed to < 200KB before upload. Compression happens in your browser before sending to the server.',
  },
  access: {
    read: () => true, // Allow public read access to all media
    create: () => process.env.NODE_ENV === 'development' ? true : false, // Open in dev
    update: () => process.env.NODE_ENV === 'development' ? true : false, // Open in dev
    delete: () => process.env.NODE_ENV === 'development' ? true : false, // Open in dev
  },
  upload: true,
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true }
  ]
};

export default Media;
