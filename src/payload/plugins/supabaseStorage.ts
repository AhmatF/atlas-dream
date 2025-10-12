import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { s3Storage } from '@payloadcms/plugin-cloud-storage/s3';
import { S3Client } from '@aws-sdk/client-s3';

// Supabase Storage uses S3-compatible API
const s3Client = new S3Client({
  forcePathStyle: true,
  region: 'us-east-1', // Supabase uses a single region for the S3 API
  endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/s3`,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    secretAccessKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  },
});

export const supabaseStoragePlugin = cloudStorage({
  collections: {
    media: {
      adapter: s3Storage({
        bucket: 'media',
        config: s3Client,
      }),
    },
  },
});

