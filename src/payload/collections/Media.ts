
import type { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'Images are automatically compressed to < 200KB before upload. Compression happens in your browser before sending to the server.',
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
