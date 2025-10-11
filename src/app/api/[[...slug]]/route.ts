import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import { importConfig } from 'payload/node'

const config = importConfig('../../../atlas-dream-starter/cms/payload/payload.config.ts')

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
