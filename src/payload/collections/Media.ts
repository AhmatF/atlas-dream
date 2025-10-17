
import type { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'Upload images. Note: Images larger than 4MB may fail due to Vercel limits. Please compress large images before upload.',
  },
  access: {
    read: () => true, // Allow public read access to all media
    create: ({ req: { user } }) => !!user, // Only authenticated users can create
    update: ({ req: { user } }) => !!user, // Only authenticated users can update
    delete: ({ req: { user } }) => !!user, // Only authenticated users can delete
  },
  upload: true,
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true }
  ]
};

export default Media;
