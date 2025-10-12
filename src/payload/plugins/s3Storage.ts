import { s3Storage } from '@payloadcms/storage-s3';

// S3-compatible storage plugin for Supabase
export const supabaseS3StoragePlugin = s3Storage({
  collections: {
    media: {
      prefix: 'media',
    },
  },
  bucket: process.env.S3_BUCKET || 'media',
  config: {
    forcePathStyle: true, // Important for using Supabase
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || 'us-east-1',
    endpoint: process.env.S3_ENDPOINT || '',
  },
});

