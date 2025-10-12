
import type { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  access: {
    read: () => true, // Allow public read access to all media
    create: ({ req: { user } }) => !!user, // Only authenticated users can create
    update: ({ req: { user } }) => !!user, // Only authenticated users can update
    delete: ({ req: { user } }) => !!user, // Only authenticated users can delete
  },
  upload: {
    // staticDir removed - using Supabase Storage via plugin
    mimeTypes: ['image/*']
  },
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true }
  ]
};

export default Media;
