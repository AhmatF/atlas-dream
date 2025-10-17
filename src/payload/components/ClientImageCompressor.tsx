'use client'

import { useEffect } from 'react'
import imageCompression from 'browser-image-compression'

/**
 * Global Image Compressor Component
 *
 * This component automatically compresses any image uploaded through Payload CMS
 * by intercepting file input changes at the document level.
 *
 * It runs client-side in the browser before the image is sent to the server.
 */
export function ClientImageCompressor() {
  useEffect(() => {
    let statusDiv: HTMLDivElement | null = null

    const showStatus = (message: string, isCompressing: boolean = false) => {
      // Remove existing status
      if (statusDiv) {
        statusDiv.remove()
      }

      // Create new status div
      statusDiv = document.createElement('div')
      statusDiv.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 16px 20px;
        background: ${isCompressing ? '#f0f9ff' : message.startsWith('✓') ? '#f0fdf4' : '#fef9f3'};
        border: 1px solid ${isCompressing ? '#bfdbfe' : message.startsWith('✓') ? '#bbf7d0' : '#fed7aa'};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-size: 14px;
        color: #1f2937;
        z-index: 999999;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideIn 0.3s ease-out;
      `

      if (isCompressing) {
        statusDiv.innerHTML = `
          <svg style="animation: spin 1s linear infinite;" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#3b82f6" stroke-width="4" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
          </svg>
          <span>${message}</span>
        `
      } else {
        statusDiv.innerHTML = `<span>${message}</span>`
      }

      document.body.appendChild(statusDiv)

      // Auto-remove after 5 seconds if not compressing
      if (!isCompressing) {
        setTimeout(() => {
          if (statusDiv) {
            statusDiv.style.animation = 'slideOut 0.3s ease-out'
            setTimeout(() => statusDiv?.remove(), 300)
          }
        }, 5000)
      }
    }

    const compressImage = async (file: File): Promise<File> => {
      const originalSizeMB = (file.size / 1024 / 1024).toFixed(2)
      showStatus(`Compressing ${file.name} (${originalSizeMB}MB)...`, true)

      try {
        const options = {
          maxSizeMB: 0.19, // Target 195KB to leave margin
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/webp',
          initialQuality: 0.85,
        }

        console.log(`[Atlas Dream Compressor] Original: ${file.name} - ${originalSizeMB}MB`)

        const compressedBlob = await imageCompression(file, options)
        const compressedSizeKB = (compressedBlob.size / 1024).toFixed(2)

        console.log(`[Atlas Dream Compressor] Compressed: ${compressedSizeKB}KB`)

        // Create new File with .webp extension
        const newFileName = file.name.replace(/\.\w+$/, '.webp')
        const compressedFile = new File([compressedBlob], newFileName, {
          type: 'image/webp',
          lastModified: Date.now(),
        })

        showStatus(`✓ Compressed from ${originalSizeMB}MB to ${compressedSizeKB}KB`)

        return compressedFile
      } catch (error) {
        console.error('[Atlas Dream Compressor] Error:', error)
        showStatus(`⚠ Compression failed, uploading original file`)
        return file
      }
    }

    const handleFileInput = async (event: Event) => {
      const input = event.target as HTMLInputElement
      const file = input.files?.[0]

      if (!file) {
        return
      }

      // Only process image files
      if (!file.type.startsWith('image/')) {
        console.log('[Atlas Dream Compressor] Skipping non-image file:', file.type)
        return
      }

      // Check if this file was already processed (to avoid infinite loops)
      if ((file as any).__compressed) {
        console.log('[Atlas Dream Compressor] File already compressed, allowing Payload to process it')
        return
      }

      console.log('[Atlas Dream Compressor] Intercepting file upload:', file.name, file.size)

      // CRITICAL: Stop this event completely to prevent Payload from processing the original file
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()

      try {
        // Compress the image
        const compressedFile = await compressImage(file)

        // Mark the compressed file to avoid re-processing
        ;(compressedFile as any).__compressed = true

        // Replace the file in the input
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(compressedFile)
        input.files = dataTransfer.files

        console.log('[Atlas Dream Compressor] File replaced in input, triggering new change event')

        // Dispatch a completely new trusted event that Payload will process
        const newEvent = new Event('change', { bubbles: true, cancelable: true })
        Object.defineProperty(newEvent, 'target', { value: input, writable: false })
        input.dispatchEvent(newEvent)

        console.log('[Atlas Dream Compressor] New change event dispatched with compressed file')
      } catch (error) {
        console.error('[Atlas Dream Compressor] Error during compression:', error)
        showStatus(`⚠ Compression failed, uploading original file`)

        // If compression fails, dispatch the original event
        const fallbackEvent = new Event('change', { bubbles: true })
        Object.defineProperty(fallbackEvent, 'target', { value: input, writable: false })
        input.dispatchEvent(fallbackEvent)
      }
    }

    // Add global event listener for all file inputs
    document.addEventListener('change', handleFileInput, true)

    // Add CSS animations
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(style)

    // Cleanup
    return () => {
      document.removeEventListener('change', handleFileInput, true)
      style.remove()
      if (statusDiv) {
        statusDiv.remove()
      }
    }
  }, [])

  return null // This component doesn't render anything
}
