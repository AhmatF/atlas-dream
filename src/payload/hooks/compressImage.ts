import sharp from 'sharp';
import type { BeforeChangeHook } from 'payload';

/**
 * Compress images automatically on upload
 * - General images: target < 200KB
 * - Hero images (> 1500px width): target < 350KB
 * - Maintains aspect ratio
 * - Converts to WebP for better compression
 */
export const compressImage: BeforeChangeHook = async ({ data, req, operation }) => {
  // Only compress on create or when a new file is uploaded
  if (operation !== 'create' && operation !== 'update') {
    return data;
  }

  // Check if there's a file to process
  if (!req.file || !req.file.data) {
    return data;
  }

  try {
    const fileBuffer = req.file.data;
    const image = sharp(fileBuffer);
    const metadata = await image.metadata();

    // Skip if not an image
    if (!metadata.width || !metadata.height) {
      return data;
    }

    // Determine target size based on image dimensions
    const isHeroImage = metadata.width > 1500;
    const targetMaxBytes = isHeroImage ? 350 * 1024 : 200 * 1024; // 350KB or 200KB
    const maxWidth = isHeroImage ? 1920 : 1200;

    // Start with quality 85
    let quality = 85;
    let compressedBuffer: Buffer;
    let outputSize: number;

    // Iteratively reduce quality until we hit target size
    do {
      compressedBuffer = await image
        .resize(maxWidth, null, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality, effort: 6 })
        .toBuffer();

      outputSize = compressedBuffer.length;

      // If still too large, reduce quality
      if (outputSize > targetMaxBytes && quality > 60) {
        quality -= 5;
      } else {
        break;
      }
    } while (quality >= 60);

    // If WebP is still too large, try JPEG
    if (outputSize > targetMaxBytes) {
      quality = 80;
      do {
        compressedBuffer = await image
          .resize(maxWidth, null, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .jpeg({ quality, mozjpeg: true })
          .toBuffer();

        outputSize = compressedBuffer.length;

        if (outputSize > targetMaxBytes && quality > 60) {
          quality -= 5;
        } else {
          break;
        }
      } while (quality >= 60);
    }

    // Update the file data with compressed version
    req.file.data = compressedBuffer;
    req.file.size = compressedBuffer.length;

    // Update mimetype to reflect compression
    const isWebP = compressedBuffer[0] === 0x52 && compressedBuffer[1] === 0x49;
    req.file.mimetype = isWebP ? 'image/webp' : 'image/jpeg';

    // Update filename extension
    const originalName = req.file.name || 'image';
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    req.file.name = `${nameWithoutExt}.${isWebP ? 'webp' : 'jpg'}`;

    console.log(`✓ Image compressed: ${metadata.width}x${metadata.height} → ${Math.round(outputSize / 1024)}KB (quality: ${quality})`);

    return data;
  } catch (error) {
    console.error('Error compressing image:', error);
    // Don't fail the upload if compression fails
    return data;
  }
};
