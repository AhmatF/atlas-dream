
import type { CollectionConfig } from 'payload';


const slugify = (val: string) => (val || 'item')
  .toString()
  .normalize('NFKD')
  .replace(/[\u0300-\u036F]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');


const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', unique: true, admin: { position: 'sidebar' } },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true, required: true },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'seo', type: 'group', fields: [
      { name: 'title', type: 'text', localized: true },
      { name: 'description', type: 'textarea', localized: true }
    ]}
  ],
  hooks: {
    beforeValidate: [({ data }) => {
      if (!data.slug && data.title) data.slug = slugify(data.title);
      return data;
    }]
  }
};

export default BlogPosts;
