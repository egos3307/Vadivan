import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VadiVan Gezi',
  description: 'Premium Van tur deneyimi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
