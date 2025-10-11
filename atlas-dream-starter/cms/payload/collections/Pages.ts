
import type { CollectionConfig } from 'payload';

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'key', type: 'select', required: true, options: [
      'home','about','contact','cars','villas','concierge','blog'
    ], unique: true },
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'hero', type: 'group', fields: [
      { name: 'headline', type: 'text', localized: true },
      { name: 'subheadline', type: 'textarea', localized: true },
      { name: 'image', type: 'upload', relationTo: 'media' }
    ]},
    { name: 'usps', type: 'array', fields: [{ name: 'text', type: 'text', localized: true }] },
    { name: 'content', type: 'richText', localized: true }
  ]
};

export default Pages;
