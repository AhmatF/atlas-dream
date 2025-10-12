import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Credentials Supabase
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zbywcmcsktsjyithyvre.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required');
  console.log('   Set it with: export SUPABASE_SERVICE_ROLE_KEY="your_key"');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function migrateImages() {
  console.log('🚀 Migration des images vers Supabase Storage');
  console.log('================================================');
  console.log('');

  const mediaDir = path.join(__dirname, 'media');
  
  // Vérifier que le dossier existe
  if (!fs.existsSync(mediaDir)) {
    console.error('❌ Le dossier media/ n\'existe pas');
    process.exit(1);
  }

  const files = fs.readdirSync(mediaDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  
  console.log(`📦 ${files.length} images trouvées`);
  console.log('');

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const filePath = path.join(mediaDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      
      // Déterminer le type MIME
      const mimeType = file.endsWith('.png') ? 'image/png' : 'image/jpeg';
      
      // Upload vers Supabase Storage
      console.log(`📤 Uploading ${file}...`);
      
      const { data, error } = await supabase.storage
        .from('media')
        .upload(`media/${file}`, fileBuffer, {
          contentType: mimeType,
          upsert: true, // Remplace si existe déjà
        });

      if (error) {
        console.error(`   ❌ Erreur: ${error.message}`);
        errorCount++;
      } else {
        // Obtenir l'URL publique
        const { data: publicUrlData } = supabase.storage
          .from('media')
          .getPublicUrl(`media/${file}`);
        
        console.log(`   ✅ Uploadé: ${publicUrlData.publicUrl}`);
        successCount++;
      }
    } catch (error: any) {
      console.error(`   ❌ Erreur avec ${file}:`, error.message);
      errorCount++;
    }
  }

  console.log('');
  console.log('📊 Résumé de la migration');
  console.log('========================');
  console.log(`✅ Réussis: ${successCount}`);
  console.log(`❌ Échecs: ${errorCount}`);
  console.log(`📦 Total: ${files.length}`);
  console.log('');
  
  if (successCount > 0) {
    console.log('🎉 Migration terminée avec succès!');
    console.log('');
    console.log('📝 Prochaines étapes:');
    console.log('   1. Vérifiez dans Supabase: https://supabase.com/dashboard/project/zbywcmcsktsjyithyvre/storage/buckets/media');
    console.log('   2. Les images sont maintenant dans le dossier "media/"');
    console.log('   3. Vous pouvez maintenant les lier aux voitures/villas via Payload Admin');
  }
}

// Exécuter la migration
migrateImages().catch((error) => {
  console.error('❌ Erreur lors de la migration:', error);
  process.exit(1);
});

