import { buildConfig } from 'payload'

// This is just a placeholder - the real config is in src/payload/payload.config.ts
// This file is required at the root for Payload CLI commands
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  collections: []
})
