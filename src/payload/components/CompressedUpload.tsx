'use client'

import { useField } from '@payloadcms/ui'
import imageCompression from 'browser-image-compression'
import { useCallback } from 'react'

export const CompressedUpload = () => {
  const { value, setValue } = useField<File>({ path: 'file' })

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Only compress images
      if (!file.type.startsWith('image/')) {
        setValue(file)
        return
      }

      try {
        console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`)

        const options = {
          maxSizeMB: 0.2, // 200KB target
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/webp',
        }

        const compressedFile = await imageCompression(file, options)
        console.log(
          `Compressed file size: ${(compressedFile.size / 1024).toFixed(2)} KB`
        )

        setValue(compressedFile as any)
      } catch (error) {
        console.error('Compression error:', error)
        // Fallback to original file
        setValue(file)
      }
    },
    [setValue]
  )

  return (
    <div className="field-type upload">
      <label className="field-label">
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginTop: '8px',
          }}
        />
      </label>
      <p className="field-description" style={{ fontSize: '13px', marginTop: '8px', color: '#666' }}>
        Images will be automatically compressed to &lt; 200KB before upload
      </p>
    </div>
  )
}
