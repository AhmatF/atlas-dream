import { s3Storage } from '@payloadcms/storage-s3';

// S3-compatible storage plugin for Supabase
// Enable clientUploads so the Payload admin can use the S3 upload handler
// without falling back to the default local upload UI.
const supabaseS3StoragePlugin = s3Storage({
  clientUploads: true,
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
    region: process.env.S3_REGION || 'eu-central-1',
    endpoint: process.env.S3_ENDPOINT || '',
  },
});

export default supabaseS3StoragePlugin;

