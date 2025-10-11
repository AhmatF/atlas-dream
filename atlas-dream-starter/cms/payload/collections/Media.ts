
import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  upload: {
    staticDir: 'media',
    staticURL: '/media',
    mimeTypes: ['image/*']
  },
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true }
  ]
};

export default Media;
