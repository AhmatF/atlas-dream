'use client'

import React, { useCallback, useState, useEffect } from 'react'
import imageCompression from 'browser-image-compression'

/**
 * Custom Upload Field Component with Client-Side Compression
 *
 * This component wraps Payload's default Upload field and intercepts file selection
 * to compress images before they're uploaded to the server.
 *
 * Compression targets:
 * - General images: < 200KB
 * - Hero images (>1500px): < 350KB
 * - Max dimension: 1920px
 */
export const CompressedUploadField: React.FC<any> = (props) => {
  const { path } = props
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressionStatus, setCompressionStatus] = useState<string>('')

  // Intercept file input change
  const handleFileInput = useCallback(async (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (!file) return

    // Only compress images
    if (!file.type.startsWith('image/')) {
      setCompressionStatus(`File "${file.name}" is not an image, uploading without compression.`)
      return
    }

    try {
      setIsCompressing(true)
      const originalSizeMB = (file.size / 1024 / 1024).toFixed(2)
      setCompressionStatus(`Compressing ${file.name} (${originalSizeMB}MB)...`)

      // Determine target size based on file name or dimensions
      // We'll be conservative and target 200KB for all images
      const options = {
        maxSizeMB: 0.19, // 195KB to leave margin for Vercel's 4.5MB limit
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp', // WebP for best compression
        initialQuality: 0.85,
      }

      console.log(`[Compression] Original: ${file.name} - ${originalSizeMB}MB`)

      const compressedFile = await imageCompression(file, options)
      const compressedSizeKB = (compressedFile.size / 1024).toFixed(2)

      console.log(`[Compression] Compressed: ${compressedFile.name} - ${compressedSizeKB}KB`)

      // Create a new File object with the compressed data but original name
      const newFile = new File(
        [compressedFile],
        file.name.replace(/\.\w+$/, '.webp'), // Change extension to .webp
        { type: 'image/webp' }
      )

      // Replace the file in the input
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(newFile)
      input.files = dataTransfer.files

      setCompressionStatus(
        `✓ Compressed from ${originalSizeMB}MB to ${compressedSizeKB}KB`
      )

      // Dispatch a new change event so Payload picks up the compressed file
      const changeEvent = new Event('change', { bubbles: true })
      input.dispatchEvent(changeEvent)

      // Clear status after 5 seconds
      setTimeout(() => setCompressionStatus(''), 5000)
    } catch (error) {
      console.error('[Compression] Error:', error)
      setCompressionStatus(
        `⚠ Compression failed, uploading original file. Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
      setTimeout(() => setCompressionStatus(''), 5000)
    } finally {
      setIsCompressing(false)
    }
  }, [])

  // Add event listener to file input when component mounts
  React.useEffect(() => {
    // Find the file input element
    const fileInput = document.querySelector(`input[type="file"][name="${path}"]`) as HTMLInputElement

    if (fileInput) {
      fileInput.addEventListener('change', handleFileInput)

      return () => {
        fileInput.removeEventListener('change', handleFileInput)
      }
    }
  }, [path, handleFileInput])

  return (
    <div>
      {/* Show compression status */}
      {(isCompressing || compressionStatus) && (
        <div
          style={{
            marginTop: '12px',
            padding: '12px',
            borderRadius: '6px',
            backgroundColor: isCompressing ? '#f0f9ff' : compressionStatus.startsWith('✓') ? '#f0fdf4' : '#fef9f3',
            border: `1px solid ${isCompressing ? '#bfdbfe' : compressionStatus.startsWith('✓') ? '#bbf7d0' : '#fed7aa'}`,
            fontSize: '13px',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {isCompressing && (
            <svg
              style={{ animation: 'spin 1s linear infinite' }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="4" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
            </svg>
          )}
          <span>{compressionStatus}</span>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
