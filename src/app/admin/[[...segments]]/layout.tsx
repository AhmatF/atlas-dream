import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atlas Dream Admin',
  description: 'Administration panel for Atlas Dream',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
