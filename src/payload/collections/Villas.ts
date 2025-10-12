
import type { CollectionConfig } from 'payload';


const slugify = (val: string) => (val || 'item')
  .toString()
  .normalize('NFKD')
  .replace(/[\u0300-\u036F]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');


const Villas: CollectionConfig = {
  slug: 'villas',
  admin: { useAsTitle: 'name' },
  access: {
    read: () => true, // Allow public read access
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'district', type: 'select', options: [
      'Palmeraie','Hivernage','Agdal','Guéliz','Route de l’Ourika','Amelkis','Al Maaden','Médina'
    ], required: true },
    { name: 'bedrooms', type: 'number', required: true },
    { name: 'bathrooms', type: 'number' },
    { name: 'guests', type: 'number' },
    { name: 'pricePerNightNote', label: 'Price/night (note)', type: 'text', localized: true },
    { name: 'minNights', type: 'number', defaultValue: 3 },
    { name: 'highlights', type: 'array', fields: [{ name: 'text', type: 'text', localized: true }] },
    { name: 'amenities', type: 'array', fields: [{ name: 'text', type: 'text', localized: true }] },
    { name: 'images', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }] },
    { name: 'mapCoords', type: 'point' },
    { name: 'conciergeIncluded', type: 'checkbox', defaultValue: true },
    { name: 'policies', type: 'richText', localized: true },
    { name: 'slug', type: 'text', unique: true, admin: { position: 'sidebar' } },
    { name: 'published', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } }
  ],
  hooks: {
    beforeValidate: [({ data }) => {
      if (data && !data.slug && data.name) {
        data.slug = slugify(data.name);
      }
      return data;
    }]
  }
};

export default Villas;
