import path from 'path';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import Users from './collections/Users';
import Media from './collections/Media';
import Cars from './collections/Cars';
import Villas from './collections/Villas';
import ConciergePacks from './collections/ConciergePacks';
import ConciergeAlaCarte from './collections/ConciergeAlaCarte';
import BlogPosts from './collections/BlogPosts';
import Pages from './collections/Pages';
import Leads from './collections/Leads';
import { supabaseS3StoragePlugin } from './plugins/s3Storage';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  serverURL:
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),

  // Database adapter for Supabase (PostgreSQL)
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
    push: false,
  }),

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Atlas Dream Admin'
    },
    importMap: {
      baseDir: path.resolve(__dirname, '../')
    }
  },
  editor: lexicalEditor({}),
  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    fallback: true
  },
  plugins: [
    supabaseS3StoragePlugin,
  ],
  collections: [Users, Media, Cars, Villas, ConciergePacks, ConciergeAlaCarte, BlogPosts, Pages, Leads],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql')
  }
});
