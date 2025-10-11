
import type { CollectionConfig } from 'payload';


const slugify = (val: string) => (val || 'item')
  .toString()
  .normalize('NFKD')
  .replace(/[\u0300-\u036F]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');


const ConciergeAlaCarte: CollectionConfig = {
  slug: 'concierge-a-la-carte',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'category', type: 'text', localized: true, required: true },
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'detail', type: 'richText', localized: true },
    { name: 'priceFromNote', type: 'text', localized: true },
    { name: 'images', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] },
    { name: 'slug', type: 'text', unique: true, admin: { position: 'sidebar' } }
  ],
  hooks: {
    beforeValidate: [({ data }) => {
      if (!data.slug && data.name) data.slug = slugify(data.name);
      return data;
    }]
  }
};

export default ConciergeAlaCarte;
