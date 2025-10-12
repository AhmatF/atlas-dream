
import type { CollectionConfig } from 'payload';


const slugify = (val: string) => (val || 'item')
  .toString()
  .normalize('NFKD')
  .replace(/[\u0300-\u036F]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');


const Cars: CollectionConfig = {
  slug: 'cars',
  admin: { useAsTitle: 'name' },
  access: {
    read: () => true, // Allow public read access
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'brand', type: 'text', required: true },
    { name: 'year', type: 'number' },
    { name: 'images', type: 'array', label: 'Images', fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true }
    ]},
    { name: 'seats', type: 'number' },
    { name: 'transmission', type: 'select', options: ['Automatic','Manual'], defaultValue: 'Automatic' },
    { name: 'color', type: 'text' },
    { name: 'priceDayNote', label: 'Price/day (note)', type: 'text', localized: true },
    { name: 'priceWithDriverNote', label: 'Price with driver (note)', type: 'text', localized: true },
    { name: 'depositNote', type: 'text', localized: true },
    { name: 'included', type: 'array', labels: { singular: 'Item', plural: 'Included' }, fields: [
      { name: 'text', type: 'text', localized: true }
    ]},
    { name: 'options', type: 'array', labels: { singular: 'Option', plural: 'Options' }, fields: [
      { name: 'name', type: 'text', localized: true, required: true },
      { name: 'priceNote', type: 'text', localized: true }
    ]},
    { name: 'airportMeet', type: 'checkbox', defaultValue: true },
    { name: 'availabilityNote', type: 'textarea', localized: true },
    { name: 'districts', type: 'select', hasMany: true, options: [
      'Palmeraie','Hivernage','Agdal','Guéliz','Route de l’Ourika','Amelkis','Al Maaden','Médina','Targa'
    ]},
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

export default Cars;
