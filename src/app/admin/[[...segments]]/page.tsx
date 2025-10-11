import { RenderAdmin } from '@payloadcms/next/views'
import { importConfig } from 'payload/node'
import React from 'react'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const Admin = async ({ params, searchParams }: Args) => {
  const { segments } = await params
  const config = await importConfig('../../../atlas-dream-starter/cms/payload/payload.config.ts')

  return <RenderAdmin config={config} params={{ segments }} searchParams={searchParams} />
}

export default Admin
