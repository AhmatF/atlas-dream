/**
 * Environment utilities for handling URLs across environments
 * Automatically switches between localhost and production URLs
 */

/**
 * Get the public server URL
 * In production, uses VERCEL_URL or custom domain
 * In development, uses localhost
 */
export function getServerUrl(): string {
  // If explicitly set, use that
  if (process.env.PAYLOAD_PUBLIC_SERVER_URL) {
    return process.env.PAYLOAD_PUBLIC_SERVER_URL;
  }

  // Vercel automatically provides VERCEL_URL in production
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback to localhost for development
  return 'http://localhost:3000';
}

/**
 * Get the public-facing URL for Next.js
 * This is used for client-side operations
 */
export function getPublicUrl(): string {
  // If explicitly set, use that
  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL;
  }

  // Vercel automatically provides VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // In browser, use window.location.origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // Fallback to localhost for development
  return 'http://localhost:3000';
}

/**
 * Check if we're in production environment
 */
export function isProduction(): boolean {
  return process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
}

/**
 * Check if we're in development environment
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Get environment-specific configuration
 */
export const env = {
  serverUrl: getServerUrl(),
  publicUrl: getPublicUrl(),
  isProduction: isProduction(),
  isDevelopment: isDevelopment(),
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212774885461',
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+212774885461',
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-calendly-link',
} as const;
