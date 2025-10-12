import { s3Storage } from '@payloadcms/storage-s3';

// S3-compatible storage plugin for Supabase
// Enable clientUploads so the Payload admin can use the S3 upload handler
// without falling back to the default local upload UI.
const supabaseS3StoragePlugin = s3Storage({
  enabled: true,
  collections: {
    media: {
      prefix: 'media',
      disableLocalStorage: true,
      generateFileURL: ({ filename, prefix }) => {
        // Clean environment variables of any trailing newlines or whitespace
        const projectRef = (process.env.S3_ENDPOINT?.match(/https:\/\/([^.]+)/)?.[1] || 'zbywcmcsktsjyithyvre').trim();
        const bucket = (process.env.S3_BUCKET || 'media').trim();
        const actualPrefix = (prefix || 'media').trim();
        const cleanFilename = filename.trim();
        return `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${actualPrefix}/${cleanFilename}`;
      },
    },
  },
  bucket: process.env.S3_BUCKET || 'media',
  config: {
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || 'eu-central-1',
    endpoint: process.env.S3_ENDPOINT || '',
  },
});

export default supabaseS3StoragePlugin;

