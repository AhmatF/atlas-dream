
import type { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*']
  },
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true }
  ]
};

export default Media;
