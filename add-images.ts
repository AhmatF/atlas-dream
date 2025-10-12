import 'dotenv/config';
import { getPayload } from 'payload';
import config from './src/payload/payload.config';
import https from 'https';
import fs from 'fs';
import path from 'path';

// High-quality free stock images URLs (Unsplash)
const carImages = {
  'mercedes-benz-s-class': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop',
  'range-rover-vogue': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=800&fit=crop',
  'bmw-7-series': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop',
  'mercedes-benz-g-class-amg': 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1200&h=800&fit=crop',
  'audi-q7': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&h=800&fit=crop',
  'porsche-cayenne': 'https://images.unsplash.com/photo-1611821064430-f1a4f4e85e12?w=1200&h=800&fit=crop',
  'range-rover-sport': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&h=800&fit=crop',
  'bmw-x7': 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=1200&h=800&fit=crop',
  'mercedes-benz-e-class': 'https://images.unsplash.com/photo-1617654112329-533615ba5b97?w=1200&h=800&fit=crop',
  'audi-a8': 'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=1200&h=800&fit=crop',
};

const villaImages = {
  'villa-oasis-palmeraie': 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=1200&h=800&fit=crop',
  'riad-luxury-hivernage': 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1200&h=800&fit=crop',
  'villa-serenity-agdal': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
  'villa-majorelle-gueliz': 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=800&fit=crop',
  'villa-atlas-view': 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&h=800&fit=crop',
  'villa-golf-amelkis': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop',
  'villa-prestige-al-maaden': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
  'riad-authentique-medina': 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=1200&h=800&fit=crop',
  'villa-paradise-palmeraie': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
  'villa-moderne-hivernage': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
};

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        if (response.headers.location) {
          https.get(response.headers.location, (redirectResponse) => {
            const fileStream = fs.createWriteStream(filepath);
            redirectResponse.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              resolve();
            });
          }).on('error', reject);
        }
      } else {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      }
    }).on('error', reject);
  });
}

async function addImages() {
  console.log('🔌 Connecting to database...');
  const payload = await getPayload({ config });

  console.log('🖼️  Starting image upload process...');

  // Create temp directory for downloads
  const tempDir = path.join(process.cwd(), 'temp-images');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Add images to cars
  console.log('\n🚗 Adding images to cars...');

  for (const [slug, imageUrl] of Object.entries(carImages)) {
    try {
      // Find the car
      const carsResult = await payload.find({
        collection: 'cars',
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      });

      if (carsResult.docs.length === 0) {
        console.log(`   ⚠️  Car not found: ${slug}`);
        continue;
      }

      const car = carsResult.docs[0];

      // Download image
      const imagePath = path.join(tempDir, `${slug}.jpg`);
      console.log(`   📥 Downloading image for ${car.name}...`);
      await downloadImage(imageUrl, imagePath);

      // Upload to Payload
      const fileBuffer = fs.readFileSync(imagePath);
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: car.name,
        },
        file: {
          data: fileBuffer,
          mimetype: 'image/jpeg',
          name: `${slug}.jpg`,
          size: fileBuffer.length,
        },
      });

      console.log(`   ✅ Uploaded image for ${car.name}`);

      // Update car with image
      await payload.update({
        collection: 'cars',
        id: car.id,
        data: {
          images: [
            {
              image: media.id,
            },
          ],
        },
      });

      console.log(`   ✅ Updated car ${car.name} with image`);

      // Clean up temp file
      fs.unlinkSync(imagePath);
    } catch (error: any) {
      console.error(`   ❌ Error adding image for ${slug}:`, error.message);
    }
  }

  // Add images to villas
  console.log('\n🏠 Adding images to villas...');

  for (const [slug, imageUrl] of Object.entries(villaImages)) {
    try {
      // Find the villa
      const villasResult = await payload.find({
        collection: 'villas',
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      });

      if (villasResult.docs.length === 0) {
        console.log(`   ⚠️  Villa not found: ${slug}`);
        continue;
      }

      const villa = villasResult.docs[0];

      // Download image
      const imagePath = path.join(tempDir, `${slug}.jpg`);
      console.log(`   📥 Downloading image for ${villa.name}...`);
      await downloadImage(imageUrl, imagePath);

      // Upload to Payload
      const fileBuffer = fs.readFileSync(imagePath);
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: villa.name,
        },
        file: {
          data: fileBuffer,
          mimetype: 'image/jpeg',
          name: `${slug}.jpg`,
          size: fileBuffer.length,
        },
      });

      console.log(`   ✅ Uploaded image for ${villa.name}`);

      // Update villa with image
      await payload.update({
        collection: 'villas',
        id: villa.id,
        data: {
          images: [
            {
              image: media.id,
            },
          ],
        },
      });

      console.log(`   ✅ Updated villa ${villa.name} with image`);

      // Clean up temp file
      fs.unlinkSync(imagePath);
    } catch (error: any) {
      console.error(`   ❌ Error adding image for ${slug}:`, error.message);
    }
  }

  // Clean up temp directory
  if (fs.existsSync(tempDir)) {
    fs.rmdirSync(tempDir);
  }

  console.log('\n✨ Image upload completed!');
  process.exit(0);
}

addImages().catch((error) => {
  console.error('❌ Image upload failed:', error);
  process.exit(1);
});
