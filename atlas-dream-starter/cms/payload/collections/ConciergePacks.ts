
import type { CollectionConfig } from 'payload';


const slugify = (val: string) => (val || 'item')
  .toString()
  .normalize('NFKD')
  .replace(/[\u0300-\u036F]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');


const ConciergePacks: CollectionConfig = {
  slug: 'concierge-packs',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'tier', type: 'select', required: true, options: [
      { label: 'Essential', value: 'essential' },
      { label: 'Signature', value: 'signature' },
      { label: 'Prestige', value: 'prestige' }
    ]},
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'whatsIncluded', type: 'array', fields: [{ name: 'item', type: 'text', localized: true }] },
    { name: 'description', type: 'richText', localized: true },
    { name: 'priceFromNote', type: 'text', localized: true },
    { name: 'images', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media' }] },
    { name: 'slug', type: 'text', unique: true, admin: { position: 'sidebar' } }
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

export default ConciergePacks;
