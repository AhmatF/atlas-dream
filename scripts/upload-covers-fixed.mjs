import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FormData, File } from 'formdata-node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://localhost:3000/api';

const articleImages = [
  {
    articleId: 1,
    imagePath: 'public/images/afcon-luxury-car.jpg',
    altText: 'Luxury chauffeur service driving to AFCON 2025 match in Marrakech'
  },
  {
    articleId: 2,
    imagePath: 'public/images/afcon-villa-screening.jpg',
    altText: 'Private villa screening room for watching AFCON 2025 matches'
  },
  {
    articleId: 3,
    imagePath: 'public/images/afcon-riad-dining.jpg',
    altText: 'Private riad dinner between AFCON 2025 matches in Marrakech'
  }
];

async function uploadImage(imagePath, altText) {
  try {
    const fullPath = path.join(__dirname, '..', imagePath);

    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Image not found: ${imagePath}`);
      return null;
    }

    // Read file as buffer
    const imageBuffer = fs.readFileSync(fullPath);
    const fileName = path.basename(imagePath);
    const mimeType = 'image/png';

    // Create FormData with File object
    const formData = new FormData();
    const file = new File([imageBuffer], fileName, { type: mimeType });
    formData.append('file', file);

    // Use _payload field for additional collection data (Payload CMS 3 requirement)
    const payloadData = {
      alt: altText  // Just send as string, not localized object
    };
    formData.append('_payload', JSON.stringify(payloadData));

    // Upload to Payload with locale parameter (DO NOT set Content-Type header!)
    const response = await fetch(`${API_URL}/media?locale=en`, {
      method: 'POST',
      body: formData,
      // credentials: 'include', // Not needed in dev mode with open access
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Upload failed (${response.status}): ${errorText}`);
      return null;
    }

    const result = await response.json();
    const mediaId = result.doc?.id || result.id;

    console.log(`✅ Uploaded: ${fileName} (ID: ${mediaId})`);
    return mediaId;

  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error.message);
    return null;
  }
}

async function updateArticleCover(articleId, mediaId) {
  try {
    const response = await fetch(`${API_URL}/blog-posts/${articleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cover: mediaId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to update article ${articleId}: ${errorText}`);
      return false;
    }

    console.log(`✅ Article ${articleId} updated with cover image\n`);
    return true;

  } catch (error) {
    console.error(`❌ Error updating article ${articleId}:`, error.message);
    return false;
  }
}

async function addBlogCovers() {
  console.log('🖼️  Adding cover images to AFCON blog articles...\n');

  for (const item of articleImages) {
    console.log(`📸 Processing article ${item.articleId}...`);

    // Upload image
    const mediaId = await uploadImage(item.imagePath, item.altText);

    if (mediaId) {
      // Update article with cover
      await updateArticleCover(item.articleId, mediaId);
    } else {
      console.log(`⚠️  Skipping article ${item.articleId} update\n`);
    }

    // Wait between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('✅ All cover images processed!');
  console.log('\n🌐 View updated articles:');
  console.log('   EN: http://localhost:3000/en/blog');
  console.log('   FR: http://localhost:3000/fr/blog\n');
}

addBlogCovers();
