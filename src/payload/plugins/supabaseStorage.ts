import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { supabaseAdapter } from '@payloadcms/plugin-cloud-storage/supabase';

export const supabaseStoragePlugin = cloudStorage({
  collections: {
    media: {
      adapter: supabaseAdapter({
        bucket: 'media',
        config: {
          endpoint: process.env.NEXT_PUBLIC_SUPABASE_URL!,
          accessKeyId: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          secretAccessKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        },
      }),
    },
  },
});

